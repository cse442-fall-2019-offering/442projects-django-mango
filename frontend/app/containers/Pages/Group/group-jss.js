const styles = theme => ({
  root: {
    margin: '0 auto',
    maxWidth: '65%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },

  button: {
    position: 'relative',
    top: '100px',
    left: '175px',
    width: 170,
    height: 40,
    paddingTop: '50px',
  },

  title: {
    position: 'relative',
    top: '100px',
    left: '300px',
    width: 500,
    fontSize: '50px',
    fontWeight: 'bold',
  },

  languageTitle: {
    color: '#0000ff',
  },

  languages: {
    position: 'relative',
    top: '200px',
    left: '50px',
    width: 400,
    fontSize: '20px',
  },

  members: {
    position: 'relative',
    top: '50px',
    left: '300px',
    right: '100px',
    width: 400,
    fontSize: '20px',
  },
});

export default styles;
