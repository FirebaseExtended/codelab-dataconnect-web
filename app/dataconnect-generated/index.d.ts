import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

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

interface UpsertUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertUserVariables): MutationRef<UpsertUserData, UpsertUserVariables>;
  operationName: string;
}
export const upsertUserRef: UpsertUserRef;

export function upsertUser(vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;
export function upsertUser(dc: DataConnect, vars: UpsertUserVariables): MutationPromise<UpsertUserData, UpsertUserVariables>;

interface UpdateUserRoleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
  operationName: string;
}
export const updateUserRoleRef: UpdateUserRoleRef;

export function updateUserRole(vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;
export function updateUserRole(dc: DataConnect, vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;

interface UpdateUserLocationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserLocationVariables): MutationRef<UpdateUserLocationData, UpdateUserLocationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserLocationVariables): MutationRef<UpdateUserLocationData, UpdateUserLocationVariables>;
  operationName: string;
}
export const updateUserLocationRef: UpdateUserLocationRef;

export function updateUserLocation(vars: UpdateUserLocationVariables): MutationPromise<UpdateUserLocationData, UpdateUserLocationVariables>;
export function updateUserLocation(dc: DataConnect, vars: UpdateUserLocationVariables): MutationPromise<UpdateUserLocationData, UpdateUserLocationVariables>;

interface TriggerEventRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: TriggerEventVariables): MutationRef<TriggerEventData, TriggerEventVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: TriggerEventVariables): MutationRef<TriggerEventData, TriggerEventVariables>;
  operationName: string;
}
export const triggerEventRef: TriggerEventRef;

export function triggerEvent(vars: TriggerEventVariables): MutationPromise<TriggerEventData, TriggerEventVariables>;
export function triggerEvent(dc: DataConnect, vars: TriggerEventVariables): MutationPromise<TriggerEventData, TriggerEventVariables>;

interface MarketMakerTradeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarketMakerTradeVariables): MutationRef<MarketMakerTradeData, MarketMakerTradeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: MarketMakerTradeVariables): MutationRef<MarketMakerTradeData, MarketMakerTradeVariables>;
  operationName: string;
}
export const marketMakerTradeRef: MarketMakerTradeRef;

export function marketMakerTrade(vars: MarketMakerTradeVariables): MutationPromise<MarketMakerTradeData, MarketMakerTradeVariables>;
export function marketMakerTrade(dc: DataConnect, vars: MarketMakerTradeVariables): MutationPromise<MarketMakerTradeData, MarketMakerTradeVariables>;

interface BuyStockRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: BuyStockVariables): MutationRef<BuyStockData, BuyStockVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: BuyStockVariables): MutationRef<BuyStockData, BuyStockVariables>;
  operationName: string;
}
export const buyStockRef: BuyStockRef;

export function buyStock(vars: BuyStockVariables): MutationPromise<BuyStockData, BuyStockVariables>;
export function buyStock(dc: DataConnect, vars: BuyStockVariables): MutationPromise<BuyStockData, BuyStockVariables>;

interface SellStockRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SellStockVariables): MutationRef<SellStockData, SellStockVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SellStockVariables): MutationRef<SellStockData, SellStockVariables>;
  operationName: string;
}
export const sellStockRef: SellStockRef;

export function sellStock(vars: SellStockVariables): MutationPromise<SellStockData, SellStockVariables>;
export function sellStock(dc: DataConnect, vars: SellStockVariables): MutationPromise<SellStockData, SellStockVariables>;

interface GenerateTradeHeadlineRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GenerateTradeHeadlineVariables): MutationRef<GenerateTradeHeadlineData, GenerateTradeHeadlineVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GenerateTradeHeadlineVariables): MutationRef<GenerateTradeHeadlineData, GenerateTradeHeadlineVariables>;
  operationName: string;
}
export const generateTradeHeadlineRef: GenerateTradeHeadlineRef;

export function generateTradeHeadline(vars: GenerateTradeHeadlineVariables): MutationPromise<GenerateTradeHeadlineData, GenerateTradeHeadlineVariables>;
export function generateTradeHeadline(dc: DataConnect, vars: GenerateTradeHeadlineVariables): MutationPromise<GenerateTradeHeadlineData, GenerateTradeHeadlineVariables>;

interface ExecuteReadXPostTransactionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ExecuteReadXPostTransactionVariables): MutationRef<ExecuteReadXPostTransactionData, ExecuteReadXPostTransactionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ExecuteReadXPostTransactionVariables): MutationRef<ExecuteReadXPostTransactionData, ExecuteReadXPostTransactionVariables>;
  operationName: string;
}
export const executeReadXPostTransactionRef: ExecuteReadXPostTransactionRef;

export function executeReadXPostTransaction(vars: ExecuteReadXPostTransactionVariables): MutationPromise<ExecuteReadXPostTransactionData, ExecuteReadXPostTransactionVariables>;
export function executeReadXPostTransaction(dc: DataConnect, vars: ExecuteReadXPostTransactionVariables): MutationPromise<ExecuteReadXPostTransactionData, ExecuteReadXPostTransactionVariables>;

interface TriggerSocialBoostRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: TriggerSocialBoostVariables): MutationRef<TriggerSocialBoostData, TriggerSocialBoostVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: TriggerSocialBoostVariables): MutationRef<TriggerSocialBoostData, TriggerSocialBoostVariables>;
  operationName: string;
}
export const triggerSocialBoostRef: TriggerSocialBoostRef;

export function triggerSocialBoost(vars: TriggerSocialBoostVariables): MutationPromise<TriggerSocialBoostData, TriggerSocialBoostVariables>;
export function triggerSocialBoost(dc: DataConnect, vars: TriggerSocialBoostVariables): MutationPromise<TriggerSocialBoostData, TriggerSocialBoostVariables>;

interface PanicSellPortfolioRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<PanicSellPortfolioData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<PanicSellPortfolioData, undefined>;
  operationName: string;
}
export const panicSellPortfolioRef: PanicSellPortfolioRef;

export function panicSellPortfolio(): MutationPromise<PanicSellPortfolioData, undefined>;
export function panicSellPortfolio(dc: DataConnect): MutationPromise<PanicSellPortfolioData, undefined>;

interface TriggerMarketCrashRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: TriggerMarketCrashVariables): MutationRef<TriggerMarketCrashData, TriggerMarketCrashVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: TriggerMarketCrashVariables): MutationRef<TriggerMarketCrashData, TriggerMarketCrashVariables>;
  operationName: string;
}
export const triggerMarketCrashRef: TriggerMarketCrashRef;

export function triggerMarketCrash(vars: TriggerMarketCrashVariables): MutationPromise<TriggerMarketCrashData, TriggerMarketCrashVariables>;
export function triggerMarketCrash(dc: DataConnect, vars: TriggerMarketCrashVariables): MutationPromise<TriggerMarketCrashData, TriggerMarketCrashVariables>;

interface GetDashboardDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetDashboardDataData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetDashboardDataData, undefined>;
  operationName: string;
}
export const getDashboardDataRef: GetDashboardDataRef;

export function getDashboardData(options?: ExecuteQueryOptions): QueryPromise<GetDashboardDataData, undefined>;
export function getDashboardData(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetDashboardDataData, undefined>;

interface GetUserProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetUserProfileData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetUserProfileData, undefined>;
  operationName: string;
}
export const getUserProfileRef: GetUserProfileRef;

export function getUserProfile(options?: ExecuteQueryOptions): QueryPromise<GetUserProfileData, undefined>;
export function getUserProfile(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetUserProfileData, undefined>;

interface GetPriceHistoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPriceHistoryVariables): QueryRef<GetPriceHistoryData, GetPriceHistoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPriceHistoryVariables): QueryRef<GetPriceHistoryData, GetPriceHistoryVariables>;
  operationName: string;
}
export const getPriceHistoryRef: GetPriceHistoryRef;

export function getPriceHistory(vars: GetPriceHistoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetPriceHistoryData, GetPriceHistoryVariables>;
export function getPriceHistory(dc: DataConnect, vars: GetPriceHistoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetPriceHistoryData, GetPriceHistoryVariables>;

interface GetEmojiWhaleStatsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetEmojiWhaleStatsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetEmojiWhaleStatsData, undefined>;
  operationName: string;
}
export const getEmojiWhaleStatsRef: GetEmojiWhaleStatsRef;

export function getEmojiWhaleStats(options?: ExecuteQueryOptions): QueryPromise<GetEmojiWhaleStatsData, undefined>;
export function getEmojiWhaleStats(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetEmojiWhaleStatsData, undefined>;

interface GetEmojiHistoryStatsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetEmojiHistoryStatsVariables): QueryRef<GetEmojiHistoryStatsData, GetEmojiHistoryStatsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetEmojiHistoryStatsVariables): QueryRef<GetEmojiHistoryStatsData, GetEmojiHistoryStatsVariables>;
  operationName: string;
}
export const getEmojiHistoryStatsRef: GetEmojiHistoryStatsRef;

export function getEmojiHistoryStats(vars: GetEmojiHistoryStatsVariables, options?: ExecuteQueryOptions): QueryPromise<GetEmojiHistoryStatsData, GetEmojiHistoryStatsVariables>;
export function getEmojiHistoryStats(dc: DataConnect, vars: GetEmojiHistoryStatsVariables, options?: ExecuteQueryOptions): QueryPromise<GetEmojiHistoryStatsData, GetEmojiHistoryStatsVariables>;

interface GetChronologicalTickerRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetChronologicalTickerData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetChronologicalTickerData, undefined>;
  operationName: string;
}
export const getChronologicalTickerRef: GetChronologicalTickerRef;

export function getChronologicalTicker(options?: ExecuteQueryOptions): QueryPromise<GetChronologicalTickerData, undefined>;
export function getChronologicalTicker(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetChronologicalTickerData, undefined>;

interface GetEmojiSparklinesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetEmojiSparklinesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetEmojiSparklinesData, undefined>;
  operationName: string;
}
export const getEmojiSparklinesRef: GetEmojiSparklinesRef;

export function getEmojiSparklines(options?: ExecuteQueryOptions): QueryPromise<GetEmojiSparklinesData, undefined>;
export function getEmojiSparklines(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetEmojiSparklinesData, undefined>;

interface GetTopTradersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTopTradersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetTopTradersData, undefined>;
  operationName: string;
}
export const getTopTradersRef: GetTopTradersRef;

export function getTopTraders(options?: ExecuteQueryOptions): QueryPromise<GetTopTradersData, undefined>;
export function getTopTraders(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetTopTradersData, undefined>;

interface SearchEmojisRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: SearchEmojisVariables): QueryRef<SearchEmojisData, SearchEmojisVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: SearchEmojisVariables): QueryRef<SearchEmojisData, SearchEmojisVariables>;
  operationName: string;
}
export const searchEmojisRef: SearchEmojisRef;

export function searchEmojis(vars?: SearchEmojisVariables, options?: ExecuteQueryOptions): QueryPromise<SearchEmojisData, SearchEmojisVariables>;
export function searchEmojis(dc: DataConnect, vars?: SearchEmojisVariables, options?: ExecuteQueryOptions): QueryPromise<SearchEmojisData, SearchEmojisVariables>;

interface GetTopEmojisByCityRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetTopEmojisByCityData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetTopEmojisByCityData, undefined>;
  operationName: string;
}
export const getTopEmojisByCityRef: GetTopEmojisByCityRef;

export function getTopEmojisByCity(options?: ExecuteQueryOptions): QueryPromise<GetTopEmojisByCityData, undefined>;
export function getTopEmojisByCity(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetTopEmojisByCityData, undefined>;

interface GetTrendingEmojisNearMeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTrendingEmojisNearMeVariables): QueryRef<GetTrendingEmojisNearMeData, GetTrendingEmojisNearMeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTrendingEmojisNearMeVariables): QueryRef<GetTrendingEmojisNearMeData, GetTrendingEmojisNearMeVariables>;
  operationName: string;
}
export const getTrendingEmojisNearMeRef: GetTrendingEmojisNearMeRef;

export function getTrendingEmojisNearMe(vars: GetTrendingEmojisNearMeVariables, options?: ExecuteQueryOptions): QueryPromise<GetTrendingEmojisNearMeData, GetTrendingEmojisNearMeVariables>;
export function getTrendingEmojisNearMe(dc: DataConnect, vars: GetTrendingEmojisNearMeVariables, options?: ExecuteQueryOptions): QueryPromise<GetTrendingEmojisNearMeData, GetTrendingEmojisNearMeVariables>;

interface VectorSearchEmojisRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: VectorSearchEmojisVariables): QueryRef<VectorSearchEmojisData, VectorSearchEmojisVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: VectorSearchEmojisVariables): QueryRef<VectorSearchEmojisData, VectorSearchEmojisVariables>;
  operationName: string;
}
export const vectorSearchEmojisRef: VectorSearchEmojisRef;

export function vectorSearchEmojis(vars: VectorSearchEmojisVariables, options?: ExecuteQueryOptions): QueryPromise<VectorSearchEmojisData, VectorSearchEmojisVariables>;
export function vectorSearchEmojis(dc: DataConnect, vars: VectorSearchEmojisVariables, options?: ExecuteQueryOptions): QueryPromise<VectorSearchEmojisData, VectorSearchEmojisVariables>;

