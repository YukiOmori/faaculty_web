import React, { Component } from 'react';
import firebase from 'firebase';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
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

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
    };
  }

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess() {
    console.log('succeed');
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false,
    });
  }

  renderButton() {
    if (this.state.loading) {
      //   return <Spinner size="small" />;
      return <div>now loading...</div>;
    }
    return <RaisedButton onClick={() => this.onButtonPress()} label="Login" primary fullWidth />;
  }

  render() {
    return (
      <Card sytle={styles.cardStyle}>
        <div>Please Login</div>
        <Paper zDepth={2} style={styles.paperStyle}>
          <TextField
            hintText="user@example.com"
            style={styles.textStyle}
            underlineShow={false}
            value={this.state.email}
            onChange={event => this.setState({ email: event.target.value })}
          />
          <Divider />
          <TextField
            hintText="Password"
            style={styles.textStyle}
            underlineShow={false}
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
          />
          <Divider />
          <div style={styles.errorTextStyle}>{this.state.error}</div>
          {this.renderButton.bind(this)()}
        </Paper>
        <div>Don't have an account?</div>
      </Card>
    );
  }
}

export default LoginForm;
