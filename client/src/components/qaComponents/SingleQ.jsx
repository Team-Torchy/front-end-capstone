import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import SingleA from './SingleA.jsx';
import AddAnswer from './AddAnswer.jsx';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
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
  const [answersData, setAnswersData] = useState({ results: [], question: 1 });
  const [yesDisabled, setYesDisabled] = useState(false);
  const [answersLimit, setAnswersLimit] = useState(2);
  // console.log('SingleQ props: ', props);

  //GET Request for 'Answers List' API for specific question id's answers
  useEffect(() => {
    axios
      .get(
        `http://18.224.37.110/qa/questions/${props.question.question_id}/answers`
      )
      .then((response) => {
        // console.log('This is the axios.get response.data: ', response.data);
        setAnswersData(response.data);
      })
      .catch((error) => console.error(error));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  const onLoadMore = () => {
    setAnswersLimit(answersLimit + 100);
  };

  const handleYesClick = () => {
    setYesDisabled(true);
  };

  return (
    <div>
      <Grid>
        <Grid container spacing={1} direction='column'>
          <Grid item xs={12} container justify='space-between'>
            <Grid item xs={7}>
              <div className='QandA'>Q: {props.question.question_body}</div>
            </Grid>
            <Grid item xs={5}>
              <div className='QandA'>
                <Typography
                  style={{ position: 'relative', left: '250px' }}
                  variant='caption'
                >
                  Helpful?
                  <Button
                    size='small'
                    variant='text'
                    disabled={yesDisabled}
                    onClick={handleYesClick}
                  >
                    Yes
                  </Button>
                  ({props.question.question_helpfulness}) | <AddAnswer />
                </Typography>
                {/* Helpful? Yes ({props.question.question_helpfulness}) | Add Answer */}
              </div>
            </Grid>
          </Grid>
        </Grid>

        {/* Map over the array of answer objects */}
        {answersData.results.slice(0, answersLimit).map((answer, i) => {
          return <SingleA key={i} answer={answer} />;
        })}

        <Grid item xs={12}>
          <Button
            size='small'
            variant='text'
            onClick={onLoadMore}
          >
            Load More Answers
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleQ;
