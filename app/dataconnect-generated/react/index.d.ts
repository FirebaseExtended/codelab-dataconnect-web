import { UpsertUserData, UpsertUserVariables, UpdateUserRoleData, UpdateUserRoleVariables, UpdateUserLocationData, UpdateUserLocationVariables, TriggerEventData, TriggerEventVariables, MarketMakerTradeData, MarketMakerTradeVariables, BuyStockData, BuyStockVariables, SellStockData, SellStockVariables, GetDashboardDataData, GetUserProfileData, GetPriceHistoryData, GetPriceHistoryVariables, GetEmojiWhaleStatsData, GetEmojiHistoryStatsData, GetEmojiHistoryStatsVariables, GetTopTradersData, GetChronologicalTickerData, GetEmojiSparklinesData, SearchEmojisData, SearchEmojisVariables, GetTopEmojisByCityData, GetTrendingEmojisNearMeData, GetTrendingEmojisNearMeVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useUpsertUser(options?: useDataConnectMutationOptions<UpsertUserData, FirebaseError, UpsertUserVariables>): UseDataConnectMutationResult<UpsertUserData, UpsertUserVariables>;
export function useUpsertUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertUserData, FirebaseError, UpsertUserVariables>): UseDataConnectMutationResult<UpsertUserData, UpsertUserVariables>;

export function useUpdateUserRole(options?: useDataConnectMutationOptions<UpdateUserRoleData, FirebaseError, UpdateUserRoleVariables>): UseDataConnectMutationResult<UpdateUserRoleData, UpdateUserRoleVariables>;
export function useUpdateUserRole(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserRoleData, FirebaseError, UpdateUserRoleVariables>): UseDataConnectMutationResult<UpdateUserRoleData, UpdateUserRoleVariables>;

export function useUpdateUserLocation(options?: useDataConnectMutationOptions<UpdateUserLocationData, FirebaseError, UpdateUserLocationVariables>): UseDataConnectMutationResult<UpdateUserLocationData, UpdateUserLocationVariables>;
export function useUpdateUserLocation(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateUserLocationData, FirebaseError, UpdateUserLocationVariables>): UseDataConnectMutationResult<UpdateUserLocationData, UpdateUserLocationVariables>;

export function useTriggerEvent(options?: useDataConnectMutationOptions<TriggerEventData, FirebaseError, TriggerEventVariables>): UseDataConnectMutationResult<TriggerEventData, TriggerEventVariables>;
export function useTriggerEvent(dc: DataConnect, options?: useDataConnectMutationOptions<TriggerEventData, FirebaseError, TriggerEventVariables>): UseDataConnectMutationResult<TriggerEventData, TriggerEventVariables>;

export function useMarketMakerTrade(options?: useDataConnectMutationOptions<MarketMakerTradeData, FirebaseError, MarketMakerTradeVariables>): UseDataConnectMutationResult<MarketMakerTradeData, MarketMakerTradeVariables>;
export function useMarketMakerTrade(dc: DataConnect, options?: useDataConnectMutationOptions<MarketMakerTradeData, FirebaseError, MarketMakerTradeVariables>): UseDataConnectMutationResult<MarketMakerTradeData, MarketMakerTradeVariables>;

export function useBuyStock(options?: useDataConnectMutationOptions<BuyStockData, FirebaseError, BuyStockVariables>): UseDataConnectMutationResult<BuyStockData, BuyStockVariables>;
export function useBuyStock(dc: DataConnect, options?: useDataConnectMutationOptions<BuyStockData, FirebaseError, BuyStockVariables>): UseDataConnectMutationResult<BuyStockData, BuyStockVariables>;

export function useSellStock(options?: useDataConnectMutationOptions<SellStockData, FirebaseError, SellStockVariables>): UseDataConnectMutationResult<SellStockData, SellStockVariables>;
export function useSellStock(dc: DataConnect, options?: useDataConnectMutationOptions<SellStockData, FirebaseError, SellStockVariables>): UseDataConnectMutationResult<SellStockData, SellStockVariables>;

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

export function useGetTopEmojisByCity(options?: useDataConnectQueryOptions<GetTopEmojisByCityData>): UseDataConnectQueryResult<GetTopEmojisByCityData, undefined>;
export function useGetTopEmojisByCity(dc: DataConnect, options?: useDataConnectQueryOptions<GetTopEmojisByCityData>): UseDataConnectQueryResult<GetTopEmojisByCityData, undefined>;

export function useGetTrendingEmojisNearMe(vars: GetTrendingEmojisNearMeVariables, options?: useDataConnectQueryOptions<GetTrendingEmojisNearMeData>): UseDataConnectQueryResult<GetTrendingEmojisNearMeData, GetTrendingEmojisNearMeVariables>;
export function useGetTrendingEmojisNearMe(dc: DataConnect, vars: GetTrendingEmojisNearMeVariables, options?: useDataConnectQueryOptions<GetTrendingEmojisNearMeData>): UseDataConnectQueryResult<GetTrendingEmojisNearMeData, GetTrendingEmojisNearMeVariables>;
