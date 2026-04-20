const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs, makeMemoryCacheProvider } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'friendly-exchange',
  service: 'your-project-id-service',
  location: 'us-west4'
};
exports.connectorConfig = connectorConfig;
const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider(),
    maxAgeSeconds: 10
  }
};
exports.dataConnectSettings = dataConnectSettings;

const upsertUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}
upsertUserRef.operationName = 'UpsertUser';
exports.upsertUserRef = upsertUserRef;

exports.upsertUser = function upsertUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertUserRef(dcInstance, inputVars));
}
;

const updateUserRoleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserRole', inputVars);
}
updateUserRoleRef.operationName = 'UpdateUserRole';
exports.updateUserRoleRef = updateUserRoleRef;

exports.updateUserRole = function updateUserRole(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateUserRoleRef(dcInstance, inputVars));
}
;

const updateUserLocationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserLocation', inputVars);
}
updateUserLocationRef.operationName = 'UpdateUserLocation';
exports.updateUserLocationRef = updateUserLocationRef;

exports.updateUserLocation = function updateUserLocation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateUserLocationRef(dcInstance, inputVars));
}
;

const triggerEventRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'TriggerEvent', inputVars);
}
triggerEventRef.operationName = 'TriggerEvent';
exports.triggerEventRef = triggerEventRef;

exports.triggerEvent = function triggerEvent(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(triggerEventRef(dcInstance, inputVars));
}
;

const marketMakerTradeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MarketMakerTrade', inputVars);
}
marketMakerTradeRef.operationName = 'MarketMakerTrade';
exports.marketMakerTradeRef = marketMakerTradeRef;

exports.marketMakerTrade = function marketMakerTrade(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(marketMakerTradeRef(dcInstance, inputVars));
}
;

const buyStockRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'BuyStock', inputVars);
}
buyStockRef.operationName = 'BuyStock';
exports.buyStockRef = buyStockRef;

exports.buyStock = function buyStock(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(buyStockRef(dcInstance, inputVars));
}
;

const sellStockRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SellStock', inputVars);
}
sellStockRef.operationName = 'SellStock';
exports.sellStockRef = sellStockRef;

exports.sellStock = function sellStock(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(sellStockRef(dcInstance, inputVars));
}
;

const generateTradeHeadlineRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'GenerateTradeHeadline', inputVars);
}
generateTradeHeadlineRef.operationName = 'GenerateTradeHeadline';
exports.generateTradeHeadlineRef = generateTradeHeadlineRef;

exports.generateTradeHeadline = function generateTradeHeadline(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(generateTradeHeadlineRef(dcInstance, inputVars));
}
;

const executeReadXPostTransactionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ExecuteReadXPostTransaction', inputVars);
}
executeReadXPostTransactionRef.operationName = 'ExecuteReadXPostTransaction';
exports.executeReadXPostTransactionRef = executeReadXPostTransactionRef;

exports.executeReadXPostTransaction = function executeReadXPostTransaction(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(executeReadXPostTransactionRef(dcInstance, inputVars));
}
;

const triggerSocialBoostRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'TriggerSocialBoost', inputVars);
}
triggerSocialBoostRef.operationName = 'TriggerSocialBoost';
exports.triggerSocialBoostRef = triggerSocialBoostRef;

exports.triggerSocialBoost = function triggerSocialBoost(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(triggerSocialBoostRef(dcInstance, inputVars));
}
;

const panicSellPortfolioRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'PanicSellPortfolio');
}
panicSellPortfolioRef.operationName = 'PanicSellPortfolio';
exports.panicSellPortfolioRef = panicSellPortfolioRef;

exports.panicSellPortfolio = function panicSellPortfolio(dc) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dc, undefined);
  return executeMutation(panicSellPortfolioRef(dcInstance, inputVars));
}
;

const triggerMarketCrashRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'TriggerMarketCrash', inputVars);
}
triggerMarketCrashRef.operationName = 'TriggerMarketCrash';
exports.triggerMarketCrashRef = triggerMarketCrashRef;

exports.triggerMarketCrash = function triggerMarketCrash(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(triggerMarketCrashRef(dcInstance, inputVars));
}
;

const getDashboardDataRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDashboardData');
}
getDashboardDataRef.operationName = 'GetDashboardData';
exports.getDashboardDataRef = getDashboardDataRef;

exports.getDashboardData = function getDashboardData(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getDashboardDataRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getUserProfileRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserProfile');
}
getUserProfileRef.operationName = 'GetUserProfile';
exports.getUserProfileRef = getUserProfileRef;

exports.getUserProfile = function getUserProfile(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getUserProfileRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getPriceHistoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPriceHistory', inputVars);
}
getPriceHistoryRef.operationName = 'GetPriceHistory';
exports.getPriceHistoryRef = getPriceHistoryRef;

exports.getPriceHistory = function getPriceHistory(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPriceHistoryRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getEmojiWhaleStatsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEmojiWhaleStats');
}
getEmojiWhaleStatsRef.operationName = 'GetEmojiWhaleStats';
exports.getEmojiWhaleStatsRef = getEmojiWhaleStatsRef;

exports.getEmojiWhaleStats = function getEmojiWhaleStats(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getEmojiWhaleStatsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getEmojiHistoryStatsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEmojiHistoryStats', inputVars);
}
getEmojiHistoryStatsRef.operationName = 'GetEmojiHistoryStats';
exports.getEmojiHistoryStatsRef = getEmojiHistoryStatsRef;

exports.getEmojiHistoryStats = function getEmojiHistoryStats(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getEmojiHistoryStatsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getChronologicalTickerRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetChronologicalTicker');
}
getChronologicalTickerRef.operationName = 'GetChronologicalTicker';
exports.getChronologicalTickerRef = getChronologicalTickerRef;

exports.getChronologicalTicker = function getChronologicalTicker(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getChronologicalTickerRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getEmojiSparklinesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEmojiSparklines');
}
getEmojiSparklinesRef.operationName = 'GetEmojiSparklines';
exports.getEmojiSparklinesRef = getEmojiSparklinesRef;

exports.getEmojiSparklines = function getEmojiSparklines(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getEmojiSparklinesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getTopTradersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTopTraders');
}
getTopTradersRef.operationName = 'GetTopTraders';
exports.getTopTradersRef = getTopTradersRef;

exports.getTopTraders = function getTopTraders(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getTopTradersRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const searchEmojisRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchEmojis', inputVars);
}
searchEmojisRef.operationName = 'SearchEmojis';
exports.searchEmojisRef = searchEmojisRef;

exports.searchEmojis = function searchEmojis(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, false);
  return executeQuery(searchEmojisRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getTopEmojisByCityRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTopEmojisByCity');
}
getTopEmojisByCityRef.operationName = 'GetTopEmojisByCity';
exports.getTopEmojisByCityRef = getTopEmojisByCityRef;

exports.getTopEmojisByCity = function getTopEmojisByCity(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getTopEmojisByCityRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getTrendingEmojisNearMeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTrendingEmojisNearMe', inputVars);
}
getTrendingEmojisNearMeRef.operationName = 'GetTrendingEmojisNearMe';
exports.getTrendingEmojisNearMeRef = getTrendingEmojisNearMeRef;

exports.getTrendingEmojisNearMe = function getTrendingEmojisNearMe(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getTrendingEmojisNearMeRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const vectorSearchEmojisRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'VectorSearchEmojis', inputVars);
}
vectorSearchEmojisRef.operationName = 'VectorSearchEmojis';
exports.vectorSearchEmojisRef = vectorSearchEmojisRef;

exports.vectorSearchEmojis = function vectorSearchEmojis(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(vectorSearchEmojisRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;
