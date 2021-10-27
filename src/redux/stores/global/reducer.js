// Dependencies
import {Map} from 'immutable';

// Constants
import {SET_LOADING, SET_RESPONSE, SET_USER, SET_FAVORITES} from './constants';

import Storage from '../../../config/Storage';

// Initial state
export const initialState = Map({
  user: false,
  loading: false,
  favorites: false,
  response: Map({
    type: false,
  }),
});

export default function appReducer(state = initialState, action = {}) {
  const {type, payload} = action;
  switch (type) {
    case SET_LOADING:
      return state.set('loading', payload.loading);
    case SET_USER:
      return state.set('user', payload.user);
    case SET_FAVORITES:
      Storage.setFavorites(payload.favorites);
      return state.set('favorites', payload.favorites);
    case SET_RESPONSE:
      return state.setIn(['response', 'type'], payload.type);
    default:
      return state;
  }
}
