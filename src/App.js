import React, {Component} from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

import {Container} from 'semantic-ui-react';

import ProductList from './ProductList';
import ProductSearch from './ProductSearch';
import AddProduct from './AddProducts';

import './App.css';
import 'semantic-ui-css/semantic.min.css'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

export default class App extends Component {

  render() {

    return (
      
      <ApolloProvider client={client}>
        <Container>
        <div>
          <h2>Products Manager</h2>
          <ProductList/>
          <ProductSearch/>
          <AddProduct/>
        </div>
        </Container>
    </ApolloProvider>
    );
  }
}

