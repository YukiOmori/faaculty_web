import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

const Header = () => (
  <MuiThemeProvider>
    <AppBar title="faaculty" iconClassNameRight="muidocs-icon-navigation-expand-more" />
  </MuiThemeProvider>
);

export default Header;
