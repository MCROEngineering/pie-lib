import { withStyles } from 'material-ui/styles';
import React from 'react';

import withRoot from '../src/withRoot';
import Typography from 'material-ui/Typography';
const D = ({ classes }) => (
  <Typography variant={'title'}>Welcome to the @pie-libs demo</Typography>
);

export default withRoot(
  withStyles({
    root: {
      backgroundColor: 'blue'
    }
  })(D)
);
