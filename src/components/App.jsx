import React, { Component } from 'react';
import firebase from 'firebase';
import { List, ListItem } from 'material-ui/List';
import CreateNewItem from 'material-ui/svg-icons/content/create';
import ShowList from 'material-ui/svg-icons/action/view-column';
import Settings from 'material-ui/svg-icons/action/settings';
import Logout from 'material-ui/svg-icons/maps/directions-run';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, Drawer, Divider } from 'material-ui';
import LoginForm from './LoginForm';
import MemoPage from './MemoPage';
import SettingPage from './SettingPage';
import Header from './Header';
import Footer from './Footer';
import AppBarExampleIcon from './AppBarExampleIcon';

const returnDigitalTime = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth() <= 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  const h = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
  const m = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
  const s = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds();
  return `${year}:${month}:${day}:${h}:${m}:${s}`;
};

const convertDitigalTimeToSlashTime = (digit) => {
  const elements = digit.split(':');
  const year = elements[0].slice(2);
  const month = elements[1];
  const date = elements[2];
  return `${year}/${month}/${date}`;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'memo',
      loggedIn: 'null',
      list: [],
      sidebarOpen: false,
      fact: 'aiueo',
      abstraction: 'kakikukeko',
      application: 'sashisuseso',
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
            date: convertDitigalTimeToSlashTime(memo.date),
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

  setText(text, label) {
    if (label === 'fact') {
      this.setState({
        fact: text,
      });
      console.log(this.state.fact);
    }
  }

  saveText() {
    const db = firebase.database();
    const userId = firebase.auth().currentUser.uid;
    const date = returnDigitalTime();
    const path = `user/${userId}/${date}`;
    db.ref(path).set({
      date,
      fact: this.state.fact,
      abstraction: this.state.abstraction,
      application: this.state.application,
      title: this.state.title ? this.state.title : 'No Title',
    });
  }

  changePageTo(destination) {
    this.setState({ currentPage: destination });
  }

  handleToggle() {
    console.log('clicked');
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }

  renderContent() {
    if (this.state.currentPage === 'memo') {
      return (
        <MuiThemeProvider>
          <div>
            <MemoPage
              setText={() => this.setText()}
              saveText={() => this.saveText()}
              fact={this.state.fact}
              abstraction={this.state.abstraction}
              application={this.state.application}
            />
            <Drawer
              docked={false}
              width={200}
              open={this.state.sidebarOpen}
              onRequestChange={sidebarOpen => this.setState({ sidebarOpen })}
            >
              <List>
                <ListItem
                  primaryText="Create"
                  leftIcon={<CreateNewItem />}
                  onClick={() =>
                    this.setState({ currentPage: 'memo', sidebarOpen: !this.state.sidebarOpen })
                  }
                />
                <ListItem
                  primaryText="List"
                  leftIcon={<ShowList />}
                  onClick={() =>
                    this.setState({ currentPage: 'list', sidebarOpen: !this.state.sidebarOpen })
                  }
                />
                <ListItem
                  primaryText="Setting"
                  leftIcon={<Settings />}
                  onClick={() =>
                    this.setState({ currentPage: 'setting', sidebarOpen: !this.state.sidebarOpen })
                  }
                />
                <Divider />
                <ListItem
                  primaryText="Log Out"
                  leftIcon={<Logout />}
                  onClick={() => firebase.auth().signOut()}
                />
              </List>
            </Drawer>
          </div>
        </MuiThemeProvider>
      );
    } else if (this.state.currentPage === 'list') {
      return (
        <MuiThemeProvider>
          <div>
            <div>list page</div>
            <Drawer
              docked={false}
              width={200}
              open={this.state.sidebarOpen}
              onRequestChange={sidebarOpen => this.setState({ sidebarOpen })}
            >
              <List>
                <ListItem
                  primaryText="Create"
                  leftIcon={<CreateNewItem />}
                  onClick={() =>
                    this.setState({ currentPage: 'memo', sidebarOpen: !this.state.sidebarOpen })
                  }
                />
                <ListItem
                  primaryText="List"
                  leftIcon={<ShowList />}
                  onClick={() =>
                    this.setState({ currentPage: 'list', sidebarOpen: !this.state.sidebarOpen })
                  }
                />
                <ListItem
                  primaryText="Setting"
                  leftIcon={<Settings />}
                  onClick={() =>
                    this.setState({ currentPage: 'setting', sidebarOpen: !this.state.sidebarOpen })
                  }
                />
                <Divider />
                <ListItem
                  primaryText="Log Out"
                  leftIcon={<Logout />}
                  onClick={() => firebase.auth().signOut()}
                />
              </List>
            </Drawer>
          </div>
        </MuiThemeProvider>
      );
    } else if (this.state.currentPage === 'setting') {
      return (
        <MuiThemeProvider>
          <div>
            <SettingPage />
            <Drawer
              docked={false}
              width={200}
              open={this.state.sidebarOpen}
              onRequestChange={sidebarOpen => this.setState({ sidebarOpen })}
            >
              <List>
                <ListItem
                  primaryText="Create"
                  leftIcon={<CreateNewItem />}
                  onClick={() =>
                    this.setState({ currentPage: 'memo', sidebarOpen: !this.state.sidebarOpen })
                  }
                />
                <ListItem
                  primaryText="List"
                  leftIcon={<ShowList />}
                  onClick={() =>
                    this.setState({ currentPage: 'list', sidebarOpen: !this.state.sidebarOpen })
                  }
                />
                <ListItem
                  primaryText="Setting"
                  leftIcon={<Settings />}
                  onClick={() =>
                    this.setState({ currentPage: 'setting', sidebarOpen: !this.state.sidebarOpen })
                  }
                />

                <Divider />
                <ListItem
                  primaryText="Log Out"
                  leftIcon={<Logout />}
                  onClick={() => firebase.auth().signOut()}
                />
              </List>
            </Drawer>
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
            <MuiThemeProvider>
              <AppBar
                title="faaculty"
                onLeftIconButtonClick={() => this.handleToggle()}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
              />
            </MuiThemeProvider>
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
