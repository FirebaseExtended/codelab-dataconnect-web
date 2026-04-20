const { validateAdminArgs } = require('firebase-admin/data-connect');

const connectorConfig = {
  connector: 'friendly-exchange',
  serviceId: 'your-project-id-service',
  location: 'us-west4'
};
exports.connectorConfig = connectorConfig;

function upsertUser(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpsertUser', inputVars, inputOpts);
}
exports.upsertUser = upsertUser;

function updateUserRole(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateUserRole', inputVars, inputOpts);
}
exports.updateUserRole = updateUserRole;

function updateUserLocation(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateUserLocation', inputVars, inputOpts);
}
exports.updateUserLocation = updateUserLocation;

function triggerEvent(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('TriggerEvent', inputVars, inputOpts);
}
exports.triggerEvent = triggerEvent;

function marketMakerTrade(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('MarketMakerTrade', inputVars, inputOpts);
}
exports.marketMakerTrade = marketMakerTrade;

function buyStock(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('BuyStock', inputVars, inputOpts);
}
exports.buyStock = buyStock;

function sellStock(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('SellStock', inputVars, inputOpts);
}
exports.sellStock = sellStock;

function generateTradeHeadline(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('GenerateTradeHeadline', inputVars, inputOpts);
}
exports.generateTradeHeadline = generateTradeHeadline;

function executeReadXPostTransaction(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('ExecuteReadXPostTransaction', inputVars, inputOpts);
}
exports.executeReadXPostTransaction = executeReadXPostTransaction;

function triggerSocialBoost(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('TriggerSocialBoost', inputVars, inputOpts);
}
exports.triggerSocialBoost = triggerSocialBoost;

function panicSellPortfolio(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('PanicSellPortfolio', undefined, inputOpts);
}
exports.panicSellPortfolio = panicSellPortfolio;

function triggerMarketCrash(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('TriggerMarketCrash', inputVars, inputOpts);
}
exports.triggerMarketCrash = triggerMarketCrash;

function getDashboardData(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetDashboardData', undefined, inputOpts);
}
exports.getDashboardData = getDashboardData;

function getUserProfile(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetUserProfile', undefined, inputOpts);
}
exports.getUserProfile = getUserProfile;

function getPriceHistory(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetPriceHistory', inputVars, inputOpts);
}
exports.getPriceHistory = getPriceHistory;

function getEmojiWhaleStats(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetEmojiWhaleStats', undefined, inputOpts);
}
exports.getEmojiWhaleStats = getEmojiWhaleStats;

function getEmojiHistoryStats(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetEmojiHistoryStats', inputVars, inputOpts);
}
exports.getEmojiHistoryStats = getEmojiHistoryStats;

function getChronologicalTicker(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetChronologicalTicker', undefined, inputOpts);
}
exports.getChronologicalTicker = getChronologicalTicker;

function getEmojiSparklines(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetEmojiSparklines', undefined, inputOpts);
}
exports.getEmojiSparklines = getEmojiSparklines;

function getTopTraders(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetTopTraders', undefined, inputOpts);
}
exports.getTopTraders = getTopTraders;

function searchEmojis(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, false);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('SearchEmojis', inputVars, inputOpts);
}
exports.searchEmojis = searchEmojis;

function getTopEmojisByCity(dcOrOptions, options) {
  const { dc: dcInstance, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrOptions, options, undefined);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetTopEmojisByCity', undefined, inputOpts);
}
exports.getTopEmojisByCity = getTopEmojisByCity;

function getTrendingEmojisNearMe(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetTrendingEmojisNearMe', inputVars, inputOpts);
}
exports.getTrendingEmojisNearMe = getTrendingEmojisNearMe;

function vectorSearchEmojis(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('VectorSearchEmojis', inputVars, inputOpts);
}
exports.vectorSearchEmojis = vectorSearchEmojis;

