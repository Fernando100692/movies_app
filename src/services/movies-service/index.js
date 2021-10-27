import {API} from '.././../config/API';

// Endpoints
const {movies: moviesEndpoints} = API;

class MoviesService {
  /**
   * Get popular movies list
   * @return { Array } - Get movies list.
   */
  getPopularMoviesArray = async () => {
    return moviesEndpoints.getPopularMovies();
  };
}

export default new MoviesService();
