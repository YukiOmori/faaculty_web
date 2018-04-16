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

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      error: '',
      loading: false,
    };
  }

  onSigninButtonPress() {
    const { email, password, passwordConfirmation } = this.state;

    this.setState({ error: '', loading: true });

    if (email !== '' && password === passwordConfirmation) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(this.onSigninSuccess.bind(this))
        .catch(() => {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(this.onSigninSuccess.bind(this))
            .catch(this.onSigninFail.bind(this));
        });
    } else {
      this.onSigninFail.bind(this)('password');
    }
  }

  onSwitchButtonPress() {
    this.props.changePageTo('login');
  }

  onSigninFail(e) {
    if (e === 'password') {
      this.setState({ error: 'Check your email or password.', loading: false });
    } else {
      this.setState({ error: 'System Error. Please try again.', loading: false });
    }
  }

  onSigninSuccess() {
    this.setState({
      email: '',
      password: '',
      passwordConfirmation: '',
      error: '',
      loading: false,
    });
    this.props.changePageTo('login');
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
          onClick={() => this.onSigninButtonPress()}
          label="Sign In"
          fullWidth
        />
        <RaisedButton
          labelColor="#ccc"
          onClick={() => this.onSwitchButtonPress()}
          label="Already have an account?"
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
            title="Please Signin"
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
          <TextField
            hintText="Password (Confirm)"
            type="password"
            style={styles.textStyle}
            underlineShow={false}
            value={this.state.passwordConfirmation}
            onChange={event => this.setState({ passwordConfirmation: event.target.value })}
          />
          <Divider />
          {this.renderErrorMessage()}
          {this.renderButtons()}
        </Paper>
      </div>
    );
  }
}

export default SigninForm;
