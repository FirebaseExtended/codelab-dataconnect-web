import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface BuyStockData {
  buyStock?: number | null;
}

export interface BuyStockVariables {
  emojiId: UUIDString;
  amount: number;
  isDiscounted: boolean;
}

export interface Emoji_Key {
  id: UUIDString;
  __typename?: 'Emoji_Key';
}

export interface Event_Key {
  id: UUIDString;
  __typename?: 'Event_Key';
}

export interface ExecuteReadXPostTransactionData {
  readXPost?: number | null;
}

export interface ExecuteReadXPostTransactionVariables {
  symbol: string;
  boostAmount: number;
  tweetId: string;
  userId: string;
}

export interface GenerateTradeHeadlineData {
  aiHeadline: string;
}

export interface GenerateTradeHeadlineVariables {
  emojiSymbol: string;
  emojiName: string;
  username: string;
  tradeAmount: number;
  tradeCost: number;
  tradeType: string;
}

export interface GetChronologicalTickerData {
  tickerFeeds: ({
    type?: string | null;
    symbol?: string | null;
    name?: string | null;
    currentPrice?: number | null;
    trend?: number | null;
    description?: string | null;
    eventTime?: TimestampString | null;
  })[];
}

export interface GetDashboardDataData {
  emojis: ({
    id: UUIDString;
    symbol: string;
    name: string;
    description: string;
    currentPrice: number;
    trend: number;
  } & Emoji_Key)[];
    events: ({
      id: UUIDString;
      description: string;
      impact: number;
      createdAt: TimestampString;
      user: {
        username: string;
        profileImage?: string | null;
      };
        emoji: {
          symbol: string;
        };
    } & Event_Key)[];
}

export interface GetEmojiHistoryStatsData {
  emojiHistoryStats: ({
    price?: number | null;
    movingAverage?: number | null;
    recordedAt?: TimestampString | null;
  })[];
}

export interface GetEmojiHistoryStatsVariables {
  emojiId: UUIDString;
}

export interface GetEmojiSparklinesData {
  emojiSparklines: ({
    emojiId?: UUIDString | null;
    price?: number | null;
    recordedAt?: TimestampString | null;
  })[];
}

export interface GetEmojiWhaleStatsData {
  emojiWhaleStats: ({
    emojiId?: UUIDString | null;
    whaleUsername?: string | null;
    whaleProfileImage?: string | null;
    whaleShares?: number | null;
    totalSupply?: number | null;
    whalePercentage?: number | null;
  })[];
}

export interface GetPriceHistoryData {
  priceHistories: ({
    price: number;
    recordedAt: TimestampString;
  })[];
}

export interface GetPriceHistoryVariables {
  emojiId: UUIDString;
  limit?: number | null;
}

export interface GetTopEmojisByCityData {
  cityTrends?: unknown[] | null;
}

export interface GetTopTradersData {
  topTraders: ({
    id?: string | null;
    username?: string | null;
    profileImage?: string | null;
    netWorth?: number | null;
    rank?: number | null;
  })[];
}

export interface GetTrendingEmojisNearMeData {
  regionalTrends?: unknown[] | null;
}

export interface GetTrendingEmojisNearMeVariables {
  userLng: number;
  userLat: number;
  radiusMeters: number;
}

export interface GetUserProfileData {
  user?: {
    points: number;
    username: string;
    profileImage?: string | null;
    role: string;
    stockOwnerships_on_user: ({
      shares: number;
      emoji: {
        id: UUIDString;
        symbol: string;
        currentPrice: number;
        name: string;
      } & Emoji_Key;
    })[];
      city?: string | null;
      latitude?: number | null;
      longitude?: number | null;
  };
}

export interface MarketMakerTradeData {
  stockOwnership_upsert: StockOwnership_Key;
  emoji_update?: Emoji_Key | null;
  event_insert: Event_Key;
  priceHistory_insert: PriceHistory_Key;
}

export interface MarketMakerTradeVariables {
  emojiId: UUIDString;
  priceImpact: number;
  shareDelta: number;
  eventDesc: string;
  newPrice: number;
}

export interface PanicSellPortfolioData {
  panicSell?: number | null;
}

export interface PriceHistory_Key {
  id: UUIDString;
  __typename?: 'PriceHistory_Key';
}

export interface ProcessedTweet_Key {
  id: string;
  __typename?: 'ProcessedTweet_Key';
}

export interface SearchEmojisData {
  emojis_search: ({
    id: UUIDString;
    symbol: string;
    name: string;
    description: string;
    currentPrice: number;
    trend: number;
  } & Emoji_Key)[];
}

export interface SearchEmojisVariables {
  query?: string | null;
}

export interface SellStockData {
  sellStock?: number | null;
}

export interface SellStockVariables {
  emojiId: UUIDString;
  amount: number;
}

export interface StockOwnership_Key {
  userId: string;
  emojiId: UUIDString;
  __typename?: 'StockOwnership_Key';
}

export interface TriggerEventData {
  event_insert: Event_Key;
}

export interface TriggerEventVariables {
  emojiId: UUIDString;
  impact: number;
  description: string;
  now: TimestampString;
}

export interface TriggerMarketCrashData {
  marketCrash?: number | null;
}

export interface TriggerMarketCrashVariables {
  tag: string;
}

export interface TriggerSocialBoostData {
  boostFromTweet?: {
    success: boolean;
    symbol?: string | null;
    boostAmount?: number | null;
    message?: string | null;
  };
}

export interface TriggerSocialBoostVariables {
  tweetUrl: string;
  userId: string;
}

export interface UpdateUserLocationData {
  user_update?: User_Key | null;
}

export interface UpdateUserLocationVariables {
  city: string;
  latitude: number;
  longitude: number;
}

export interface UpdateUserRoleData {
  user_update?: User_Key | null;
}

export interface UpdateUserRoleVariables {
  role: string;
}

export interface UpsertUserData {
  user_upsert: User_Key;
}

export interface UpsertUserVariables {
  username: string;
  profileImage: string;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

export interface VectorSearchEmojisData {
  emojis_descriptionEmbedding_similarity: ({
    id: UUIDString;
    symbol: string;
    name: string;
    description: string;
    currentPrice: number;
    trend: number;
    _metadata?: {
      distance?: number | null;
    };
  } & Emoji_Key)[];
}

export interface VectorSearchEmojisVariables {
  query: string;
}

/** Generated Node Admin SDK operation action function for the 'UpsertUser' Mutation. Allow users to execute without passing in DataConnect. */
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertUserData>>;
/** Generated Node Admin SDK operation action function for the 'UpsertUser' Mutation. Allow users to pass in custom DataConnect instances. */
export function upsertUser(vars: UpsertUserVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpsertUserData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateUserRole' Mutation. Allow users to execute without passing in DataConnect. */
export function updateUserRole(dc: DataConnect, vars: UpdateUserRoleVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateUserRoleData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateUserRole' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateUserRole(vars: UpdateUserRoleVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateUserRoleData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateUserLocation' Mutation. Allow users to execute without passing in DataConnect. */
export function updateUserLocation(dc: DataConnect, vars: UpdateUserLocationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateUserLocationData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateUserLocation' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateUserLocation(vars: UpdateUserLocationVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateUserLocationData>>;

/** Generated Node Admin SDK operation action function for the 'TriggerEvent' Mutation. Allow users to execute without passing in DataConnect. */
export function triggerEvent(dc: DataConnect, vars: TriggerEventVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<TriggerEventData>>;
/** Generated Node Admin SDK operation action function for the 'TriggerEvent' Mutation. Allow users to pass in custom DataConnect instances. */
export function triggerEvent(vars: TriggerEventVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<TriggerEventData>>;

/** Generated Node Admin SDK operation action function for the 'MarketMakerTrade' Mutation. Allow users to execute without passing in DataConnect. */
export function marketMakerTrade(dc: DataConnect, vars: MarketMakerTradeVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<MarketMakerTradeData>>;
/** Generated Node Admin SDK operation action function for the 'MarketMakerTrade' Mutation. Allow users to pass in custom DataConnect instances. */
export function marketMakerTrade(vars: MarketMakerTradeVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<MarketMakerTradeData>>;

/** Generated Node Admin SDK operation action function for the 'BuyStock' Mutation. Allow users to execute without passing in DataConnect. */
export function buyStock(dc: DataConnect, vars: BuyStockVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<BuyStockData>>;
/** Generated Node Admin SDK operation action function for the 'BuyStock' Mutation. Allow users to pass in custom DataConnect instances. */
export function buyStock(vars: BuyStockVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<BuyStockData>>;

/** Generated Node Admin SDK operation action function for the 'SellStock' Mutation. Allow users to execute without passing in DataConnect. */
export function sellStock(dc: DataConnect, vars: SellStockVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SellStockData>>;
/** Generated Node Admin SDK operation action function for the 'SellStock' Mutation. Allow users to pass in custom DataConnect instances. */
export function sellStock(vars: SellStockVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SellStockData>>;

/** Generated Node Admin SDK operation action function for the 'GenerateTradeHeadline' Mutation. Allow users to execute without passing in DataConnect. */
export function generateTradeHeadline(dc: DataConnect, vars: GenerateTradeHeadlineVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GenerateTradeHeadlineData>>;
/** Generated Node Admin SDK operation action function for the 'GenerateTradeHeadline' Mutation. Allow users to pass in custom DataConnect instances. */
export function generateTradeHeadline(vars: GenerateTradeHeadlineVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GenerateTradeHeadlineData>>;

/** Generated Node Admin SDK operation action function for the 'ExecuteReadXPostTransaction' Mutation. Allow users to execute without passing in DataConnect. */
export function executeReadXPostTransaction(dc: DataConnect, vars: ExecuteReadXPostTransactionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ExecuteReadXPostTransactionData>>;
/** Generated Node Admin SDK operation action function for the 'ExecuteReadXPostTransaction' Mutation. Allow users to pass in custom DataConnect instances. */
export function executeReadXPostTransaction(vars: ExecuteReadXPostTransactionVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ExecuteReadXPostTransactionData>>;

/** Generated Node Admin SDK operation action function for the 'TriggerSocialBoost' Mutation. Allow users to execute without passing in DataConnect. */
export function triggerSocialBoost(dc: DataConnect, vars: TriggerSocialBoostVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<TriggerSocialBoostData>>;
/** Generated Node Admin SDK operation action function for the 'TriggerSocialBoost' Mutation. Allow users to pass in custom DataConnect instances. */
export function triggerSocialBoost(vars: TriggerSocialBoostVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<TriggerSocialBoostData>>;

/** Generated Node Admin SDK operation action function for the 'PanicSellPortfolio' Mutation. Allow users to execute without passing in DataConnect. */
export function panicSellPortfolio(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<PanicSellPortfolioData>>;
/** Generated Node Admin SDK operation action function for the 'PanicSellPortfolio' Mutation. Allow users to pass in custom DataConnect instances. */
export function panicSellPortfolio(options?: OperationOptions): Promise<ExecuteOperationResponse<PanicSellPortfolioData>>;

/** Generated Node Admin SDK operation action function for the 'TriggerMarketCrash' Mutation. Allow users to execute without passing in DataConnect. */
export function triggerMarketCrash(dc: DataConnect, vars: TriggerMarketCrashVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<TriggerMarketCrashData>>;
/** Generated Node Admin SDK operation action function for the 'TriggerMarketCrash' Mutation. Allow users to pass in custom DataConnect instances. */
export function triggerMarketCrash(vars: TriggerMarketCrashVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<TriggerMarketCrashData>>;

/** Generated Node Admin SDK operation action function for the 'GetDashboardData' Query. Allow users to execute without passing in DataConnect. */
export function getDashboardData(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetDashboardDataData>>;
/** Generated Node Admin SDK operation action function for the 'GetDashboardData' Query. Allow users to pass in custom DataConnect instances. */
export function getDashboardData(options?: OperationOptions): Promise<ExecuteOperationResponse<GetDashboardDataData>>;

/** Generated Node Admin SDK operation action function for the 'GetUserProfile' Query. Allow users to execute without passing in DataConnect. */
export function getUserProfile(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserProfileData>>;
/** Generated Node Admin SDK operation action function for the 'GetUserProfile' Query. Allow users to pass in custom DataConnect instances. */
export function getUserProfile(options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserProfileData>>;

/** Generated Node Admin SDK operation action function for the 'GetPriceHistory' Query. Allow users to execute without passing in DataConnect. */
export function getPriceHistory(dc: DataConnect, vars: GetPriceHistoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPriceHistoryData>>;
/** Generated Node Admin SDK operation action function for the 'GetPriceHistory' Query. Allow users to pass in custom DataConnect instances. */
export function getPriceHistory(vars: GetPriceHistoryVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetPriceHistoryData>>;

/** Generated Node Admin SDK operation action function for the 'GetEmojiWhaleStats' Query. Allow users to execute without passing in DataConnect. */
export function getEmojiWhaleStats(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetEmojiWhaleStatsData>>;
/** Generated Node Admin SDK operation action function for the 'GetEmojiWhaleStats' Query. Allow users to pass in custom DataConnect instances. */
export function getEmojiWhaleStats(options?: OperationOptions): Promise<ExecuteOperationResponse<GetEmojiWhaleStatsData>>;

/** Generated Node Admin SDK operation action function for the 'GetEmojiHistoryStats' Query. Allow users to execute without passing in DataConnect. */
export function getEmojiHistoryStats(dc: DataConnect, vars: GetEmojiHistoryStatsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetEmojiHistoryStatsData>>;
/** Generated Node Admin SDK operation action function for the 'GetEmojiHistoryStats' Query. Allow users to pass in custom DataConnect instances. */
export function getEmojiHistoryStats(vars: GetEmojiHistoryStatsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetEmojiHistoryStatsData>>;

/** Generated Node Admin SDK operation action function for the 'GetChronologicalTicker' Query. Allow users to execute without passing in DataConnect. */
export function getChronologicalTicker(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetChronologicalTickerData>>;
/** Generated Node Admin SDK operation action function for the 'GetChronologicalTicker' Query. Allow users to pass in custom DataConnect instances. */
export function getChronologicalTicker(options?: OperationOptions): Promise<ExecuteOperationResponse<GetChronologicalTickerData>>;

/** Generated Node Admin SDK operation action function for the 'GetEmojiSparklines' Query. Allow users to execute without passing in DataConnect. */
export function getEmojiSparklines(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetEmojiSparklinesData>>;
/** Generated Node Admin SDK operation action function for the 'GetEmojiSparklines' Query. Allow users to pass in custom DataConnect instances. */
export function getEmojiSparklines(options?: OperationOptions): Promise<ExecuteOperationResponse<GetEmojiSparklinesData>>;

/** Generated Node Admin SDK operation action function for the 'GetTopTraders' Query. Allow users to execute without passing in DataConnect. */
export function getTopTraders(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTopTradersData>>;
/** Generated Node Admin SDK operation action function for the 'GetTopTraders' Query. Allow users to pass in custom DataConnect instances. */
export function getTopTraders(options?: OperationOptions): Promise<ExecuteOperationResponse<GetTopTradersData>>;

/** Generated Node Admin SDK operation action function for the 'SearchEmojis' Query. Allow users to execute without passing in DataConnect. */
export function searchEmojis(dc: DataConnect, vars?: SearchEmojisVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SearchEmojisData>>;
/** Generated Node Admin SDK operation action function for the 'SearchEmojis' Query. Allow users to pass in custom DataConnect instances. */
export function searchEmojis(vars?: SearchEmojisVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<SearchEmojisData>>;

/** Generated Node Admin SDK operation action function for the 'GetTopEmojisByCity' Query. Allow users to execute without passing in DataConnect. */
export function getTopEmojisByCity(dc: DataConnect, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTopEmojisByCityData>>;
/** Generated Node Admin SDK operation action function for the 'GetTopEmojisByCity' Query. Allow users to pass in custom DataConnect instances. */
export function getTopEmojisByCity(options?: OperationOptions): Promise<ExecuteOperationResponse<GetTopEmojisByCityData>>;

/** Generated Node Admin SDK operation action function for the 'GetTrendingEmojisNearMe' Query. Allow users to execute without passing in DataConnect. */
export function getTrendingEmojisNearMe(dc: DataConnect, vars: GetTrendingEmojisNearMeVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTrendingEmojisNearMeData>>;
/** Generated Node Admin SDK operation action function for the 'GetTrendingEmojisNearMe' Query. Allow users to pass in custom DataConnect instances. */
export function getTrendingEmojisNearMe(vars: GetTrendingEmojisNearMeVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetTrendingEmojisNearMeData>>;

/** Generated Node Admin SDK operation action function for the 'VectorSearchEmojis' Query. Allow users to execute without passing in DataConnect. */
export function vectorSearchEmojis(dc: DataConnect, vars: VectorSearchEmojisVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<VectorSearchEmojisData>>;
/** Generated Node Admin SDK operation action function for the 'VectorSearchEmojis' Query. Allow users to pass in custom DataConnect instances. */
export function vectorSearchEmojis(vars: VectorSearchEmojisVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<VectorSearchEmojisData>>;

