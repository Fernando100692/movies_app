/**
 * @author Fernando Ruano
 * @file actions.js
 * @description Patient Appointments Actions
 */

// Constants
import {GET_ALL_POPULAR_MOVIES} from './constants';

/**
 * Call process to get all patient appointments list
 * @param  { object } data - Patient Appointments Data
 * @param  { function } callback - Response callback
 * @return { object } An action object with a type of GET_ALL_PATIENT_APPOINTMENTS
 */
export const getPopularMoviesArray = callback => ({
  type: GET_ALL_POPULAR_MOVIES,
  callback,
});
