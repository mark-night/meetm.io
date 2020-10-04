import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { createStore, applyMiddleware, compose } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';

//> Advanced settings for redux-devtools-extension (Chrome or Firefox)
//> https://github.com/zalmoxisus/redux-devtools-extension
//! unwire redux devtools for production
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(
//   reducers,
//   composeEnhancers(applyMiddleware(reduxThunk))
// );
const store = createStore(reducers, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
