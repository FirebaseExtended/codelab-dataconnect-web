import { GetDashboardDataData, GetUserProfileData, GetPriceHistoryData, GetPriceHistoryVariables, GetEmojiWhaleStatsData, GetEmojiHistoryStatsData, GetEmojiHistoryStatsVariables, GetTopTradersData, GetChronologicalTickerData, GetEmojiSparklinesData, SearchEmojisData, SearchEmojisVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useGetDashboardData(options?: useDataConnectQueryOptions<GetDashboardDataData>): UseDataConnectQueryResult<GetDashboardDataData, undefined>;
export function useGetDashboardData(dc: DataConnect, options?: useDataConnectQueryOptions<GetDashboardDataData>): UseDataConnectQueryResult<GetDashboardDataData, undefined>;

export function useGetUserProfile(options?: useDataConnectQueryOptions<GetUserProfileData>): UseDataConnectQueryResult<GetUserProfileData, undefined>;
export function useGetUserProfile(dc: DataConnect, options?: useDataConnectQueryOptions<GetUserProfileData>): UseDataConnectQueryResult<GetUserProfileData, undefined>;

export function useGetPriceHistory(vars: GetPriceHistoryVariables, options?: useDataConnectQueryOptions<GetPriceHistoryData>): UseDataConnectQueryResult<GetPriceHistoryData, GetPriceHistoryVariables>;
export function useGetPriceHistory(dc: DataConnect, vars: GetPriceHistoryVariables, options?: useDataConnectQueryOptions<GetPriceHistoryData>): UseDataConnectQueryResult<GetPriceHistoryData, GetPriceHistoryVariables>;

export function useGetEmojiWhaleStats(options?: useDataConnectQueryOptions<GetEmojiWhaleStatsData>): UseDataConnectQueryResult<GetEmojiWhaleStatsData, undefined>;
export function useGetEmojiWhaleStats(dc: DataConnect, options?: useDataConnectQueryOptions<GetEmojiWhaleStatsData>): UseDataConnectQueryResult<GetEmojiWhaleStatsData, undefined>;

export function useGetEmojiHistoryStats(vars: GetEmojiHistoryStatsVariables, options?: useDataConnectQueryOptions<GetEmojiHistoryStatsData>): UseDataConnectQueryResult<GetEmojiHistoryStatsData, GetEmojiHistoryStatsVariables>;
export function useGetEmojiHistoryStats(dc: DataConnect, vars: GetEmojiHistoryStatsVariables, options?: useDataConnectQueryOptions<GetEmojiHistoryStatsData>): UseDataConnectQueryResult<GetEmojiHistoryStatsData, GetEmojiHistoryStatsVariables>;

export function useGetTopTraders(options?: useDataConnectQueryOptions<GetTopTradersData>): UseDataConnectQueryResult<GetTopTradersData, undefined>;
export function useGetTopTraders(dc: DataConnect, options?: useDataConnectQueryOptions<GetTopTradersData>): UseDataConnectQueryResult<GetTopTradersData, undefined>;

export function useGetChronologicalTicker(options?: useDataConnectQueryOptions<GetChronologicalTickerData>): UseDataConnectQueryResult<GetChronologicalTickerData, undefined>;
export function useGetChronologicalTicker(dc: DataConnect, options?: useDataConnectQueryOptions<GetChronologicalTickerData>): UseDataConnectQueryResult<GetChronologicalTickerData, undefined>;

export function useGetEmojiSparklines(options?: useDataConnectQueryOptions<GetEmojiSparklinesData>): UseDataConnectQueryResult<GetEmojiSparklinesData, undefined>;
export function useGetEmojiSparklines(dc: DataConnect, options?: useDataConnectQueryOptions<GetEmojiSparklinesData>): UseDataConnectQueryResult<GetEmojiSparklinesData, undefined>;

export function useSearchEmojis(vars?: SearchEmojisVariables, options?: useDataConnectQueryOptions<SearchEmojisData>): UseDataConnectQueryResult<SearchEmojisData, SearchEmojisVariables>;
export function useSearchEmojis(dc: DataConnect, vars?: SearchEmojisVariables, options?: useDataConnectQueryOptions<SearchEmojisData>): UseDataConnectQueryResult<SearchEmojisData, SearchEmojisVariables>;
