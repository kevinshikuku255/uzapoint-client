import React from "react"
import {} from 'dotenv/config';
import {ApolloProvider} from "@apollo/client"
import { createApolloClient } from './apollo_client';
import { StoreProvider } from '../store';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/client';
import App from "../App.js"

// GraphQL HTTP URL
const API_URL = process.env.REACT_APP_API_URL;

// GraphQL WebSocket (subscriptions) URL.
// If its url is not set in .env then it has same url, host and pathname
const WEBSOCKET_API_URL = process.env.REACT_APP_WEBSOCKET_API_URL;
const websocketApiUrl = WEBSOCKET_API_URL
  ? WEBSOCKET_API_URL
    : API_URL.replace('https://', 'wss://');




// Create a Apollo client
const apolloClient = createApolloClient(API_URL, websocketApiUrl);



export default(

   <ApolloProvider client = {apolloClient}>
     <ApolloHooksProvider client = {apolloClient}>
       <StoreProvider>
          <App/>
        </StoreProvider>
   </ApolloHooksProvider>
   </ApolloProvider>
)