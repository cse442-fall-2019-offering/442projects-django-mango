const styles = theme => ({
  root: {
    margin: '0 auto',
    maxWidth: '65%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
    maxHeight: '100%',
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

  contactEdit: {
    position: 'relative',
    bottom: 830,
    left: 790,
    width: 50,
    height: 50,
    zIndex: 5,
  },

  contactPopup: {
    height: 400,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    overflow: 'auto',
  },

  languages: {
    position: 'relative',
    bottom: 180,
    width: 220,
    height: 500,
    fontSize: '15px',
  },

  publicButton: {
    position: 'relative',
    bottom: 900,
    left: 60,
  },

  submitButton: {
    position: 'relative',
    bottom: 800,
    left: 900,
    width: 170,
    height: 40,
    paddingTop: '50px',
  },
});

export default styles;
