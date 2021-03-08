import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter} from 'react-router-dom';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks';
import { createApolloClient } from './Utils/apollo_client';
import { StoreProvider } from './store';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { AuthUserProvider} from "./Utils/authUserContext";
import { AnalyticsProvider } from 'use-analytics';
import { analytics} from "./Utils/GoogleAnalytics"

// GraphQL HTTP URL
const API_URL = process.env.REACT_APP_API_URL;

// GraphQL WebSocket (subscriptions) URL.
// If its url is not set in .env then it has same url, host and pathname
const WEBSOCKET_API_URL = process.env.REACT_APP_WEBSOCKET_API_URL;
const websocketApiUrl = WEBSOCKET_API_URL
  ? WEBSOCKET_API_URL
  : API_URL.replace('https://', 'ws://').replace('http://', 'ws://');

const apolloClient = createApolloClient(API_URL, websocketApiUrl);

ReactDOM.render(
  <React.StrictMode>
    <AnalyticsProvider instance={analytics}>
    <ApolloProvider client={apolloClient}>
      <ApolloHooksProvider client={apolloClient}>
          <StoreProvider>
            <BrowserRouter>
                <AuthUserProvider>
                      <App/>
                </AuthUserProvider>
            </BrowserRouter>
          </StoreProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
    </AnalyticsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

