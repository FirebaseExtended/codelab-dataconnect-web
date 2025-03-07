import { upsertUserRef, addFavoritedMovieRef, deleteFavoritedMovieRef, addReviewRef, deleteReviewRef, listMoviesRef, getMovieByIdRef, getActorByIdRef, getCurrentUserRef, getIfFavoritedMovieRef, searchAllRef, connectorConfig } from '../../';
import { validateArgs, CallerSdkTypeEnum } from 'firebase/data-connect';
import { useDataConnectQuery, useDataConnectMutation } from '@tanstack-query-firebase/react/data-connect';

export function useUpsertUser(dcOrOptions, options) {
  const { dc: dcInstance, vars: inputOpts } = validateArgs(connectorConfig, dcOrOptions, options, false);
  function refFactory(vars) {
    return upsertUserRef(dcInstance, vars);
  }
  return useDataConnectMutation(refFactory, inputOpts, CallerSdkTypeEnum.GeneratedReact);
}

export function useAddFavoritedMovie(dcOrOptions, options) {
  const { dc: dcInstance, vars: inputOpts } = validateArgs(connectorConfig, dcOrOptions, options, false);
  function refFactory(vars) {
    return addFavoritedMovieRef(dcInstance, vars);
  }
  return useDataConnectMutation(refFactory, inputOpts, CallerSdkTypeEnum.GeneratedReact);
}

export function useDeleteFavoritedMovie(dcOrOptions, options) {
  const { dc: dcInstance, vars: inputOpts } = validateArgs(connectorConfig, dcOrOptions, options, false);
  function refFactory(vars) {
    return deleteFavoritedMovieRef(dcInstance, vars);
  }
  return useDataConnectMutation(refFactory, inputOpts, CallerSdkTypeEnum.GeneratedReact);
}

export function useAddReview(dcOrOptions, options) {
  const { dc: dcInstance, vars: inputOpts } = validateArgs(connectorConfig, dcOrOptions, options, false);
  function refFactory(vars) {
    return addReviewRef(dcInstance, vars);
  }
  return useDataConnectMutation(refFactory, inputOpts, CallerSdkTypeEnum.GeneratedReact);
}

export function useDeleteReview(dcOrOptions, options) {
  const { dc: dcInstance, vars: inputOpts } = validateArgs(connectorConfig, dcOrOptions, options, false);
  function refFactory(vars) {
    return deleteReviewRef(dcInstance, vars);
  }
  return useDataConnectMutation(refFactory, inputOpts, CallerSdkTypeEnum.GeneratedReact);
}


export function useListMovies(dcOrVars, vars, options) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, false);
  const ref = listMoviesRef(dcInstance, inputVars);
  return useDataConnectQuery(ref, options, CallerSdkTypeEnum.GeneratedReact);
}

export function useGetMovieById(dcOrVars, vars, options) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, false);
  const ref = getMovieByIdRef(dcInstance, inputVars);
  return useDataConnectQuery(ref, options, CallerSdkTypeEnum.GeneratedReact);
}

export function useGetActorById(dcOrVars, vars, options) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, false);
  const ref = getActorByIdRef(dcInstance, inputVars);
  return useDataConnectQuery(ref, options, CallerSdkTypeEnum.GeneratedReact);
}

export function useGetCurrentUser(dc, options) {
  const { dc: dcInstance } = validateArgs(connectorConfig, dc, undefined, false);
  const ref = getCurrentUserRef(dcInstance);
  return useDataConnectQuery(ref, options, CallerSdkTypeEnum.GeneratedReact);
}

export function useGetIfFavoritedMovie(dcOrVars, vars, options) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, false);
  const ref = getIfFavoritedMovieRef(dcInstance, inputVars);
  return useDataConnectQuery(ref, options, CallerSdkTypeEnum.GeneratedReact);
}

export function useSearchAll(dcOrVars, vars, options) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, false);
  const ref = searchAllRef(dcInstance, inputVars);
  return useDataConnectQuery(ref, options, CallerSdkTypeEnum.GeneratedReact);
}