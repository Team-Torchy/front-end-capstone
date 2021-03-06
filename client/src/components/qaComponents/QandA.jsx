import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SingleQ from './SingleQ.jsx';
import AddQuestion from './AddQuestion.jsx';
import AltQuestionSearch from './AltQuestionSearch.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
    display: 'block',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: '8px'
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
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [questionsLimit, setQuestionsLimit] = useState(4);
  const [questionsData, setQuestionsData] = useState({results: [], id: 1});


  // console.log('Here is the ID: ', questionsData.product_id);
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

  //Conditional render of 'More Answered Questions'
  let addQuestionsView;
  if (questionsLimit < questionsData.results.length) {
    addQuestionsView =
    <Grid item xs={8} container spacing={2}>
      <Button
        variant="contained"
        onClick={onLoadMore}
        className={classes.button}
      >
        MORE ANSWERED QUESTIONS
      </Button>
      <AddQuestion />
    </Grid>;
  } else {
    addQuestionsView = <AddQuestion productId={questionsData.product_id}/>;
  }

  // For search bar input change
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // GET Request for "List Questions" API
  useEffect(() => {
    axios.get(`http://3.137.191.193/qa/questions/?product_id=${questionsData.id}&count=20&page=1`)
      .then((response) => {
        setQuestionsData(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  // Search Bar Filtering
  useEffect(() => {
    const results = questionsData.results.filter((question) =>
      question.question_body.toLowerCase().includes(searchTerm.toLowerCase()));
    setSearchResults(results);
  }, [searchTerm]);

  // Conditional render of questions based off search filter
  let questionView;
  if (searchTerm.length < 3) {
    questionView =
    <div justify='space-between'>
      {questionsData.results.slice(0, questionsLimit).sort((a, b) => b.question_helpfulness - a.question_helpfulness).map((question, i) => {
        return <SingleQ key={i} question={question} />;
      })}
    </div>;
  } else {
    questionView =
    <div>
      {searchResults.slice(0, questionsLimit).sort((a, b) => b.question_helpfulness - a.question_helpfulness).map((question, i) => {
        return <AltQuestionSearch key={i} question={question}/>;
      })}
    </div>;
  }

  return (
    <div>
      <Grid item xs={2}></Grid>
      <Grid container xs={12}direction="column">
        <Grid item xs={4}>
          QUESTIONS {"&"} ANSWERS
        </Grid>
        <TextField
          variant="outlined"
          type="text"
          placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
          value={searchTerm}
          onChange={handleChange}
          style={{ margin: "8px" }}
        />

        {/* Conditional Render of Questions List */}
        {questionView}

        {addQuestionsView}
      </Grid>
      <Grid item xs={2}></Grid>
    </div>
  );
};


export default QandA;