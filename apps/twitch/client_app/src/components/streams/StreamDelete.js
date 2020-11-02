import React from 'react';
import { connect } from 'react-redux';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';
import Modal from '../Modal';

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  dismissModal = () => {
    history.push('/');
  };

  actions = (
    //> "<></>" - shorthand for "<React.Fragment></React.Fragment>"
    //> React.Fragment is a special JSX element that can wrap multiple adjacent
    //> JSX elements to fulfill JSX syntax requirement, but itself isn't parsed
    //> into any actual html DOM element.
    <>
      {/* <React.Fragment> */}
      <button
        onClick={() => this.props.deleteStream(this.props.match.params.id)}
        className="ui button negative"
      >
        Delete
      </button>
      <button onClick={this.dismissModal} className="ui button">
        Cancel
      </button>
      {/* </React.Fragment> */}
    </>
  );

  // render portal as normal
  render() {
    const content = (
      <div
        dangerouslySetInnerHTML={{
          __html: `You are about to delete stream<br /><h3>${
            this.props.stream ? this.props.stream.title : ''
          }</h3><br />Are you sure?`
        }}
      />
    );
    return (
      <Modal
        title="Delete Stream"
        content={content}
        actions={this.actions}
        onClickOutsideModal={this.dismissModal}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};
export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
