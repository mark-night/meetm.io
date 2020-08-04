import React from 'react';
//> notice the naming convention: capitalized "Field" intends to be a component
//> while reduxForm intends to be a helper function
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (error && touched) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }
  renderInput = formProps => {
    const { meta, input, label } = formProps;
    const inputClass = `field ${meta.error && meta.touched ? 'error' : ''}`;
    //> 'formProps' is auto provided when function is called by component Field.
    //> Destruct formProps.input to assign all provided values/methods to the
    //> tag's corresponding attributes, equivalent to:
    //>   <input
    //>     value={formProps.input.value}
    //>     onChange={formProps.input.onChange}
    //>     .......
    //>   />
    return (
      <div className={inputClass}>
        <label>{label}</label>
        <input type="text" {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  render() {
    return (
      <div>
        <h3>{this.props.formTitle}</h3>
        <form
          className="ui form error"
          //> notice onSubmit needs to be handled by redux-form provided handleSubmit(),
          //> which will pass an object of form values (with names as keys) to the
          //> argument function, e.g. onSubmit().
          //> event.preventDefault() is taken care of by redux-form, there is no
          //> event object passed.
          onSubmit={this.props.handleSubmit(this.props.onSubmit)}
        >
          <Field
            name="title"
            component={this.renderInput}
            label="Title of the stream"
          />
          {/* Field is more or less a component scaffold, it provides all necessary
        values/methods to its attribute 'component', which expects a function
        returning JSX for render. All magic have been pre-setup by redux-form, 
        which will catch the status (user interactions) of JSX elements returned 
        by the function passed to attribute 'component'. Form values are also 
        updated to states and provided as component props.
        Arbitrary prop(s) (like 'label' in the example) can be passed in as well, 
        and will be available as extra prop(s) in the received argument of the 
        function assigned to attribute 'component'. */}
          <Field
            name="description"
            component={this.renderInput}
            label="Description of the stream"
          />
          <button className="ui button primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const validate = formValues => {
  //> function to be fed into redux-form for value validation. it will be called
  //> the first every time form renders (initial render and every user interaction).
  //> Must return an object, containing key/value pairs where key is the Field's
  //> name and value is the hint message to be shown to user.
  //> Returning empty object means values are valid.
  const error = {};
  ['title', 'description'].forEach(w => {
    if (!formValues[w]) {
      error[w] = `${w[0].toUpperCase()}${w.slice(1)} can not be empty.`;
    }
  });
  return error;
};

export default reduxForm({
  //> form configuration, value of "form" is the name (often the purpose) of the form
  form: 'streamForm',
  validate
})(StreamForm);
