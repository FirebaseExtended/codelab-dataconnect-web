import { queryRef, executeQuery, validateArgsWithOptions, validateArgs, makeMemoryCacheProvider } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'friendly-exchange',
  service: 'your-project-id-service',
  location: 'us-west4'
};
export const dataConnectSettings = {
  cacheSettings: {
    cacheProvider: makeMemoryCacheProvider(),
    maxAgeSeconds: 10
  }
};
export const getDashboardDataRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDashboardData');
}
getDashboardDataRef.operationName = 'GetDashboardData';

export function getDashboardData(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getDashboardDataRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getUserProfileRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserProfile');
}
getUserProfileRef.operationName = 'GetUserProfile';

export function getUserProfile(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getUserProfileRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getPriceHistoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPriceHistory', inputVars);
}
getPriceHistoryRef.operationName = 'GetPriceHistory';

export function getPriceHistory(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPriceHistoryRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getEmojiWhaleStatsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEmojiWhaleStats');
}
getEmojiWhaleStatsRef.operationName = 'GetEmojiWhaleStats';

export function getEmojiWhaleStats(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getEmojiWhaleStatsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getEmojiHistoryStatsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEmojiHistoryStats', inputVars);
}
getEmojiHistoryStatsRef.operationName = 'GetEmojiHistoryStats';

export function getEmojiHistoryStats(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getEmojiHistoryStatsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getTopTradersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetTopTraders');
}
getTopTradersRef.operationName = 'GetTopTraders';

export function getTopTraders(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getTopTradersRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getChronologicalTickerRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetChronologicalTicker');
}
getChronologicalTickerRef.operationName = 'GetChronologicalTicker';

export function getChronologicalTicker(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getChronologicalTickerRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getEmojiSparklinesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetEmojiSparklines');
}
getEmojiSparklinesRef.operationName = 'GetEmojiSparklines';

export function getEmojiSparklines(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getEmojiSparklinesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const searchEmojisRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchEmojis', inputVars);
}
searchEmojisRef.operationName = 'SearchEmojis';

export function searchEmojis(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, false);
  return executeQuery(searchEmojisRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

