//! 'history' is an independent package that React Router DOM takes as dependency.
//! It takes care of navigation across app pages, manipulating urls without
//! reloading the page content.
//> History is created by react router and passed to components. Trying to access
//> history object outside a component (e.g. in an action creator) can be a pain.
//> Create and maintain a history object in an independent file makes it easier
//> to access history anywhere within the app. However, side effect of doing this
//> is we need to setup a plain router instead of using React Browser Router.

//> we are creating a "BrowserRouter-like" plain router, so history would be a
//> BrowserHistory.

import { createBrowserHistory } from 'history';

export default createBrowserHistory({
  //> resolved to "homepage" value defined in package.json
  //> good for hosting app in domain subdirectory
  // basename: process.env.PUBLIC_URL
  basename: '/twitch/'
});
