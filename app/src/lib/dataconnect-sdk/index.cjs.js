const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const OrderDirection = {

  ASC: "ASC",

  DESC: "DESC",
}
exports.OrderDirection = OrderDirection;

const connectorConfig = {
  connector: 'movie-connector',
  service: 'your-service-id',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

exports.upsertUserRef = function upsertUserRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertUser', inputVars);
}

exports.upsertUser = function upsertUser(dcOrVars, vars) {
  return executeMutation(upsertUserRef(dcOrVars, vars));
};
exports.addFavoritedMovieRef = function addFavoritedMovieRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddFavoritedMovie', inputVars);
}

exports.addFavoritedMovie = function addFavoritedMovie(dcOrVars, vars) {
  return executeMutation(addFavoritedMovieRef(dcOrVars, vars));
};
exports.deleteFavoritedMovieRef = function deleteFavoritedMovieRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteFavoritedMovie', inputVars);
}

exports.deleteFavoritedMovie = function deleteFavoritedMovie(dcOrVars, vars) {
  return executeMutation(deleteFavoritedMovieRef(dcOrVars, vars));
};
exports.addReviewRef = function addReviewRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddReview', inputVars);
}

exports.addReview = function addReview(dcOrVars, vars) {
  return executeMutation(addReviewRef(dcOrVars, vars));
};
exports.deleteReviewRef = function deleteReviewRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteReview', inputVars);
}

exports.deleteReview = function deleteReview(dcOrVars, vars) {
  return executeMutation(deleteReviewRef(dcOrVars, vars));
};
exports.listMoviesRef = function listMoviesRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMovies', inputVars);
}

exports.listMovies = function listMovies(dcOrVars, vars) {
  return executeQuery(listMoviesRef(dcOrVars, vars));
};
exports.getMovieByIdRef = function getMovieByIdRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMovieById', inputVars);
}

exports.getMovieById = function getMovieById(dcOrVars, vars) {
  return executeQuery(getMovieByIdRef(dcOrVars, vars));
};
exports.getActorByIdRef = function getActorByIdRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetActorById', inputVars);
}

exports.getActorById = function getActorById(dcOrVars, vars) {
  return executeQuery(getActorByIdRef(dcOrVars, vars));
};
exports.getCurrentUserRef = function getCurrentUserRef(dc) {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUser');
}

exports.getCurrentUser = function getCurrentUser(dc) {
  return executeQuery(getCurrentUserRef(dc));
};
exports.getIfFavoritedMovieRef = function getIfFavoritedMovieRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetIfFavoritedMovie', inputVars);
}

exports.getIfFavoritedMovie = function getIfFavoritedMovie(dcOrVars, vars) {
  return executeQuery(getIfFavoritedMovieRef(dcOrVars, vars));
};
exports.searchAllRef = function searchAllRef(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'SearchAll', inputVars);
}

exports.searchAll = function searchAll(dcOrVars, vars) {
  return executeQuery(searchAllRef(dcOrVars, vars));
};
