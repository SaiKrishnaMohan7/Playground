/*
Higher Order Component HOC - A component (HOC) that renders another component (children of HOC)

Adv:
  Code Reuse
  Render hijacking
  Prop Manipulation
  Abstract State

*/
import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => {
  return (
    <Fragment>
      <h1>Info</h1>
      <p>The info is: {props.info}</p> 
  </Fragment>
  );
};

const withAdminWarning = (WrappedComponent) => {
  // HOC
  return (props) => {
    return (
      <Fragment>
        {props.isAdmin && (<p>This is Private, don't share</p>)}
        <WrappedComponent {...props} />
      </Fragment>
    );
  };
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => {
    return (
      <Fragment>
        {props.isAuthenticated ? (<WrappedComponent {...props}/>) : (<p>Please Log in to see the info</p>)}
      </Fragment>
    );
  };
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="these are the things"/>, document.getElementById('root'));ReactDOM.render(<AdminInfo isAdmin={true} info="these are the things"/>, document.getElementById('root'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="these are tfffhe things"/>, document.getElementById('root'));