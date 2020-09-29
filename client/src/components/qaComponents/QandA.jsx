import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import dummyQuestionsData from '../../dummyQuestionsData.js';
import SingleQ from './SingleQ.jsx';

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

const QandA = (props) => {
  const [questionsData, setQuestionsData] = useState(dummyQuestionsData);
  // console.log('This is the questions data: ', questionsData);
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={2} direction="column" >
        <Grid item xs={12} container spacing={3} my={2}>
          <Grid item xs={4}>QUESTIONS {'&'} ANSWERS</Grid>
          <TextField
            variant="outlined"
            placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
            fullWidth
          />
        </Grid>
        {/* Map over the array of question objects */}
        {questionsData.results.map((question, i) => {
          return <SingleQ key={i} question={question} />;
        })}
        <Grid item xs={8} container spacing={2}>
          <Button variant="contained" className={classes.button}>MORE ANSWERED QUESTIONS</Button>
          <Button variant="contained" className={classes.button}>ADD A QUESTION +</Button>
        </Grid>
      </Grid>
    </div>
  );
};


export default QandA;

