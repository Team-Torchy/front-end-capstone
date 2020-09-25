import React from 'react';
import StarMaker from './StarMaker.jsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Button } from '@material-ui/core';

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
                  {props.person.body}
                </Typography>
                <Typography variant="caption">
                  {props.person.recommend ? "I recommend this product" : null}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {props.person.response !== "" ? 'Response:' : null}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {props.person.response !== "" ? props.person.response : null}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {props.person.helpfulness ? "Helpful?" : null}
                  {props.person.helpfulness ? <Button className={classes.button} size="small" style={{textTransform: 'none'}}>Yes</Button> : null}
                  {props.person.helpfulness ? "(" + props.person.helpfulness + ')' : null}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="caption">{props.person.reviewer_name + ", " + props.person.date}</Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
      </div >
    </div>
  );
};

export default OneReview;