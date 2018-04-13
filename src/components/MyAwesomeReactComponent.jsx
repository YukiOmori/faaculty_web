import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const MyAwesomeReactComponent = () => (
  <div>
    <RaisedButton label="Default" style={style} />
    <RaisedButton label="Primary" primary style={style} />
    <RaisedButton label="Secondary" secondary style={style} />
    <RaisedButton label="Disabled" disabled style={style} />
    <br />
    <br />
    <RaisedButton label="Full width" fullWidth />
  </div>
);

export default MyAwesomeReactComponent;
