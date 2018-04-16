import React, { Component } from 'react';
import firebase from 'firebase';
import { Card, CardHeader } from 'material-ui/Card';
import { Paper, Divider, RaisedButton, List, ListItem, AppBar, IconButton } from 'material-ui';
import { blue800 } from 'material-ui/styles/colors';
import Key from 'material-ui/svg-icons/action/https';
import AaccountBox from 'material-ui/svg-icons/action/account-box';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';

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
      <RaisedButton
        labelColor="#333"
        backgroundColor="#ccc"
        onClick={() => firebase.auth().signOut()}
        label="Logout"
        fullWidth
      />
    );
  }

  render() {
    const user = firebase.auth().currentUser;
    const { name, email } = user;
    return (
      <Paper zDepth={2} style={styles.paperStyle}>
        <AppBar title="Setting" style={{ backgroundColor: '#333' }} showMenuIconButton={false} />
        <List>
          <ListItem
            leftIcon={<AaccountBox color={blue800} />}
            primaryText={name || 'No account name'}
            secondaryText="Your accout name"
          />
          <ListItem
            leftIcon={<CommunicationEmail color={blue800} />}
            insetChildren
            primaryText={email}
            secondaryText="Log in Email address"
          />
          <ListItem
            leftIcon={<Key color={blue800} />}
            insetChildren
            primaryText="################"
            secondaryText="Log in password"
          />
        </List>
        <Divider />
        {this.renderButton()}
        <Divider />
      </Paper>
    );
  }
}

export default SettingPage;
