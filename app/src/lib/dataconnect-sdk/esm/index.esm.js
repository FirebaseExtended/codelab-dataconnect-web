import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';
export const OrderDirection = {

  ASC: "ASC",

  DESC: "DESC",
}

export const connectorConfig = {
  connector: 'movie-connector',
  service: 'your-service-id',
  location: 'us-central1'
};

export function upsertUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}

export function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
}

export function addFavoritedMovieRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddFavoritedMovie', inputVars);
}

export function addFavoritedMovie(dcOrVars, vars) {
  return executeMutation(addFavoritedMovieRef(dcOrVars, vars));
}

export function deleteFavoritedMovieRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFavoritedMovie', inputVars);
}

export function deleteFavoritedMovie(dcOrVars, vars) {
  return executeMutation(deleteFavoritedMovieRef(dcOrVars, vars));
}

export function addReviewRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddReview', inputVars);
}

export function addReview(dcOrVars, vars) {
  return executeMutation(addReviewRef(dcOrVars, vars));
}

export function deleteReviewRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteReview', inputVars);
}

export function deleteReview(dcOrVars, vars) {
  return executeMutation(deleteReviewRef(dcOrVars, vars));
}

export function listMoviesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMovies', inputVars);
}

export function listMovies(dcOrVars, vars) {
  return executeQuery(listMoviesRef(dcOrVars, vars));
}

export function getMovieByIdRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMovieById', inputVars);
}

export function getMovieById(dcOrVars, vars) {
  return executeQuery(getMovieByIdRef(dcOrVars, vars));
}

export function getActorByIdRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetActorById', inputVars);
}

export function getActorById(dcOrVars, vars) {
  return executeQuery(getActorByIdRef(dcOrVars, vars));
}

export function getCurrentUserRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUser');
}

export function getCurrentUser(dc) {
  return executeQuery(getCurrentUserRef(dc));
}

export function getIfFavoritedMovieRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetIfFavoritedMovie', inputVars);
}

export function getIfFavoritedMovie(dcOrVars, vars) {
  return executeQuery(getIfFavoritedMovieRef(dcOrVars, vars));
}

export function searchAllRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchAll', inputVars);
}

export function searchAll(dcOrVars, vars) {
  return executeQuery(searchAllRef(dcOrVars, vars));
}

