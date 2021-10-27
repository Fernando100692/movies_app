import Storage from './Storage';

export const baseEndpoint = 'https://api.themoviedb.org';
export const moviesEndpoint = `${baseEndpoint}/3/movie`;
const api_key = '1abb3e68d878be1155d781ce812f80a8';

const closeSession = async () => {
  await Storage.removeSession();
};

async function makeRequest(sufix = '/', method = 'GET', payload = {}) {
  const BASE_URL = moviesEndpoint;
  const contentType = 'application/json';

  const general = {
    method,
    redirect: 'follow',
    headers: {
      'Content-Type': contentType,
    },
  };

  if (
    method === 'POST' ||
    method === 'PUT' ||
    method === 'DELETE' ||
    method === 'PATCH'
  ) {
    general.body = JSON.stringify(payload);
  }

  return await fetch(`${BASE_URL}${sufix}?api_key=${api_key}`, general)
    .then(response => {
      console.log(method, response.status, `${BASE_URL}${sufix}`, response);
      if (!response.ok) {
        console.log(
          `Service error ${BASE_URL}${sufix} ${JSON.stringify(response)}`,
        );
        throw {status: response.status, message: '¡Algo salió mal!'};
      }

      return response.json();
    })
    .then(jsonresponse => jsonresponse)
    .catch(err => {
      console.log(err);
      return err;
    });
}

export const API = {
  auth: {
    login: async payload => {
      const response = await makeRequest('/auth/local', 'POST', payload);
      return response;
    },
  },
  movies: {
    getPopularMovies: async () => {
      const response = await makeRequest(`/popular`, 'GET');
      return response;
    },
    updateStudent: async (id, payload) => {
      const response = await makeRequest(`/students/${id}`, 'PUT', payload);
      return response;
    },
  },
};
