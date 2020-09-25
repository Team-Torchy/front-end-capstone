import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  image: {
    width: 128,
    height: 128,
  },
  paper: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const SingleA = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Grid item xs={12} container direction="column" justify="flex-start">
        <Grid item xs={8}>A: {props.answer.body}</Grid>
        <Grid item xs={6}>by {props.answer.answerer_name}, {props.answer.date}  |  Helpful? Yes ({props.answer.helpfulness})  |  Report</Grid>
      </Grid>
    </div>
  );
};

export default SingleA;