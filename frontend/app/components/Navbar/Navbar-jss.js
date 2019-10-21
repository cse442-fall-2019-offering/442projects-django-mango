const styles = theme => ({
  root: {
    margin: '0 auto',
    maxWidth: '100%',
    [theme.breakpoints.down('s')]: {
      maxWidth: '100%',
    },
  },

  navbar: {
    top: '0px',
    left: '0px',
    position: 'fixed',
    width: '100%',
    background: '#EA6624',
    height: '60px',
    fontWeight: 'bold',
    zIndex: 5,
  },

  navbar_nav: {
    padding: '0px 0px 0px 20px',
    display: 'flex',
    alignItems: 'center',
    // textAlign: 'center',
    height: '100%',
  },

  navbar_title: {
    '& a': {
      padding: '0px 10px 0px 0px',
      color: '#FFFFFF',
      textDecoration: 'none',
      fontSize: '20px',
    },
  },

  navbar_buttons: {
    '& a': {
      color: 'white',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '1.5vw',
    },
    '& a:hover': {
      color: '#EB2121',
    },
    '& ul': {
      padding: '0px 0px 0px 0px',
      listStyle: 'none',
      margin: '0px',
      display: 'flex',
    },
    '& li': {
      padding: '0px 0px 0px 40px',
    },
  },

  empty: {
    flex: 1,
  },

  ProfileButton: {
    display: 'flex',
  },

  navbar_email: {
    '& a': {
      textDecoration: 'none',
      padding: '0px 100px 0px 0px',
      display: 'flex',
      margin: '0px',
      color: 'white',
      listStyle: 'none',
      fontWeight: 'bold',
    },
  },
});

export default styles;
