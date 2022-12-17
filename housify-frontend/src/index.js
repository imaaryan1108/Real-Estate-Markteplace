import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core';
import theme from './utils/theme/theme';
import { Provider } from 'react-redux';
import { store, persistor } from './utils/store';
import { CssBaseline } from '@material-ui/core';
import { Auth0Provider } from '@auth0/auth0-react';
import auth from './utils/authConst';
import { PersistGate } from 'redux-persist/lib/integration/react';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Auth0Provider
        domain={auth.domain}
        clientId={auth.clientID}
        redirectUri={auth.redirectURI}
        audience={auth.audience}
        scope={auth.scope}
      >
        <React.StrictMode>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </React.StrictMode>
      </Auth0Provider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
