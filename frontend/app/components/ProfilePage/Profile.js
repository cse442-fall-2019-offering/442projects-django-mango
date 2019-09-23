import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  hello: {
    padding: '30px 0px 0px 500px',
  },
  card: {
    maxWidth: 360,
    textAlign: 'center',
  },
  media: {
    height: 255,
  },
});

export default function ProfilePage() {
  const classes = useStyles();

  return (
    <div className={classes.hello}>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://cse.buffalo.edu/~mhertz/MatthewPhoto.jpg"
            title="User Photo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Student Name
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              Email Address
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Hi, I am from University at Buffalo studying Computer Engineering.
              My skills are: Python, Java, C++
            </Typography>
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
}
