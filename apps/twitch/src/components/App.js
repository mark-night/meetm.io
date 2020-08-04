import React from 'react';
// use (plain) Router instead of BrowserRouter as we are creating and maintaining
// history object on our own.
// import { BrowserRouter, Route } from 'react-router-dom';
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <div className="ui container">
      {/* <BrowserRouter> */}
      <Router history={history}>
        <br />
        <Header />
        {/* Switch stops greedy routing, that is to only route for the first
        match, so StreamShow won't be taken as a match for StreamCreate. */}
        <Switch>
          <Route path="/" exact component={StreamList} />
          <Route path="/new/" exact component={StreamCreate} />
          {/* ":anything" defines a variable in the path, passed as part of props
         down to component */}
          <Route path="/edit/:id/" exact component={StreamEdit} />
          <Route path="/delete/:id/" exact component={StreamDelete} />
          <Route path="/:id/" exact component={StreamShow} />
        </Switch>
        <br />
        <div className="ui message">
          <div className="header">Mimicking twitch.tv</div>
          <p>
            This is an exercise project practicing React frontend (with Redux)
            in harmony with Django backend (RESTful API), and of course, CRUD
            functions.
          </p>
          <ul className="list">
            <li>
              Register a stream with the backend server, broadcast to the
              stream, (share) watch.
            </li>
            <li>
              Login with a Google Account (Google OAuth 2.0 API) so you can
              create (register) a new stream with the backend server.
            </li>
            <li>
              Click stream title to watch stream (if there is one feeding to
              it). Notice the <span className="ui label">Stream ID</span>{' '}
              appended to the URL for each stream.
            </li>
            <li>
              Within your broadcaster software ( I'd recommend{' '}
              <a
                href="https://obsproject.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                OBS
              </a>
              ), set "rtmp://api.meetm.io:1935/live" as the stream serever and
              <span className="ui label">Stream ID</span> as the Stream Key.
            </li>
            <li>
              The stream will be available for watch after you start
              broadcasting to it.
            </li>
          </ul>
        </div>
        {/* </BrowserRouter> */}
      </Router>
    </div>
  );
};

export default App;
