import '../scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store/store';

// Register Service Worker (via Workbox)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    // register only after pages is loaded, so service worker won't block page
    // register app exclusive service worker while expand sw's scope to upper level
    // https://w3c.github.io/ServiceWorker/#service-worker-script-response
    navigator.serviceWorker.register('/proj/sw-proj.js', { scope: '/' })
  );
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
