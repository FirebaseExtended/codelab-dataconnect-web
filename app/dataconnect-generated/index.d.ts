import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Emoji_Key {
  id: UUIDString;
  __typename?: 'Emoji_Key';
}

export interface Event_Key {
  id: UUIDString;
  __typename?: 'Event_Key';
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

export interface GetTopTradersData {
  topTraders: ({
    id?: string | null;
    username?: string | null;
    profileImage?: string | null;
    netWorth?: number | null;
    rank?: number | null;
  })[];
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

export interface PriceHistory_Key {
  id: UUIDString;
  __typename?: 'PriceHistory_Key';
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

export interface StockOwnership_Key {
  userId: string;
  emojiId: UUIDString;
  __typename?: 'StockOwnership_Key';
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

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

