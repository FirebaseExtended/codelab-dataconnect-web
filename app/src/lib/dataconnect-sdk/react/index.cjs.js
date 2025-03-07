const { upsertUserRef, addFavoritedMovieRef, deleteFavoritedMovieRef, addReviewRef, deleteReviewRef, listMoviesRef, getMovieByIdRef, getActorByIdRef, getCurrentUserRef, getIfFavoritedMovieRef, searchAllRef, connectorConfig } = require('../');
const { validateArgs, CallerSdkTypeEnum } = require('firebase/data-connect');
const { useDataConnectQuery, useDataConnectMutation } = require('@tanstack-query-firebase/react/data-connect');

exports.useUpsertUser = function useUpsertUser(dcOrOptions, options) {
  const { dc: dcInstance, vars: inputOpts } = validateArgs(connectorConfig, dcOrOptions, options, false);
  function refFactory(vars) {
    return upsertUserRef(dcInstance, vars);
  }
  return useDataConnectMutation(refFactory, inputOpts, CallerSdkTypeEnum.GeneratedReact);
}

exports.useAddFavoritedMovie = function useAddFavoritedMovie(dcOrOptions, options) {
  const { dc: dcInstance, vars: inputOpts } = validateArgs(connectorConfig, dcOrOptions, options, false);
  function refFactory(vars) {
    return addFavoritedMovieRef(dcInstance, vars);
  }
  return useDataConnectMutation(refFactory, inputOpts, CallerSdkTypeEnum.GeneratedReact);
}

exports.useDeleteFavoritedMovie = function useDeleteFavoritedMovie(dcOrOptions, options) {
  const { dc: dcInstance, vars: inputOpts } = validateArgs(connectorConfig, dcOrOptions, options, false);
  function refFactory(vars) {
    return deleteFavoritedMovieRef(dcInstance, vars);
  }
  return useDataConnectMutation(refFactory, inputOpts, CallerSdkTypeEnum.GeneratedReact);
}

exports.useAddReview = function useAddReview(dcOrOptions, options) {
  const { dc: dcInstance, vars: inputOpts } = validateArgs(connectorConfig, dcOrOptions, options, false);
  function refFactory(vars) {
    return addReviewRef(dcInstance, vars);
  }
  return useDataConnectMutation(refFactory, inputOpts, CallerSdkTypeEnum.GeneratedReact);
}

exports.useDeleteReview = function useDeleteReview(dcOrOptions, options) {
  const { dc: dcInstance, vars: inputOpts } = validateArgs(connectorConfig, dcOrOptions, options, false);
  function refFactory(vars) {
    return deleteReviewRef(dcInstance, vars);
  }
  return useDataConnectMutation(refFactory, inputOpts, CallerSdkTypeEnum.GeneratedReact);
}


exports.useListMovies = function useListMovies(dcOrVars, vars, options) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, false);
  const ref = listMoviesRef(dcInstance, inputVars);
  return useDataConnectQuery(ref, options, CallerSdkTypeEnum.GeneratedReact);
}

exports.useGetMovieById = function useGetMovieById(dcOrVars, vars, options) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, false);
  const ref = getMovieByIdRef(dcInstance, inputVars);
  return useDataConnectQuery(ref, options, CallerSdkTypeEnum.GeneratedReact);
}

exports.useGetActorById = function useGetActorById(dcOrVars, vars, options) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, false);
  const ref = getActorByIdRef(dcInstance, inputVars);
  return useDataConnectQuery(ref, options, CallerSdkTypeEnum.GeneratedReact);
}

exports.useGetCurrentUser = function useGetCurrentUser(dc, options) {
  const { dc: dcInstance } = validateArgs(connectorConfig, dc, undefined, false);
  const ref = getCurrentUserRef(dcInstance);
  return useDataConnectQuery(ref, options, CallerSdkTypeEnum.GeneratedReact);
}

exports.useGetIfFavoritedMovie = function useGetIfFavoritedMovie(dcOrVars, vars, options) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, false);
  const ref = getIfFavoritedMovieRef(dcInstance, inputVars);
  return useDataConnectQuery(ref, options, CallerSdkTypeEnum.GeneratedReact);
}

exports.useSearchAll = function useSearchAll(dcOrVars, vars, options) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, false);
  const ref = searchAllRef(dcInstance, inputVars);
  return useDataConnectQuery(ref, options, CallerSdkTypeEnum.GeneratedReact);
}