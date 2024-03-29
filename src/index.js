import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import "./assets/icons";
import "./assets/css/global.scss";

export let store = createStore(todoApp);
store.getState().player.instance._setStore(store);

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
