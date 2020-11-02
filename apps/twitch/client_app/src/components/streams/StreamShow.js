import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    //! cleanup before component is to be unmounted (e.g. page navigate away)
    //! otherwise the player keeps fetching and playing videos even if it's
    //! invisible.
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      // if stream has not been fetched, video DOM has not been built yet, thus
      // player doesn't need to be built and there is no DOM for it to be attached
      // to as well.
      return;
    }

    this.player = flv.createPlayer({
      type: 'flv',
      url: `https://api.meetm.io/streams/streaming/live/${this.props.match.params.id}.flv`
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <video ref={this.videoRef} style={{ width: '100%' }} controls="on" />
        <h1>{this.props.stream.title}</h1>
        <h5>{this.props.stream.description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
