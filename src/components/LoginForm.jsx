import React, { Component } from 'react';
import firebase from 'firebase';
import { AppBar, Paper, Divider, RaisedButton, TextField } from 'material-ui';
import { blue800 } from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';

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

  onLoginButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));
  }

  onSwitchButtonPress() {
    this.props.changePageTo('signin');
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false,
    });
  }
  renderErrorMessage() {
    if (this.state.error) {
      return <div className="error-message-container">{this.state.error}</div>;
    }
    return null;
  }

  renderButtons() {
    if (this.state.loading) {
      return (
        <div className="circulator-container">
          <CircularProgress color={blue800} />
        </div>
      );
    }
    return (
      <div>
        <RaisedButton
          labelColor="#ccc"
          backgroundColor={blue800}
          onClick={() => this.onLoginButtonPress()}
          label="Login"
          fullWidth
        />
        <RaisedButton
          labelColor="#ccc"
          style={{ textTransform: 'capitalize' }}
          onClick={() => this.onSwitchButtonPress()}
          label="Don't have an account?"
          fullWidth
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Paper zDepth={2} style={styles.paperStyle}>
          <AppBar
            title="Please Login"
            titleStyle={{ fontSize: 20 }}
            style={{
              backgroundColor: '#333',
              textAlign: 'center',
            }}
            showMenuIconButton={false}
          />
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
            type="password"
            style={styles.textStyle}
            underlineShow={false}
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
          />
          <Divider />
          {this.renderErrorMessage()}
          {this.renderButtons()}
        </Paper>
      </div>
    );
  }
}

export default LoginForm;
