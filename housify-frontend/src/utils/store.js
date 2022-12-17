/* eslint-disable import/no-anonymous-default-export */
import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import rootReducer from '../reducers/rootReducer';

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);

export default { store, persistor };
