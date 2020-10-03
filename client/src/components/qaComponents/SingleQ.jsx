import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import SingleA from './SingleA.jsx';
import AddAnswer from './AddAnswer.jsx';
import Button from '@material-ui/core/Button';


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
  const [yesDisabled, setYesDisabled] = useState(false);
  const [answersLimit, setAnswersLimit] = useState(2);
  const [answersData, setAnswersData] = useState({results: [], question: 1});


  //GET Request for "Answers List" API for specific question id's answers
  useEffect(() => {
    axios.get(`http://18.224.37.110/qa/questions/${props.question.question_id}/answers`)
      .then((response) => {
        // console.log('This is the axios.get response.data: ', response.data);
        setAnswersData(response.data);
      })
      .catch(error => console.error(error));
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  const onLoadMore = () => {
    setAnswersLimit(answersLimit + 100);
  };

  const handleYesClick = () => {
    setYesDisabled(true);
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12} container justify="space-between">

        <Grid item xs={6}>
          Q: {props.question.question_body}
        </Grid>

        <Grid item xs={6}>
          Helpful? <Button size="small" variant="text" disabled={yesDisabled} onClick={handleYesClick}>Yes</Button> ({props.question.question_helpfulness}) | <AddAnswer />
        </Grid>

      </Grid>

      {/* Map over the array of answer objects */}
      {answersData.results.slice(0, answersLimit).map((answer, i) => {
        return <SingleA key={i} answer={answer} />;
      })}


      <Grid item onClick={onLoadMore} xs={12}>LOAD MORE ANSWERS</Grid>

    </Grid>
  );
};

export default SingleQ;
