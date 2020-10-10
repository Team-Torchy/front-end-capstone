import React, { useState } from 'react';
import StarMaker from './StarMaker.jsx';
import AccurateDate from './AccurateDate.jsx';
import UserPhotosModal from './UserPhotosModal.jsx';
import ShowReviewBody from './ShowReviewBody.jsx';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, Grid, Button } from '@material-ui/core';

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

  const { rating, reviewer_name, date, summary, body, photos, recommend, response, helpfulness, review_id } = props.person;

  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12} container>
            <Grid item xs={6}>
              <Typography gutterBottom variant="subtitle2">
                <StarMaker rating={rating} />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" style={{ float: 'right' }}>{reviewer_name + ", "} <AccurateDate date={date} /> </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs={12}>
                <Typography style={{ wordBreak: 'break-all' }} gutterBottom variant="subtitle1">
                  {summary.length > 60 ? null : summary}
                </Typography>
                {body.length > 250 ?
                  <ShowReviewBody show={show ? 'Show less' : 'Show more'} body={body} /> :
                  <Typography style={{ wordBreak: 'break-all' }} variant="body2" gutterBottom> {body} </Typography>}
                {body.length > 250 ?
                  <Button onClick={() => handleChange()}>{show ? 'Show less' : 'Show more'}</Button> :
                  null}
                {photos.length > 0 ?
                  <UserPhotosModal photos={photos} summary={summary} body={body} rating={rating} name={reviewer_name} date={date} /> :
                  null}
                <Typography variant="caption">
                  {recommend ? "I recommend this product" : null}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {response !== "" && response !== null ? 'Response:' : null}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {response !== "" && response !== null ? response : null}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Was this review helpful? <Typography variant="caption" color="textSecondary" onClick={() => { props.putHelpful(review_id) }}>Yes</Typography>{`(${helpfulness})`} | <Typography variant="caption" color="textSecondary" onClick={() => { props.putReport(review_id) }}>Report</Typography>
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