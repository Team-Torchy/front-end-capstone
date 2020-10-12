import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import SingleA from './SingleA.jsx';
import AddAnswer from './AddAnswer.jsx';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

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
    maxHeight: 100,
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const SingleQ = (props) => {
  // let yesCount = props.question.question_helpfulness;
  // console.log(yesCount);

  const classes = useStyles();
  const [helpfulCount, setHelpfulCount] = useState(props.question.question_helpfulness);
  const [answersData, setAnswersData] = useState({ results: [], question: 3 });
  const [yesDisabled, setYesDisabled] = useState(false);
  const [answersLimit, setAnswersLimit] = useState(2);

  //GET Request for 'Answers List' API
  useEffect(() => {
    axios
      .get(
        `http://3.137.191.193/qa/questions/${props.question.question_id}/answers`
      )
      .then((response) => {
        setAnswersData(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const onLoadMore = () => {
    setAnswersLimit(answersLimit + 100);
  };

  const handleYesClick = () => {
    setYesDisabled(true);
  };

  //Conditional Render of 'LOAD MORE ANSWERS'
  let loadAnswersView;
  if (answersLimit < answersData.results.length) {
    loadAnswersView = (
      <Grid item xs={12}>
        <Button size="small" variant="text" onClick={onLoadMore}>
          See More Answers
        </Button>
      </Grid>
    );
  } else {
    loadAnswersView = null;
  }

  return (
    <div>
      <Grid>
        <Grid container spacing={1} direction='column' justify='space-between'>
          <Grid item xs={12} container>
            <Grid item xs={5}>
              <div className='QandA'><b>Q: {props.question.question_body}</b></div>
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs={2}>
              <div className='QandA'>
                <Typography
                  style={{left: '250px' }}
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
              </div>
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.maxHeight}>
          {answersData.results.slice(0, answersLimit).sort((a, b) => b.helpfulness - a.helpfulness).map((answer, i) => {
            return <SingleA key={i} answer={answer} />;
          })}
        </div>


        {loadAnswersView}
        <Divider />
      </Grid>
    </div>
  );
};

export default SingleQ;
