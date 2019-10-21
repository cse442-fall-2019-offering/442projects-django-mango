const styles = theme => ({
  root: {
    margin: '0 auto',
    maxWidth: '65%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },

  card: {
    position: 'relative',
    top: '200px',
    left: '300px',
  },

  button: {
    position: 'relative',
    top: '-300px',
    left: '150px',
    width: 170,
    height: 40,
    paddingTop: '50px',
  },
});

export default styles;
