import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';

class App extends Component {
  state = { count: 10 };
  updateCount() {
    this.setState({ count: this.state.count + 1 });
  }
  render() {
    return (
      <div>
        <h1>App</h1>
        <button onClick={this.updateCount.bind(this)}>
          {this.state.count}
        </button>
      </div>
    );
  }
}

export default hot(App);
