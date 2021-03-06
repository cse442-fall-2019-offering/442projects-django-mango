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
    left: '20px',
    width: 170,
    height: 40,
    paddingTop: '50px',
    paddingBottom: '20px',
  },

  empty: {
    paddingTop: 5,
  },

  groupList: {
    position: 'relative',
    top: '100px',
    left: '20px',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  openGroup: {
    width: 168,
    height: 203,
    margin: '20px 120px 40px 0',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    borderRadius: 9,
    overflow: 'auto',
    transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
    '&:hover': {
      transform: 'scale(1.1,1.1)',
    },
    backgroundColor: '#00aa00',
  },

  closedGroup: {
    width: 168,
    height: 203,
    margin: '20px 120px 40px 0',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    borderRadius: 9,
    overflow: 'auto',
    transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
    '&:hover': {
      transform: 'scale(1.1,1.1)',
    },
    backgroundColor: '#e31305',
  },
});

export default styles;
