import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import cartReducer from './components/reducers/cartReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'

const store = createStore(cartReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);