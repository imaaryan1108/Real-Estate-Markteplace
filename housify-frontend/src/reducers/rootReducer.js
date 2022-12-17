import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

import generalReducer from './generalReducer';
import navbarReducer from './navbarReducer';
import userReducer from './userReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['navbar', 'general', 'user'],
};

const rootReduer = combineReducers({
  navbar: navbarReducer,
  general: generalReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReduer);
