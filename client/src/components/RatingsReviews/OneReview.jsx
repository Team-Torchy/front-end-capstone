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
  divider: {
    margin: theme.spacing(2, 0),
  },
  button: {
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
  console.log("WE IN ONE REVIEW");
  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12} container>

            <Grid item xs={6}>
              <Typography gutterBottom variant="subtitle2">
                <StarMaker rating={props.person.rating} />
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="caption" style={{ float: 'right' }}>{props.person.reviewer_name + ", "} <AccurateDate date={props.person.date} /> </Typography>
            </Grid>

          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs={12}>

                <Typography style={{ wordBreak: 'break-all' }} gutterBottom variant="subtitle1">
                  {props.person.summary.length > 60 ? null : props.person.summary}
                </Typography>

                {props.person.body.length > 250 ?
                  <ShowReviewBody show={show ? 'Show less' : 'Show more'} body={props.person.body} /> :
                  <Typography style={{ wordBreak: 'break-all' }} variant="body2" gutterBottom> {props.person.body} </Typography>}

                {props.person.body.length > 250 ?
                  <Button onClick={() => handleChange()}>{show ? 'Show less' : 'Show more'}</Button> :
                  null}

                {props.person.photos.length > 0 ?
                  <UserPhotosModal photos={props.person.photos} summary={props.person.summary} body={props.person.body} rating={props.person.rating} name={props.person.reviewer_name} date={props.person.date} /> :
                  null}

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
                  Was this review helpful? <Typography variant="caption" color="textSecondary" onClick={() => {props.putHelpful(props.person.review_id)}}>Yes</Typography>{`(${props.person.helpfulness})`} | <Typography variant="caption" color="textSecondary" onClick={() => {props.putReport(props.person.review_id)}}>Report</Typography>
                  {/* {props.person.helpfulness ? "Helpful?" : null}

                  {props.person.helpfulness ?
                  <Button className={classes.button} size="small" style={{ textTransform: 'none' }}>Yes</Button> :
                  null}

                  {props.person.helpfulness ? "(" + props.person.helpfulness + ')' : null} */}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
      </div >
    </div>
  );
};

export default OneReview;