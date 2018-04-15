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
import ListPage from './ListPage';
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
  const h = elements[2];
  const m = elements[3];
  const s = elements[4];
  return `${year}/${month}/${date} ${h}:${m}:${s}`;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'memo',
      loggedIn: 'null',
      list: [],
      sidebarOpen: false,
      id: '',
      fact: '',
      abstraction: '',
      application: '',
      title: '',
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
            fact: memo.fact,
            abstraction: memo.abstraction,
            application: memo.application,
            id: memo.date,
          });
          this.setState({ list: listArray });
        });
        db.ref(path).on('child_changed', (data) => {
          const memo = data.val();
          listArray.unshift({
            date: convertDitigalTimeToSlashTime(memo.date),
            title: memo.title ? memo.title : 'No Title',
            fact: memo.fact,
            abstraction: memo.abstraction,
            application: memo.application,
            id: memo.date,
          });
          this.setState({ list: listArray });
        });
        db.ref(path).on('child_removed', (data) => {
          const memo = data.val();
          for (let i = 0; i < listArray.length; i++) {
            if (listArray.id === memo.id) {
              listArray.splice(i, 1);
              this.setState({ list: listArray });
              break;
            }
          }
        });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  setText(text, label) {
    switch (label) {
      case 'fact':
        this.setState({ fact: text });
        break;
      case 'abstraction':
        this.setState({ abstraction: text });
        break;
      case 'application':
        this.setState({ application: text });
        break;
      case 'title':
        this.setState({ title: text });
        break;
      default:
        break;
    }
  }

  clearText() {
    this.setState({
      id: '',
      fact: '',
      abstraction: '',
      application: '',
      title: '',
    });
  }

  saveText(id) {
    const db = firebase.database();
    const userId = firebase.auth().currentUser.uid;
    const date = id || returnDigitalTime();
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

  changeToEditMode(data) {
    this.setState({
      currentPage: 'memo',
      id: data.id,
      title: data.title,
      fact: data.fact,
      abstraction: data.abstraction,
      application: data.application,
    });
  }

  dltData(id) {
    const db = firebase.database();
    const userId = firebase.auth().currentUser.uid;
    const date = id;
    const path = `user/${userId}/${date}`;
    db.ref(path).remove();
  }

  handleToggle() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }

  renderContent() {
    if (this.state.currentPage === 'memo') {
      return (
        <MuiThemeProvider>
          <div>
            <MemoPage
              setText={(text, label) => this.setText(text, label)}
              clearText={() => this.clearText()}
              saveText={id => this.saveText(id)}
              id={this.state.id}
              title={this.state.title}
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
            <ListPage
              list={this.state.list}
              changeToEditMode={(ttl, fct, abst, appl) =>
                this.changeToEditMode(ttl, fct, abst, appl)
              }
              dltData={id => this.dltData(id)}
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
