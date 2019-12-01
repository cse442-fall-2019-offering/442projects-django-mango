const styles = theme => ({
  root: {
    margin: '0 auto',
    maxWidth: '65%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },

  name: {
    position: 'relative',
    top: 150,
    width: 500,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  languages: {
    position: 'relative',
    top: 200,
    left: 50,
    width: 400,
    height: 500,
    fontSize: '20px',
  },

  groups: {
    position: 'relative',
    bottom: 450,
    right: 250,
    width: 170,
    height: 40,
    paddingTop: '50px',
    fontWeight: 'bold',
  },

  groupList: {
    height: 566,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 85,
    paddingRight: 40,
    overflow: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  group: {
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
    backgroundColor: '#ffff00',
  },

  update: {
    position: 'relative',
    top: 130,
    left: 900,
    width: 170,
    height: 40,
    paddingTop: '50px',
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
});

export default styles;
