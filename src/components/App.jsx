import React, { Component } from 'react';
import LoginForm from './LoginForm';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBarExampleIcon from './AppBarExampleIcon';
import CardExampleExpandable from './CardExampleExpandable';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';
import Greeting from './Greeting.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'login',
    };
  }

  render() {
    if (this.state.currentPage === 'login') {
      return (
        <MuiThemeProvider>
          <LoginForm />
        </MuiThemeProvider>
      );
    } else if (this.state.currentPage === 'signin') {
      return (
        <MuiThemeProvider>
          <SigninForm />
        </MuiThemeProvider>
      );
    } else if (this.state.currentPage === 'memo') {
      return (
        <MuiThemeProvider>
          <AppBarExampleIcon />
        </MuiThemeProvider>
      );
    } else if (this.state.currentPage === 'list') {
      return (
        <MuiThemeProvider>
          <AppBarExampleIcon />
        </MuiThemeProvider>
      );
    } else if (this.state.currentPage === 'setting') {
      return (
        <MuiThemeProvider>
          <AppBarExampleIcon />
        </MuiThemeProvider>
      );
    }
    return (
      <MuiThemeProvider>
        <div>
          <AppBarExampleIcon />
          <MyAwesomeReactComponent />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
