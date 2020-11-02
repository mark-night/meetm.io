import React from 'react';
import ReactDOM from 'react-dom';

//> React Portal allows component to be rendered as child of arbitrary DOM
//> element (often some top level DOM). The purpose is to get the child element
//> out of deeply nested JSX hierarchies, to make it easier to achieve some
//> particular goal. For example, to render a modal, it is common to encounter
//> some z-index conflicts with other DOM elements. It is a lot more easier if
//> the modal is some 'independent' (rather than deeply nested somewhere) DOM.
//> Another common usage of Portal is to render some React Component into some
//> html that is not in control of the App, e.g. some server side generated html.

const Modal = props => {
  return ReactDOM.createPortal(
    <div
      onClick={props.onClickOutsideModal}
      className="ui dimmer modals visible active"
    >
      <div
        //> clicking inside the modal won't trigger redirect as propagation is stopped
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
