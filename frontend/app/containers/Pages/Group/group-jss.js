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
    left: 20,
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

  languagesMenu: {
    position: 'relative',
    bottom: 180,
    width: 220,
    height: 500,
    fontSize: '15px',
  },

  members: {
    position: 'relative',
    bottom: 720,
    left: 940,
    width: 400,
    height: 500,
    fontSize: '20px',
  },

  contact: {
    position: 'relative',
    bottom: 1320,
    left: 740,
    width: 50,
    height: 50,
    zIndex: 5,
  },

  contactEdit: {
    position: 'relative',
    bottom: 1350,
    left: 740,
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
    right: 80,
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

  publicButton: {
    position: 'relative',
    bottom: 1407,
    left: 115,
  },
});

export default styles;
