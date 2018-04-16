import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

const Header = ({ handleToggle, loggedIn }) => (
  <MuiThemeProvider>
    <AppBar
      style={{ backgroundColor: '#333' }}
      title="faaculty"
      showMenuIconButton={loggedIn || false}
      onLeftIconButtonClick={() => handleToggle()}
      iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
  </MuiThemeProvider>
);

export default Header;
