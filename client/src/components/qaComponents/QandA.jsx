import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import dummyQuestionsData from '../../dummyQuestionsData.js';
import SingleQ from './SingleQ.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const QandA = (props) => {
  const [questionsData, setQuestionsData] = useState(dummyQuestionsData);
  console.log('This is the questions data: ', questionsData);
  const classes = useStyles();

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    axios.get(`http://18.224.37.110/qa/questions/?product_id=1`)
      .then((response) => {
        console.log('This is the axios.get response.data: ', response.data);
        setQuestionsData(response.data);
      })
      .catch(error => console.error(error));

  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  return (
    <div >
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

        <Grid item xs={12}>Load More Answers</Grid>

        <Grid item xs={8} container spacing={2}>
          <Button variant="contained" className={classes.button}>MORE ANSWERED QUESTIONS</Button>
          <Button variant="contained" className={classes.button}>ADD A QUESTION +</Button>
        </Grid>
      </Grid>
    </div>
  );
};


export default QandA;

