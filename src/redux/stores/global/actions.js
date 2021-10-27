// Constants
import {SET_LOADING, SET_USER, SET_RESPONSE, SET_FAVORITES} from './constants';

/**
 * Show/hide loading general to all app
 * @param  { bool } loading - Indicate if show/hide loading
 * @return { object } An action object with a type of SET_LOADING
 */
export const setLoading = loading => ({
  type: SET_LOADING,
  payload: {loading},
});

/**
 * Set response state
 * @param  { String } type - Response type
 * @param  { String } response - Response data
 * @param  { callback } message - Callback to send response
 * @return { object } An action object with a type of SET_RESPONSE
 */
export const setResponse = (type, response, callback) => {
  if (callback) {
    callback(type, response);
  }
  return {type: SET_RESPONSE, payload: {type}};
};

/**
 * Set favorites state
 * @param  { String } data - Favorites data
 * @return { object } An action object with a type of SET_FAVORITES
 */
export const setFavorites = favorites => ({
  type: SET_FAVORITES,
  payload: {favorites},
});

/**
 * Set user state
 * @param  { object } user - User data
 * @return { object } An action object with a type of SET_USER
 */
export const setUser = user => ({type: SET_USER, payload: {user}});
