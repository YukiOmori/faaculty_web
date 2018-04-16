import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import { Drawer, Divider } from 'material-ui';
import CreateNewItem from 'material-ui/svg-icons/content/create';
import ShowList from 'material-ui/svg-icons/action/view-column';
import Settings from 'material-ui/svg-icons/action/settings';
import Logout from 'material-ui/svg-icons/maps/directions-run';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleOnClick(page) {
    this.props.changePageToFromSideBar(page); // ページを切り替え、sidebarOpenのステータスを切り替え
  }

  render() {
    return (
      <Drawer
        docked={false}
        width={200}
        openSecondary
        open={this.props.sidebarOpen}
        onRequestChange={open => this.props.handleRequestChange(open)}
      >
        <List>
          <ListItem
            primaryText="Create"
            leftIcon={<CreateNewItem />}
            onClick={() => this.handleOnClick('memo')}
          />
          <ListItem
            primaryText="List"
            leftIcon={<ShowList />}
            onClick={() => this.handleOnClick('list')}
          />
          <ListItem
            primaryText="Setting"
            leftIcon={<Settings />}
            onClick={() => this.handleOnClick('setting')}
          />
          <Divider />
          <ListItem
            primaryText="Log Out"
            leftIcon={<Logout />}
            onClick={() => this.props.handleLogOut()}
          />
        </List>
      </Drawer>
    );
  }
}

export default SideBar;
