import React, { Component } from 'react';
import firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginForm from './LoginForm';
import Header from './Header';
import Footer from './Footer';
import AppBarExampleIcon from './AppBarExampleIcon';
import CardExampleExpandable from './CardExampleExpandable';
import MyAwesomeReactComponent from './MyAwesomeReactComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'memo',
      loggedIn: 'null',
    };
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyA9jPAQ98zKEcgjiA6JwUWu9BjC4qGEVOw',
      authDomain: 'faaculty-1c2c0.firebaseapp.com',
      databaseURL: 'https://faaculty-1c2c0.firebaseio.com',
      projectId: 'faaculty-1c2c0',
      storageBucket: 'faaculty-1c2c0.appspot.com',
      messagingSenderId: '809468660388',
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
        const db = firebase.database();
        const userId = firebase.auth().currentUser.uid;
        const path = `user/${userId}`;
        const listArray = [];
        db.ref(path).on('child_added', (data) => {
          const memo = data.val();
          listArray.unshift({
            date: this.convertDitigalTimeToSlashTime(memo.date),
            title: memo.title ? memo.title : 'No Title',
            id: memo.date,
          });
          this.setState({ list: listArray });
        });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  changePageTo(destination) {
    this.setState({ currentPage: destination });
  }

  renderContent() {
    if (this.state.currentPage === 'memo') {
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
    // LPにしようかな
    return (
      <MuiThemeProvider>
        <div>
          <AppBarExampleIcon />
          <MyAwesomeReactComponent />
        </div>
      </MuiThemeProvider>
    );
  }

  render() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <div>
            <Header />
            {this.renderContent.bind(this)()}
            <Footer />
          </div>
        );
      case false:
        if (this.state.currentPage === 'login') {
          return (
            <div>
              <Header />
              <MuiThemeProvider>
                <LoginForm changePageTo={this.changePageTo.bind(this)} />
              </MuiThemeProvider>
            </div>
          );
        }
        return (
          <div>
            <Header />
            <MuiThemeProvider>
              <LoginForm changePageTo={this.changePageTo.bind(this)} />
            </MuiThemeProvider>
          </div>
        );
      default:
        return <div>Loading</div>;
    }
  }
}

export default App;
