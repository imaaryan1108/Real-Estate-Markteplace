import axios from 'axios';

export const withAuthInstance = axios.create({
  // baseURL: 'https://snapshelter-api.herokuapp.com/',
  baseURL: 'http://localhost:9000/',

  timeout: 10000,
  headers: {
    authorization: `Bearer ${window.localStorage.bearer}`,
  },
});

export const withoutAuthInstance = axios.create({
  // baseURL: 'https://snapshelter-api.herokuapp.com/',
  baseURL: 'http://localhost:9000/',

  timeout: 10000,
});
