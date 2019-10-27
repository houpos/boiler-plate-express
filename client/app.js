import React from 'react';
import ReactDOM from 'react-dom';
import store from './store'
import { Provider } from 'react-redux'

import '../public/styles.css';

const App = () => {
  return (
    <Provider store={store}>
      <div>Hello, World!</div>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById('app'))
