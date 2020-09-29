import '../scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store/store';

// Register Service Worker (via Workbox)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(
      registration => {
        console.log(
          'Service Worker registered with scope: ',
          registration.scope
        );
      },
      err => {
        console.log('Service Worker failed registration: ', err);
      }
    );
  });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// if (module.hot) {
//   module.hot.accept();
// }
