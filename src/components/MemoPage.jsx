import React, { Component } from 'react';
import { TextField, Divider, Paper, RaisedButton } from 'material-ui';

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
const MemoPage = ({
  fact, abstraction, application, setText, saveText,
}) => (
  <div className="conatiner">
    <Paper sytle={styles.parentContainerStyle}>
      <div>
        <TextField style={styles.titleStyle} hintText="気づきを一言で言うと？" />
      </div>
      <div className="button-container">
        <RaisedButton
          style={styles.buttonStyle}
          onClick={() => saveText()}
          label="SAVE"
          secondary
        />
      </div>
      <Paper style={styles.childContainerStyle}>
        <Paper style={styles.memoStyle}>
          <TextField
            hintText="気づいた事象を入力"
            value={fact}
            multiLine
            rows={1}
            onChange={event => setText(event.target.value, 'fact')}
          />
        </Paper>
        <Paper style={styles.memoStyle}>
          <TextField
            hintText="Factを抽象化したことを入力"
            value={abstraction}
            multiLine
            rows={1}
            onChange={event => setText(event.target.value, 'fact')}
          />
        </Paper>
        <Paper style={styles.memoStyle}>
          <TextField
            hintText="他の領域に転用する事例を入力"
            value={application}
            multiLine
            rows={1}
            onChange={event => setText(event.target.value, 'fact')}
          />
        </Paper>
      </Paper>
    </Paper>
  </div>
);

export default MemoPage;
