import axios from 'axios';

export const withAuthInstance = axios.create({
  // baseURL: 'https://snapshelter-api.herokuapp.com/',
  baseURL: 'https://real-estate-markteplace.onrender.com/',

  timeout: 10000,
  headers: {
    authorization: `Bearer ${window.localStorage.bearer}`,
  },
});

export const withoutAuthInstance = axios.create({
  // baseURL: 'https://snapshelter-api.herokuapp.com/',
  baseURL: 'https://real-estate-markteplace.onrender.com/',

  timeout: 10000,
});
