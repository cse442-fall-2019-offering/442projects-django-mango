import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import LangMenu from 'my-components/LangMenu/LangMenu';

import { withStyles } from '@material-ui/core';

const useStyles = () => ({
  hello: {
    padding: '0px 0px 0px 0px',
    alignItems: 'center',
    position: 'relative',
    display: 'flex',
    margin: 0,
  },
  card: {
    maxWidth: 360,
    textAlign: 'center',
  },
  media: {
    height: 270,
  },
  profile_name: {
    color: 'black',
    textDecoration: 'none',
    '& a': {
      color: 'black',
      textDecoration: 'none',
      fontSize: '35px',
    },
  },
  profile_email: {
    color: 'black',
    textDecoration: 'none',
    '& a': {
      color: 'black',
      textDecoration: 'none',
      fontSize: '20px',
    },
  },
});

const ProfileCard = props => {
  const { classes } = props;
  return (
    <div className={classes.hello}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://cse.buffalo.edu/~mhertz/MatthewPhoto.jpg"
            title="Photo"
          />
          <CardContent>
            <div className={props.classes.profile_name}>
              <a href="/">{props.name}</a>
            </div>
            <div className={props.classes.profile_email}>
              <a href="/">{props.email}</a>
            </div>
            <LangMenu
              selectedLanguages={props.languages}
              onLanguagesChange={props.onLanguagesChange}
            />
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="big" color="primary">
            Account Settings
          </Button>
          <Button size="big" color="primary">
            Groups
          </Button>
          <Button size="small" color="secondary">
            Log out
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  languages: PropTypes.array.isRequired,
  onLanguagesChange: PropTypes.func.isRequired,
};

export default withStyles(useStyles)(ProfileCard);
