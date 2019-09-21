const styles = theme => ({
  root: {
    margin: '0 auto',
    maxWidth: '100%',
    [theme.breakpoints.down('s')]: {
      maxWidth: '100%',
    },
  },

  Button: {
    color: 'white',
  },
});

export default styles;
