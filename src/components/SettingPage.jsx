import React, { Component } from 'react';
import firebase from 'firebase';
import { Card, CardHeader } from 'material-ui/Card';
import { Paper, Divider, RaisedButton, FlatButton, TextField } from 'material-ui';

const styles = {
  textStyle: {
    marginLeft: 20,
  },
  paperStyle: {
    width: 300,
    marginTop: 50,
    marginBottom: 50,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  errorTextStyle: {
    color: 'red',
  },
};

class SettingPage extends Component {
  renderButton() {
    return (
      <RaisedButton onClick={() => firebase.auth().signOut()} label="Logout" primary fullWidth />
    );
  }

  render() {
    return (
      <Card sytle={styles.cardStyle}>
        <Paper zDepth={2} style={styles.paperStyle}>
          <div>email</div>
          <Divider />
          {this.renderButton()}
          <Divider />
        </Paper>
      </Card>
    );
  }
}

export default SettingPage;
