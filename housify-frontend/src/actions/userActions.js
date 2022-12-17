import { authType } from '../utils/actionTypes';

export const setUserLogin = (payload, dispatch) =>
  dispatch({ type: authType.USER_LOGIN, payload });

export const setBearerToken = (payload, dispatch) =>
  dispatch({ type: authType.SET_BEARER_TOKEN, payload });
