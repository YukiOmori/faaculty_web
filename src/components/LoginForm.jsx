import React from 'react';
import { Card, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const LoginForm = () => (
  <Card>
    <CardHeader title="Without Avatar" subtitle="Subtitle" actAsExpander showExpandableButton />
    <CardActions>
      <FlatButton label="Action1" />
      <FlatButton label="Action2" />
    </CardActions>
  </Card>
);

export default LoginForm;
