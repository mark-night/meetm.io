import '../scss/style.scss';

document.querySelector('body').insertAdjacentHTML('beforeend', '<h2>COOL</h2>');

// make sure every change in this file are accepted by webpack HMR
if (module.hot) {
  module.hot.accept();
}
