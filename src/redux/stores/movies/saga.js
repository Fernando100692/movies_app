// Dependencies
import {put, call, takeLatest} from 'redux-saga/effects';

// Global actions
import {setResponse, setLoading} from '../global/actions';

// Services
import moviesService from '../../../services/movies-service';

// Constants
import {GET_ALL_POPULAR_MOVIES} from './constants';

/**
 * Call service to get popular movies list
 * @param { object } action - Action with callback
 */
export function* getAllPopularMovies(action) {
  yield put(setLoading(true));
  const {callback} = action;

  try {
    const response = yield call(moviesService.getPopularMoviesArray);
    yield put(setResponse('success', {...response}, callback));
  } catch (err) {
    yield put(setResponse('error', err, callback));
    yield put(setLoading(false));
  }
  yield put(setLoading(false));
}

/**
 * Declare all component sagas
 */
export function* watchMoviesSaga() {
  yield takeLatest(GET_ALL_POPULAR_MOVIES, getAllPopularMovies);
}
