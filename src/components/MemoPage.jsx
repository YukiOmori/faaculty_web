import React, { Component } from 'react';
import { TextField, FlatButton, Dialog, Paper, RaisedButton, Snackbar } from 'material-ui';
import { blue800 } from 'material-ui/styles/colors';

const styles = {
  titleContainerStyle: {
    display: 'flex',
  },
  parentContainerStyle: {},
  childContainerStyle: {
    display: 'flex',
    flex: 1,
  },
  titleStyle: {
    paddingTop: 20,
    marginBottom: 20,
    paddingRight: 100,
    paddingLeft: 100,
    width: 300,
  },
  buttonStyle: {
    flex: 1,
  },
  memoStyle: {
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    marginBotttom: 20,
    flex: 1,
  },
};

class MemoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      saveNotificationOpen: false,
    };
  }

  handleOpen() {
    this.setState({ dialogOpen: true });
  }

  handleClose() {
    this.setState({ dialogOpen: false });
    this.props.clearText();
  }

  render() {
    const actions = [
      <FlatButton label="キャンセル" primary onClick={() => this.handleClose()} />,
      <FlatButton label="はい" primary onClick={() => this.handleClose()} />,
    ];
    const {
      id, title, fact, abstraction, application, setText, clearText, saveText,
    } = this.props;
    return (
      <div className="conatiner">
        <Paper sytle={styles.parentContainerStyle}>
          <div>
            <div className="memo-title">Summary</div>
            <TextField
              value={title}
              onChange={e => setText(e.target.value, 'title')}
              style={styles.titleStyle}
              hintText="気づきを一言で言うと？"
            />
          </div>
          <div className="button-container">
            <div className="button-wrapper">
              <RaisedButton
                style={styles.buttonStyle}
                labelColor="#fff"
                backgroundColor={blue800}
                onClick={() => {
                  saveText(id);
                  clearText();
                  this.setState({ saveNotificationOpen: true });
                }}
                label="SAVE"
              />
              <Snackbar
                open={this.state.saveNotificationOpen}
                message="メモを保存しました"
                autoHideDuration={4000}
                onRequestClose={() => this.setState({ saveNotificationOpen: false })}
              />
            </div>

            <div className="button-wrapper">
              <RaisedButton label="CANCEL" onClick={() => this.handleOpen()} />
              <Dialog
                actions={actions}
                modal={false}
                open={this.state.dialogOpen}
                onRequestClose={() => this.handleClose()}
              >
                編集中の内容を破棄しますか？
              </Dialog>
            </div>
          </div>
          <Paper style={styles.childContainerStyle}>
            <div className="memo-column">
              <div className="memo-title">Fact</div>
              <Paper style={styles.memoStyle}>
                <TextField
                  hintText="気づいた事象を入力"
                  value={fact}
                  multiLine
                  rows={1}
                  onChange={e => setText(e.target.value, 'fact')}
                />
              </Paper>
            </div>
            <div className="memo-column">
              <div className="memo-title">Abstraction</div>
              <Paper style={styles.memoStyle}>
                <TextField
                  hintText="Factを抽象化したことを入力"
                  value={abstraction}
                  multiLine
                  rows={1}
                  onChange={e => setText(e.target.value, 'abstraction')}
                />
              </Paper>
            </div>
            <div className="memo-column">
              <div className="memo-title">Application</div>
              <Paper style={styles.memoStyle}>
                <TextField
                  hintText="他の領域に転用する事例を入力"
                  value={application}
                  multiLine
                  rows={1}
                  onChange={e => setText(e.target.value, 'application')}
                />
              </Paper>
            </div>
          </Paper>
        </Paper>
      </div>
    );
  }
}

export default MemoPage;
