import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues);
  };
  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }
    return (
      <StreamForm
        formTitle="Edit Stream"
        onSubmit={this.onSubmit}
        //> Defined 'initialValues' will be passed to redux-form and then passed
        //> on to its inside-wrapped form and be used as form values.
        //> A good practice is to just pass necessary values. Values without
        //> corresponding 'name' in form will not be rendered but still be
        //> contained in the form, and will be submitted as part of form values
        //> on form submission.
        initialValues={_.pick(this.props.stream, 'title', 'description')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //> Path variable defined in routing got passed in as part of props
  const id = ownProps.match.params.id;
  return { stream: state.streams[id] };
};
export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
