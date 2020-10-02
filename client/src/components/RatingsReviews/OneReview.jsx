import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Grid, Button } from '@material-ui/core';
import StarMaker from './StarMaker.jsx';
import AccurateDate from './AccurateDate.jsx';
import UserPhotosModal from './UserPhotosModal.jsx';
import ShowReviewBody from './ShowReviewBody.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',

  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  button: {
    // backgroundColor: "#00D2BC",
    maxWidth: '28px',
    maxHeight: '28px',
    minWidth: '28px',
    minHeight: '28px',
    color: "grey",
  },
}));

const OneReview = (props) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const handleChange = () => {
    setShow((prev) => !prev);
  };

  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle2">
                  <StarMaker rating={props.person.rating} />
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  {props.person.summary}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {props.person.body.length > 250 ? <ShowReviewBody show={show ? 'Show less' : 'Show more'} body={props.person.body}/> : null}
                  {props.person.body.length > 250 ? <Button onClick={() => handleChange()}>{show ? 'Show less' : 'Show more'}</Button> : props.person.body}
                </Typography>
                {props.person.photos.length > 0 ? <UserPhotosModal photos={props.person.photos}/> : null}
                <Typography variant="caption">
                  {props.person.recommend ? "I recommend this product" : null}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {props.person.response !== "" && props.person.response !== null ? 'Response:' : null}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {props.person.response !== "" && props.person.response !== null ? props.person.response : null}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {props.person.helpfulness ? "Helpful?" : null}
                  {props.person.helpfulness ? <Button className={classes.button} size="small" style={{ textTransform: 'none' }}>Yes</Button> : null}
                  {props.person.helpfulness ? "(" + props.person.helpfulness + ')' : null}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="caption">{props.person.reviewer_name + ", "} <AccurateDate date={props.person.date} /> </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
      </div >
    </div>
  );
};

export default OneReview;