import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SingleQ from './SingleQ.jsx';
import AddQuestion from './AddQuestion.jsx';
// import QuestionSearch from './QuestionSearch.jsx';
import AltQuestionSearch from './AltQuestionSearch.jsx';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
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
  button: {
    margin: theme.spacing(1),
  }
}));

const QandA = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const [questionsLimit, setQuestionsLimit] = useState(4);
  const [questionsData, setQuestionsData] = useState({results: [], id: 1});
  console.log('This is the questions data: ', questionsData);
  // console.log('This is the questions data.id: ', questionsData.id);
  const classes = useStyles();

  const handleQuestionModalOpen = () => {
    setIsOpen(true);
  };

  const handleQuestionModalClose = () => {
    setIsOpen(false);
  };

  const onLoadMore = () => {
    setQuestionsLimit(questionsLimit + 2);
  };

  //GET Request for "List Questions" API
  useEffect(() => {
    axios.get(`http://18.224.37.110/qa/questions/?product_id=${questionsData.id}&count=20&page=1`)
      .then((response) => {
        // console.log('This is the axios.get response.data: ', response.data);
        setQuestionsData(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  // console.log('This is the NEW questionsData state', questionsData);

  return (
    <div>
      <Grid container spacing={2} direction="column" >
        <Grid item xs={12} container spacing={3} my={2}>
          <Grid item xs={4}>QUESTIONS {'&'} ANSWERS</Grid>
          <AltQuestionSearch />
          {/* <QuestionSearch questionsData={questionsData}/> */}
        </Grid>
        {/* Map over the array of question objects */}
        {questionsData.results.slice(0, questionsLimit).map((question, i) => {
          return <SingleQ key={i} question={question} />;
        })}

        <Grid item xs={8} container spacing={2}>
          <Button variant="contained" onClick={onLoadMore} className={classes.button}>MORE ANSWERED QUESTIONS</Button>
          <AddQuestion />
        </Grid>
      </Grid>
    </div>
  );
};


export default QandA;

{/* <TextField
            variant="outlined"
            placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
            fullWidth
          /> */}

