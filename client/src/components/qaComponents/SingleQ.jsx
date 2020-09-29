import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SingleA from './SingleA.jsx';
import dummyAnswersData from '../../dummyAnswersData.js';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const SingleQ = (props) => {
  const classes = useStyles();
  const [answersData, setAnswersData] = useState(dummyAnswersData);
  // console.log('This is answersData: ,', answersData);

  return (
    <div>
      <Grid container spacing={2} direction="column">

        <Grid item xs={12} container justify="space-between">
          <Grid item xs={8}>Q: {props.question.question_body}</Grid>
          <Grid item xs={4}>Helpful? Yes ({props.question.question_helpfulness}) | Add Answer</Grid>
        </Grid>

        {/* Map over the array of answer objects */}
        {answersData.results.map((answer, i) => {
          return <SingleA key={i} answer={answer}/>;
        })}


        <Grid item xs={12}>Load More Answers</Grid>

      </Grid>
    </div>
  );
};

export default SingleQ;