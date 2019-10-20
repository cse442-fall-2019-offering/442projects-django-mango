const styles = theme => ({
  root: {
    margin: '0 auto',
    maxWidth: '65%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
    maxHeight: '100%',
  },

  button: {
    position: 'relative',
    top: '170px',
    left: '50px',
    width: 170,
    height: 40,
    paddingTop: '50px',
  },

  name: {
    position: 'relative',
    top: 100,
    left: 300,
    width: 500,
    fontSize: '50px',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  description: {
    position: 'relative',
    top: 150,
    left: 300,
    width: 510,
    height: 400,
    zIndex: 1,
    backgroundColor: '#fff',
    color: 'black',
    borderRadius: 18,
    padding: 50,
    overflow: 'auto',
    boxShadow: '0px 4px 10px rgba(51, 50, 50, 0.15)',
  },

  languageTitle: {
    color: '#0000ff',
  },

  languages: {
    position: 'relative',
    bottom: 200,
    left: 50,
    width: 400,
    height: 500,
    fontSize: '20px',
  },

  members: {
    position: 'relative',
    bottom: 720,
    left: 940,
    width: 400,
    height: 500,
    fontSize: '20px',
  },

  submitButton: {
    position: 'relative',
    bottom: 1430,
    left: 940,
    width: 170,
    height: 40,
    paddingTop: '50px',
  },

  close: {
    position: 'relative',
    bottom: 1385,
    right: 50,
    width: 50,
    height: 50,
    zIndex: 5,
  },

  edit: {
    position: 'relative',
    bottom: 1250,
    left: 785,
    width: 50,
    height: 50,
    zIndex: 5,
  },
});

export default styles;
