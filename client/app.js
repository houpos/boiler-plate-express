import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import { Provider } from 'react-redux'

import '../public/styles.css';

ReactDOM.render(
  <Provider store={store}>
    <div>Hello, World!</div>
  </Provider>,
  document.getElementById('app')
)
