import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    // load in google auth api on initial render (only once)
    window.gapi.load('client:auth2', () => {
      // callback only get called after api resources are loaded
      window.gapi.client
        .init({
          clientId:
            '752098821353-j1iqh97ts5edu3v0ds68blf374ca8ra0.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  //> boolean argument 'isSignedIn' provided by google api listener
  //! if not working, might be being blocked by browser Ad Blocker extension
  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      // pass in userId to save it in state
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  renderAuthButton() {
    switch (this.props.isSignedIn) {
      case true:
        return (
          <button className="ui red google button" onClick={this.auth.signOut}>
            <i className="google icon" />
            Sign Out
          </button>
        );
      case false:
        return (
          <button
            className="ui primary google button"
            onClick={this.auth.signIn}
          >
            <i className="google icon" />
            Sign in with Google
          </button>
        );
      default:
        return null;
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
