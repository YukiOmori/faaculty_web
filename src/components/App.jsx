import React, { Component } from 'react';
import firebase from 'firebase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LoginForm from './LoginForm';
import SettingPage from './SettingPage';
import Header from './Header';
import Footer from './Footer';
import AppBarExampleIcon from './AppBarExampleIcon';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'setting',
      loggedIn: 'null',
      list: [],
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

  convertDitigalTimeToSlashTime(digit) {
    const elements = digit.split(':');
    const year = elements[0].slice(2);
    const month = elements[1];
    const date = elements[2];
    return `${year}/${month}/${date}`;
  }

  // returnDigitalTime() {
  //   const d = new Date();
  //   const year = d.getFullYear();
  //   const month = d.getMonth() <= 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  //   const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  //   const h = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
  //   const m = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
  //   const s = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
  //   return `${year}:${month}:${day}:${h}:${m}:${s}`;
  // }

  changePageTo(destination) {
    this.setState({ currentPage: destination });
  }

  renderContent() {
    if (this.state.currentPage === 'memo') {
      return (
        <MuiThemeProvider>
          <div>
            <div>memo page</div>
          </div>
        </MuiThemeProvider>
      );
    } else if (this.state.currentPage === 'list') {
      return (
        <MuiThemeProvider>
          <div>
            <div>list page</div>
          </div>
        </MuiThemeProvider>
      );
    } else if (this.state.currentPage === 'setting') {
      return (
        <MuiThemeProvider>
          <div>
            <SettingPage />
          </div>
        </MuiThemeProvider>
      );
    }
    // LPにしようかな
    return (
      <MuiThemeProvider>
        <div>
          <AppBarExampleIcon />
          <div>lp</div>
        </div>
      </MuiThemeProvider>
    );
  }

  render() {
    // console.log(this.state.currentPage);
    switch (this.state.loggedIn) {
      case true:
        return (
          <div>
            <Header />
            {this.renderContent()}
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
