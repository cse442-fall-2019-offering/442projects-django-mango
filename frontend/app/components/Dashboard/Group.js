import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  group: {
    borderRadius: '10px',
  },
  name: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
    paddingTop: '20px',
  },
  languages: {
    textAlign: 'center',
    color: '#ffff00',
    marginTop: '50px',
  },
  language: {
    marginTop: '-20px',
  },
});

const Group = props => {
  const { classes } = props;
  return (
    <div className={classes.group}>
      <div className={classes.name}>{props.group[1]}</div>
      <div className={classes.languages}>
        {props.group[2].map(language => (
          <div className={classes.language} key={language}>
            <p>{`${language}\n`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

Group.propTypes = {
  classes: PropTypes.object.isRequired,
  group: PropTypes.array.isRequired,
};

export default withStyles(styles)(Group);
