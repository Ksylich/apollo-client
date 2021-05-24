import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client';

 const uri = 'https://71z1g.sse.codesandbox.io/'; //  Dogs

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


