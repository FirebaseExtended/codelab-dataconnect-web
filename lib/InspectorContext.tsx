/**
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

type LogEntry = {
  id: string;
  title: string;
  type: "GRAPHQL" | "NATIVE_SQL" | "TRANSACTION" | "CUSTOM_RESOLVER";
  code: string;
};

export type LogEventKey =
  | "DASHBOARD_SUB"
  | "TICKER_SUB"
  | "PROFILE_SUB"
  | "TEXT_SEARCH"
  | "VECTOR_SEARCH"
  | "EMOJI_HISTORY_SUB"
  | "LEADERBOARD_SUB"
  | "GEO_TRENDS_SUB"
  | "GEO_RADAR_SCAN"
  | "UPSERT_USER_MUTATION"
  | "USER_UPDATE_MUTATION"
  | "UPDATE_USER_ROLE_MUTATION"
  | "BUY_STOCK_TRANSACTION"
  | "SELL_STOCK_TRANSACTION"
  | "MARKET_MAKER_TRADE"
  | "GENERATE_HEADLINE_RESOLVER"
  | "SOCIAL_BOOST_SUCCESS"
  | "PANIC_SELL_EXECUTE"
  | "MARKET_CRASH_EXECUTE";

const LOG_TEMPLATES: Record<
  LogEventKey,
  (params?: any) => Omit<LogEntry, "id">
> = {
  DASHBOARD_SUB: () => ({
    title: "Realtime Dashboard Subscription",
    type: "GRAPHQL",
    code: `# Implements Vector types for semantic and @searchable directives for full-text search
type Emoji @table {
  id: UUID! @default(expr: "uuidV4()")
  symbol: String!
  /* enables full text search */
  name: String! @searchable
  description: String! @searchable
  /* enables vector search */
  descriptionEmbedding: Vector @col(size: 768)
  currentPrice: Float! @default(value: 10.0)
}

# Get dashboard data including top emojis by price and recent market events
query GetDashboardData
/* real time refresh trigger */
@refresh(onMutationExecuted: { operation: "BuyStock" })
@refresh(onMutationExecuted: { operation: "SellStock" }) {
  emojis(orderBy: [{ currentPrice: DESC }]) {
    id
    symbol
  }
  events(orderBy: [{ createdAt: DESC }], limit: 15) {
    id
    description
    user {
      username
    }
    emoji {
      symbol
    }
  }
}`,
  }),

  TICKER_SUB: () => ({
    title: "Realtime Ticker Feed Subscription",
    type: "GRAPHQL",
    code: `# Combine recent price updates and major news events into a single chronological feed
type TickerFeed
    /* strongly typed view */
  @view( 
    sql: """
    WITH latest_prices AS (
      SELECT emoji_id, MAX(recorded_at) as last_trade_time
      FROM price_history GROUP BY emoji_id
    )
    SELECT 'PRICE' as type, e.symbol, e.name, e.current_price, e.trend, '' as description, lp.last_trade_time as event_time
    FROM emoji e JOIN latest_prices lp ON e.id = lp.emoji_id
    UNION ALL
    SELECT 'NEWS' as type, e.symbol, '' as name, 0 as current_price, 0 as trend, ev.description, ev.created_at as event_time
    FROM event ev JOIN emoji e ON ev.emoji_id = e.id
    WHERE ev.description ILIKE '%GEMINI REPORT%' OR ev.description ILIKE '%MARKET CRASH%'
    """
  ) {
  type: String, symbol: String, name: String, currentPrice: Float, trend: Float, description: String, eventTime: Timestamp
}

# Combine recent price updates and major news events into a single chronological feed
query GetChronologicalTicker @auth(level: PUBLIC)
/* real time refresh trigger */
@refresh(onMutationExecuted: { operation: "TriggerEvent" })  {
  tickerFeeds(orderBy: [{ eventTime: DESC }], limit: 30) {
    type, symbol, name, trend, description
  }
}`,
  }),

  TEXT_SEARCH: ({ searchTerm }) => ({
    title: `Realtime Text Search: "${searchTerm}"`,
    type: "GRAPHQL",
    code: `# Search emojis using full-text search query
# Depends on @searchable
query SearchEmojis($query: String = "${searchTerm}")
@refresh(onMutationExecuted: { operation: "BuyStock" })
@refresh(onMutationExecuted: { operation: "SellStock" }) {
  emojis_search(query: $query) {
    id
    symbol
    currentPrice
  }
}`,
  }),

  VECTOR_SEARCH: ({ searchTerm }) => ({
    title: `Vector Search: "${searchTerm}"`,
    type: "GRAPHQL",
    code: `# Search emoji descriptions using Cosine similarity with Vertex AI embeddings
# _similarity utilizes Vertex AI and pgvector for semantic nearest-neighbor search
query VectorSearchEmojis($query: String! = "${searchTerm}")
@refresh(onMutationExecuted: { operation: "BuyStock" })
@refresh(onMutationExecuted: { operation: "SellStock" }) {
  emojis_descriptionEmbedding_similarity(
    compare_embed: { model: "text-multilingual-embedding-002", text: $query }
    method: COSINE
    within: 2
    limit: 15
  ) {
    id
    symbol
    currentPrice
    _metadata {
      distance
    }
  }
}`,
  }),

  LEADERBOARD_SUB: () => ({
    title: "Realtime Global Leaderboard Subscribed",
    type: "GRAPHQL",
    code: `# Rank users on a leaderboard based on their total net worth
type TopTrader @view(
  sql: """
  SELECT
    u.id, 
    u.username,
    (u.points + COALESCE(SUM(so.shares * e.current_price), 0)) AS net_worth,
    RANK() OVER (
      ORDER BY (u.points + COALESCE(SUM(so.shares * e.current_price), 0)) DESC
    ) as rank
  FROM "user" u
  LEFT JOIN stock_ownership so ON u.id = so.user_id
  LEFT JOIN emoji e ON so.emoji_id = e.id
  GROUP BY u.id, u.username, u.points
  """
) {
  username: String
  netWorth: Float
  rank: Int
}

# Rank users on a leaderboard based on their total net worth
query GetTopTraders @auth(level: PUBLIC) 
@refresh(onMutationExecuted: { operation: "BuyStock" }
@refresh(onMutationExecuted: { operation: "SellStock" }) {
  topTraders(orderBy: [{ rank: ASC }], limit: 50) {
    username
    netWorth
    rank
  }
}`,
  }),

  GEO_TRENDS_SUB: ({ radarLng, radarLat, radiusKm }) => ({
    title: "Realtime Location & Geo-Trends Subscription",
    type: "GRAPHQL",
    code: `# Get top trending emojis partitioned by user city using native SQL
/*
 * Native SQL: Allows you to execute dynamic, raw SQL 
 * and utilize advanced PostgreSQL extensions (like PostGIS).
 */
query GetTopEmojisByCity @auth(level: PUBLIC) 
@refresh(onMutationExecuted: { operation: "BuyStock" })
@refresh(onMutationExecuted: { operation: "SellStock" })
@refresh(onMutationExecuted: { operation: "UpdateUserLocation" }) {
  cityTrends: _select(
    sql: """
      WITH city_shares AS (
        SELECT 
          u.city, 
          AVG(u.latitude) as latitude, 
          AVG(u.longitude) as longitude, 
          e.symbol, 
          SUM(so.shares) as total_shares,
          RANK() OVER (PARTITION BY u.city ORDER BY SUM(so.shares) DESC) as rank
        FROM stock_ownership so 
        JOIN "user" u ON so.user_id = u.id 
        JOIN emoji e ON so.emoji_id = e.id
        WHERE u.city IS NOT NULL AND so.shares > 0
        GROUP BY u.city, e.id, e.symbol
      )
      SELECT * FROM city_shares WHERE rank = 1
    """
  )
}

# Get trending emojis within a geographic radius using native SQL and PostGIS ST_DWithin
/*
 * PostGIS spatial query: Passes $1, $2, and $3 down to 
 * the database layer to bind variables without SQL injection.
 */
query GetTrendingEmojisNearMe($userLng: Float!, $userLat: Float!, $radiusMeters: Float!) 
@auth(level: PUBLIC) 
@refresh(onMutationExecuted: { operation: "BuyStock" })
@refresh(onMutationExecuted: { operation: "SellStock" })
@refresh(onMutationExecuted: { operation: "UpdateUserLocation" }) {
  regionalTrends: _select(
    sql: """
      SELECT 
        e.symbol, 
        e.name, 
        COUNT(so.shares) AS holders, 
        SUM(so.shares) AS shares
      FROM emoji e
      JOIN stock_ownership so ON so.emoji_id = e.id
      JOIN "user" u ON u.id = so.user_id
      WHERE so.shares > 0
        AND ST_DWithin(
          ST_MakePoint(u.longitude, u.latitude)::geography,
          ST_MakePoint($1, $2)::geography,
          $3
        )
    """
    params: [${radarLng}, ${radarLat}, ${radiusKm * 1000}]
  )
}`,
  }),

  GEO_RADAR_SCAN: ({ radarLng, radarLat, radiusKm }) => ({
    title: `Executing PostGIS Scan (${radiusKm}km radius)`,
    type: "GRAPHQL",
    code: `# Get trending emojis within a geographic radius using native SQL and PostGIS ST_DWithin
query GetTrendingEmojisNearMe($userLng: Float!, $userLat: Float!, $radiusMeters: Float!) 
@auth(level: PUBLIC)
@refresh(onMutationExecuted: { operation: "BuyStock" })
@refresh(onMutationExecuted: { operation: "SellStock" })
@refresh(onMutationExecuted: { operation: "UpdateUserLocation" }) {
  regionalTrends: _select(
    sql: """
      SELECT 
        e.symbol, 
        e.name, 
        COUNT(so.shares) AS holders, 
        SUM(so.shares) AS shares
      FROM emoji e
      JOIN stock_ownership so ON so.emoji_id = e.id
      JOIN "user" u ON u.id = so.user_id
      WHERE so.shares > 0
        AND ST_DWithin(
          ST_MakePoint(u.longitude, u.latitude)::geography,
          ST_MakePoint($1, $2)::geography,
          $3
        )
    """
    params: [${radarLng}, ${radarLat}, ${radiusKm * 1000}]
  )
}`,
  }),
  UPSERT_USER_MUTATION: () => ({
    title: `User Login / Upsert Profile`,
    type: "GRAPHQL",
    code: `# Utilizes the Firebase Auth uid expression as the primary key
type User @table {
  /* UID from Firebase Auth */
  id: String! @default(expr: "auth.uid")
  profileImage: String
  role: String! @default(value: "USER")
  points: Float! @default(value: 100.0)
  city: String @default(value: "Las Vegas")
}

# Upsert (update or insert) a user's profile information
mutation UpsertUser($username: String!, $profileImage: String!)
/* security check for logged in users */
@auth(level: USER) {
  user_upsert(
    data: {
      id_expr: "auth.uid"
      username: $username
      profileImage: $profileImage
    }
  )
}
  
# Get current authenticated user profile and their stock ownership using auth.uid
query GetUserProfile
@auth(level: USER)
@refresh(onMutationExecuted: { operation: "UpdateUserRole" }) {
  user(id_expr: "auth.uid") {
    points
    role
    stockOwnerships_on_user {
      shares
      emoji {
        id
        symbol
        currentPrice
      }
    }
    city
  }
}`,
  }),

  PROFILE_SUB: () => ({
    title: "User Profile Subscription",
    type: "GRAPHQL",
    code: `# Utilizes the Firebase Auth uid expression as the primary key
type User @table {
  /* UID from Firebase Auth */
  id: String! @default(expr: "auth.uid")
  profileImage: String
  role: String! @default(value: "USER")
  points: Float! @default(value: 100.0)
  city: String @default(value: "Las Vegas")
}
  
# Get current authenticated user profile and their stock ownership using auth.uid
query GetUserProfile
@auth(level: USER)
@refresh(onMutationExecuted: { operation: "UpdateUserRole" }) {
  user(id_expr: "auth.uid") {
    points
    role
    stockOwnerships_on_user {
      shares
      emoji {
        id
        symbol
        currentPrice
      }
    }
    city
  }
}`,
  }),

  USER_UPDATE_MUTATION: ({ city, lat, lng }) => ({
    title: "Update User Location",
    type: "GRAPHQL",
    code: `# Update a user's location
mutation UpdateUserLocation(...) @auth(level: USER) {
  user_update(key: { id_expr: "auth.uid" }, data: {
    city: "${city}"
    latitude: ${lat}
    longitude: ${lng}
  })
}`,
  }),

  EMOJI_HISTORY_SUB: ({ symbol }) => ({
    title: `${symbol} History (Realtime)`,
    type: "GRAPHQL",
    code: `# Identify the top shareholder (whale) for each emoji and their total ownership percentage
type EmojiWhaleStat
  @view(
    sql: """
    WITH total_shares AS (
      SELECT
        emoji_id,
        SUM(shares) AS total_supply
      FROM stock_ownership
      WHERE shares > 0
      GROUP BY emoji_id
    ),
    ranked_holders AS (
      SELECT
        so.emoji_id,
        u.username              AS whale_username,
        u.profile_image         AS whale_profile_image,
        so.shares               AS whale_shares,
        ts.total_supply,
        ROUND(
          (so.shares::DECIMAL / NULLIF(ts.total_supply, 0)) * 100,
          2
        )                       AS whale_percentage,
        RANK() OVER (
          PARTITION BY so.emoji_id
          ORDER BY so.shares DESC
        )                       AS holder_rank
      FROM stock_ownership so
      JOIN "user" u ON u.id = so.user_id
      JOIN total_shares ts ON ts.emoji_id = so.emoji_id
      WHERE so.shares > 0
    )
    SELECT
      emoji_id,
      whale_username,
      whale_profile_image,
      whale_shares,
      total_supply,
      whale_percentage
    FROM ranked_holders
    WHERE holder_rank = 1
    """
  ) {
  emojiId: UUID
  whaleUsername: String
  whaleProfileImage: String
  whaleShares: Int
  totalSupply: Int
  whalePercentage: Float
}

# Calculate the moving average of historical prices for each emoji
type EmojiHistoryStat
  @view(
    sql: """
    SELECT
      emoji_id,
      price,
      recorded_at,
      AVG(price) OVER (
        PARTITION BY emoji_id
        ORDER BY recorded_at
        ROWS BETWEEN 4 PRECEDING AND CURRENT ROW
      ) as moving_average
    FROM price_history
    """
  ) {
  emojiId: UUID
  price: Float
  recordedAt: Timestamp
  movingAverage: Float
}

# Calculate the moving average of historical prices for each emoji
query GetEmojiHistoryStats($emojiId: UUID!) {
  emojiHistoryStats(where: { emojiId: { eq: $emojiId } }) {
    price
    movingAverage
  }
}

# Identify the top shareholder (whale) for each emoji and their total ownership percentage
query GetEmojiWhaleStats {
  emojiWhaleStats { 
    whaleUsername 
    whalePercentage 
  }
}`,
  }),
  BUY_STOCK_TRANSACTION: ({ amount, symbol }) => ({
    title: `Executing Native SQL for ${amount}x ${symbol}`,
    type: "NATIVE_SQL",
    code: `# Buy shares of an emoji stock
mutation BuyStock($emojiId: UUID!, $amount: Int!, $isDiscounted: Boolean!)
@auth(level: USER) {
  buyStock: _execute(
    sql: """
    WITH validated_params AS (
      SELECT
        $1::uuid AS emoji_id,
        $2::int AS amount,
        $3::boolean AS is_discounted,
        $4::text AS user_id
    ),
    target_emoji AS (
      SELECT
        e.id,
        (e.current_price * (CASE WHEN vp.is_discounted THEN 0.5 ELSE 1.0 END) * vp.amount) AS total_cost
      FROM emoji e
      CROSS JOIN validated_params vp
      WHERE e.id = vp.emoji_id
        AND vp.amount > 0
        AND vp.amount <= 100
    ),
    deduct_funds AS (
      UPDATE "user" u
      SET points = u.points - te.total_cost
      FROM target_emoji te, validated_params vp
      WHERE u.id = vp.user_id AND u.points >= te.total_cost
      RETURNING u.id
    ),
    upsert_ownership AS (
      INSERT INTO stock_ownership (user_id, emoji_id, shares)
      SELECT vp.user_id, vp.emoji_id, vp.amount
      FROM validated_params vp
      WHERE EXISTS (SELECT 1 FROM deduct_funds)
      ON CONFLICT (user_id, emoji_id) DO UPDATE
      SET shares = stock_ownership.shares + EXCLUDED.shares
      RETURNING stock_ownership.emoji_id
    ),
    update_emoji AS (
      UPDATE emoji e
      SET
        current_price = GREATEST(0.01, e.current_price + (e.current_price * 0.01 * vp.amount)),
        trend = GREATEST(0.01, e.current_price + (e.current_price * 0.01 * vp.amount)) - e.current_price
      FROM validated_params vp
      WHERE e.id = vp.emoji_id AND EXISTS (SELECT 1 FROM deduct_funds)
      RETURNING e.id, e.current_price, e.trend
    )
    INSERT INTO price_history (id, emoji_id, price, recorded_at)
    SELECT gen_random_uuid(), ue.id, ue.current_price, NOW()
    FROM update_emoji ue;
    """
    params: [$emojiId, $amount, $isDiscounted, { _expr: "auth.uid" }]
  )
}`,
  }),

  SELL_STOCK_TRANSACTION: ({ amount, symbol }) => ({
    title: `Executing Native SQL to Sell ${amount}x ${symbol}`,
    type: "NATIVE_SQL",
    code: `# Sell shares of an emoji stock
mutation SellStock($emojiId: UUID!, $amount: Int!) @auth(level: USER) {
  sellStock: _execute(
    sql: """
    WITH validated_params AS (
      SELECT
        $1::uuid AS emoji_id,
        $2::int AS amount,
        $3::text AS user_id
    ),
    target_emoji AS (
      SELECT
        e.id,
        (e.current_price * vp.amount) AS total_revenue,
        GREATEST(0.01, e.current_price * POWER(0.99, vp.amount)) AS new_price
      FROM emoji e
      CROSS JOIN validated_params vp
      WHERE e.id = vp.emoji_id
        AND vp.amount > 0
        AND vp.amount <= 100
    ),
    check_shares AS (
      SELECT so.user_id
      FROM stock_ownership so
      CROSS JOIN validated_params vp
      WHERE so.user_id = vp.user_id
        AND so.emoji_id = vp.emoji_id
        AND so.shares >= vp.amount
    ),
    add_funds AS (
      UPDATE "user" u
      SET points = u.points + te.total_revenue
      FROM target_emoji te, validated_params vp
      WHERE u.id = vp.user_id AND EXISTS (SELECT 1 FROM check_shares)
      RETURNING u.id
    ),
    update_ownership AS (
      UPDATE stock_ownership so
      SET shares = so.shares - vp.amount
      FROM validated_params vp
      WHERE so.user_id = vp.user_id
        AND so.emoji_id = vp.emoji_id
        AND EXISTS (SELECT 1 FROM check_shares)
        AND EXISTS (SELECT 1 FROM add_funds)
    ),
    update_emoji AS (
      UPDATE emoji e
      SET
        current_price = te.new_price,
        trend = te.new_price - e.current_price
      FROM target_emoji te, validated_params vp
      WHERE e.id = vp.emoji_id
        AND EXISTS (SELECT 1 FROM check_shares)
        AND EXISTS (SELECT 1 FROM add_funds)
      RETURNING e.id, e.current_price, e.trend
    )
    INSERT INTO price_history (id, emoji_id, price, recorded_at)
    SELECT gen_random_uuid(), ue.id, ue.current_price, NOW()
    FROM update_emoji ue;
    """
    params: [$emojiId, $amount, { _expr: "auth.uid" }]
  )
}`,
  }),
  UPDATE_USER_ROLE_MUTATION: ({ role }) => ({
    title: `Update User Role to [${role}]`,
    type: "GRAPHQL",
    code: `# Update a user's role
mutation UpdateUserRole($role: String! = "${role}") @auth(level: USER) {
  user_update(key: { id_expr: "auth.uid" }, data: { role: $role })
}`,
  }),
  GENERATE_HEADLINE_RESOLVER: () => ({
    title: "Triggering Custom Resolver (AI news)",
    type: "CUSTOM_RESOLVER",
    code: `# Generate an AI headline for a stock trade
type Mutation {
  generateTradeHeadline(
    emojiSymbol: String!
    emojiName: String!
    username: String!
    tradeAmount: Int!
    tradeCost: Float!
    tradeType: String!
  ): String!
}

const prompt = \`You are a hype-driven, slightly satirical financial news bot...\`;

const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash-lite',
  contents: prompt,
});`,
  }),

  PANIC_SELL_EXECUTE: () => ({
    title: "Executing @execute Panic Sell (Native SQL)",
    type: "NATIVE_SQL",
    code: `# Liquidate all user shares and trigger a price drop
mutation PanicSellPortfolio @auth(level: USER) {
  panicSell: _execute(
    sql: """
      WITH
      user_positions AS (
        SELECT
          so.emoji_id,
          so.shares,
          e.symbol,
          e.current_price,
          (so.shares * e.current_price) AS position_value
        FROM stock_ownership so
        JOIN emoji e ON e.id = so.emoji_id
        WHERE so.user_id = $1
          AND so.shares > 0
      ),
      crash_prices AS (
        UPDATE emoji e
        SET
          current_price = GREATEST(0.01, e.current_price - (up.shares * e.current_price * 0.05)),
          trend = -(up.shares * e.current_price * 0.05)
        FROM user_positions up
        WHERE e.id = up.emoji_id
        RETURNING e.id, e.current_price
      ),
      zero_shares AS (
        UPDATE stock_ownership
        SET shares = 0
        WHERE user_id = $1
          AND shares > 0
        RETURNING emoji_id
      ),
      log_events AS (
        INSERT INTO event (id, user_id, emoji_id, impact, description, created_at)
        SELECT
          gen_random_uuid(),
          $1,
          up.emoji_id,
          -(up.shares * up.current_price * 0.05),
          'PANIC SELL: User liquidated ' || up.shares::text || ' shares of ' || up.symbol || '.',
          NOW()
        FROM user_positions up
      ),
      log_price_history AS (
        INSERT INTO price_history (id, emoji_id, price, recorded_at)
        SELECT
          gen_random_uuid(),
          cp.id,
          cp.current_price,
          NOW()
        FROM crash_prices cp
      ),
      total_proceeds AS (
        SELECT COALESCE(SUM(position_value), 0) AS total
        FROM user_positions
      )
      UPDATE "user"
      SET points = points + (SELECT total FROM total_proceeds)
      WHERE id = $1
    """,
    params: [{ _expr: "auth.uid" }]
  )
}`,
  }),

  MARKET_CRASH_EXECUTE: ({ crashTag }) => ({
    title: `Native SQL: Crashing sector [${crashTag}]`,
    type: "NATIVE_SQL",
    code: `# Trigger a market crash for emojis with a specific tag
mutation TriggerMarketCrash($tag: String! = "${crashTag}") @auth(level: USER) {
  marketCrash: _execute(
    sql: """
      WITH
      target_emojis AS (
        SELECT id, name, symbol, current_price
        FROM emoji
        WHERE $1 = ANY(tags)
      ),
      crashed_emojis AS (
        UPDATE emoji
        SET
          current_price = GREATEST(0.01, current_price * 0.70),
          trend         = -(current_price * 0.30)
        WHERE id IN (SELECT id FROM target_emojis)
        RETURNING id, name, symbol, current_price
      ),
      log_events AS (
        INSERT INTO event (id, user_id, emoji_id, impact, description, created_at)
        SELECT
          gen_random_uuid(),
          'system_market_maker',
          ce.id,
          -(ce.current_price * 0.30),
          'MARKET CRASH: ' || $1 || ' sector selloff. ' || ce.symbol || ' (' || ce.name || ') crashed 30%.',
          NOW()
        FROM crashed_emojis ce
      )
      INSERT INTO price_history (id, emoji_id, price, recorded_at)
      SELECT
        gen_random_uuid(),
        ce.id,
        ce.current_price,
        NOW()
      FROM crashed_emojis ce;
    """,
    params: [$tag]
  )
}`,
  }),

  MARKET_MAKER_TRADE: () => ({
    title: "Simulated Market Event Trade (Admin Only)",
    type: "TRANSACTION",
    code: `# Execute a market maker trade to adjust emoji price and shares
mutation MarketMakerTrade(
  $emojiId: UUID!
  $priceImpact: Float!
  $shareDelta: Int!
  $eventDesc: String!
  $newPrice: Float!
)
@auth(level: USER)
@transaction {
  query @redact {
    user(key: { id_expr: "auth.uid" })
      @check(
        expr: "this != null && this.role == 'ADMIN'"
        message: "Access Denied: You must have the ADMIN role to deploy the Market Event bot."
      ) {
      role
    }
  }
  stockOwnership_upsert(
    data: {
      userId: "system_market_maker"
      emojiId: $emojiId
      shares_update: { inc: $shareDelta }
    }
  )
  emoji_update(
    id: $emojiId
    data: { currentPrice_update: { inc: $priceImpact }, trend: $priceImpact }
  )
  event_insert(
    data: {
      userId: "system_market_maker"
      emojiId: $emojiId
      impact: $priceImpact
      description: $eventDesc
    }
  )
  priceHistory_insert(data: { emojiId: $emojiId, price: $newPrice })
}`,
  }),
  SOCIAL_BOOST_SUCCESS: () => ({
    title: "Triggering Custom Resolver (Social Boost)",
    type: "CUSTOM_RESOLVER",
    code: `# Boost an emoji stock price based on an X.com post
type Mutation {
  boostFromTweet(tweetUrl: String!, userId: String!): ReadXPostResult
}

const response = await fetch(\`https://api.x.com/2/tweets/\${tweetId}\`);
const text = json.data.text;

if (!text.includes("#FirebaseSQLConnect")) throw Error();
const symbol = extractEmoji(text);

await executeReadXPostTransaction({ 
  symbol: symbol, 
  boostAmount: boostAmount,
  tweetId: tweetId,
  userId: userId 
});`,
  }),
};

interface InspectorContextType {
  logs: LogEntry[];
  addLog: (log: Omit<LogEntry, "id">) => void;
  logEvent: (key: LogEventKey, params?: any) => void;
  clearLogs: () => void;
  isOpen: boolean;
  toggleInspector: () => void;
}

const InspectorContext = createContext<InspectorContextType | undefined>(
  undefined,
);

export const InspectorProvider = ({ children }: { children: ReactNode }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addLog = useCallback((log: Omit<LogEntry, "id">) => {
    setLogs((prev) => [
      ...prev,
      { ...log, id: Math.random().toString(36).substring(2, 9) },
    ]);
  }, []);

  const logEvent = useCallback(
    (key: LogEventKey, params?: any) => {
      if (LOG_TEMPLATES[key]) {
        addLog(LOG_TEMPLATES[key](params));
      }
    },
    [addLog],
  );

  const clearLogs = useCallback(() => setLogs([]), []);
  const toggleInspector = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <InspectorContext.Provider
      value={{ logs, addLog, logEvent, clearLogs, isOpen, toggleInspector }}
    >
      {children}
    </InspectorContext.Provider>
  );
};

export const useInspector = () => {
  const context = useContext(InspectorContext);
  if (!context) throw new Error("useInspector must be used within Provider");
  return context;
};
