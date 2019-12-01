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
    fontSize: 35,
    fontFamily: 'Lucida Console, Monaco, monospace',
    textShadow: '2px 2px 4px #000000;',
    color: 'white',
    fontStyle: 'italic',
  },

  navbar_buttons: {
    '& a': {
      color: 'white',
      textDecoration: 'underline',
      display: 'inline-block',
      fontSize: '1.5vw',
      textShadow: '2px 2px 4px #000000;',
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
    position: 'relative',
    right: 60,
    display: 'flex',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px #000000;',
  },

  navbar_email: {
    position: 'relative',
    right: 50,
    fontFamily: 'Lucida Console, Monaco, monospace',
    fontSize: 15,
    color: 'white',
    textShadow: '2px 2px 4px #000000;',
  },
});

export default styles;
