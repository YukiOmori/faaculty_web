import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, IconButton } from 'material-ui';
import Menu from 'material-ui/svg-icons/image/dehaze';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderLogoIcon() {
    return (
      <div>
        <a href="https://reverse-engineer/portfolio/faaculty">
          <img className="header-logo" src="/images/icon.png" alt="icon.png" />
        </a>
      </div>
    );
  }

  renderMenuIcon() {
    if (this.props.loggedIn) {
      return (
        <IconButton>
          <Menu />
        </IconButton>
      );
    }
    return null;
  }

  render() {
    const { handleToggle, loggedIn } = this.props;
    return (
      <div>
        <MuiThemeProvider>
          <AppBar
            style={{ backgroundColor: '#333' }}
            title="faaculty"
            iconElementLeft={this.renderLogoIcon()}
            iconElementRight={this.renderMenuIcon()}
            onRightIconButtonClick={() => handleToggle()}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Header;
