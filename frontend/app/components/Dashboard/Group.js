import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  group: {
    borderRadius: '10px',
  },
});

const Group = props => {
  const { classes } = props;
  return <div className={classes.group}>{props.group[1]}</div>;
};

Group.propTypes = {
  classes: PropTypes.object.isRequired,
  group: PropTypes.array.isRequired,
};

export default withStyles(styles)(Group);
