import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import CreateNewItem from 'material-ui/svg-icons/content/create';
import DeleteItem from 'material-ui/svg-icons/action/delete';
import ListItem from 'material-ui/List';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import PropTypes from 'prop-types';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: '300px',
    };
  }

  handleToggle(event, toggled) {
    this.setState({
      [event.target.name]: toggled,
    });
  }

  handleChange(event) {
    this.setState({ height: event.target.value });
  }

  handleOnClickEdit(id) {
    for (let i = 0; i < this.props.list.length; i++) {
      const d = this.props.list[i];
      if (d.id === id) {
        this.props.changeToEditMode(d);
        break;
      }
    }
  }

  handleOnClickDelete(id) {
    for (let i = 0; i < this.props.list.length; i++) {
      const d = this.props.list[i];
      if (d.id === id) {
        this.props.dltData(id);
        break;
      }
    }
  }

  render() {
    return (
      <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="6" style={{ fontSize: 16, textAlign: 'center' }}>
                Data List
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>Created At</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Fact</TableHeaderColumn>
              <TableHeaderColumn>Abstraction</TableHeaderColumn>
              <TableHeaderColumn>Application</TableHeaderColumn>
              <TableHeaderColumn />
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.props.list.map(row => (
              <TableRow key={row.id}>
                <TableRowColumn>{row.date}</TableRowColumn>
                <TableRowColumn>{row.title}</TableRowColumn>
                <TableRowColumn>{row.fact}</TableRowColumn>
                <TableRowColumn>{row.abstraction}</TableRowColumn>
                <TableRowColumn>{row.application}</TableRowColumn>
                <TableRowColumn>
                  <div>
                    <FlatButton
                      primary
                      label={<CreateNewItem />}
                      onClick={() => this.handleOnClickEdit(row.id)}
                    />
                    <FlatButton
                      secondary
                      label={<DeleteItem />}
                      onClick={() => {
                        this.handleOnClickDelete(row.id);
                      }}
                    />
                  </div>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter adjustForCheckbox={this.state.showCheckboxes}>
            <TableRow>
              <TableRowColumn>ID</TableRowColumn>
              <TableRowColumn>Name</TableRowColumn>
              <TableRowColumn>Status</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn colSpan="3" style={{ textAlign: 'center' }}>
                Super Footer
              </TableRowColumn>
            </TableRow>
          </TableFooter> */}
        </Table>
      </div>
    );
  }
}

ListPage.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeToEditMode: PropTypes.func.isRequired,
  dltData: PropTypes.func.isRequired,
};

export default ListPage;
