const styles = theme => ({
  root: {
    margin: '0 auto',
    maxWidth: '65%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
  },

  button: {
    width: 170,
    height: 40,
  },

  groupList: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },

  group: {
    width: 168,
    height: 203,
    margin: '20px 30px 40px 0',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    borderRadius: 9,
    overflow: 'hidden',
    transition: '0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
    '&:hover': {
      transform: 'scale(1.1,1.1)',
    },
  },
});

export default styles;
