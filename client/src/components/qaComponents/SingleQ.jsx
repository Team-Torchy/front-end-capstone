import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import SingleA from './SingleA.jsx';


const useStyles = makeStyles(theme => ({
  root: {
    width: '70%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
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
  const [answersData, setAnswersData] = useState({results: [], question: 1});
  //GET Request for "Answers List" API for specific question id's answers
  useEffect(() => {
    axios.get(`http://18.224.37.110/qa/questions/${props.question.question_id}/answers`)
      .then((response) => {
        console.log('This is the axios.get response.data: ', response.data);
        setAnswersData(response.data);
      })
      .catch(error => console.error(error));
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} container justify="space-between">
          <Grid item xs={8}>
            Q: {props.question.question_body}
          </Grid>
          <Grid item xs={4}>
            Helpful? Yes ({props.question.question_helpfulness}) | Add Answer
          </Grid>
        </Grid>

        {/* Map over the array of answer objects */}
        {answersData.results.map((answer, i) => {
          return <SingleA key={i} answer={answer} />;
        })}
      </Grid>
    </div>
  );
};

export default SingleQ;

