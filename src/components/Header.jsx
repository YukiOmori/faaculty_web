import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, IconButton } from 'material-ui';
import Menu from 'material-ui/svg-icons/image/dehaze';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      <MuiThemeProvider>
        <AppBar
          style={{ backgroundColor: '#333' }}
          title="faaculty"
          showMenuIconButton={loggedIn || false}
          iconElementLeft={
            <IconButton>
              <img src="" alt="" />
            </IconButton>
          }
          iconElementRight={this.renderMenuIcon()}
          onRightIconButtonClick={() => handleToggle()}
        />
      </MuiThemeProvider>
    );
  }
}

export default Header;
