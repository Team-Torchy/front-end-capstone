import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import AnswerPhoto from './AnswerPhoto.jsx';
import dummyAnswersData from '../../dummyAnswersData.js';

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

const SingleA = (props) => {
  const [answersData, setAnswersData] = useState(dummyAnswersData);
  console.log('SingleA answersData: ', answersData);
  const classes = useStyles();

  return (
    <div>
      <Grid item xs={12} container direction="column" justify="flex-start">
        <Grid item xs={8}>
          A: {props.answer.body}
        </Grid>

        <GridList className={classes.gridList} cols={2.5}>
          {props.answer.photos.map((image, i) => (
            <GridListTile key={i}>
              <img src={image.url} />
            </GridListTile>
          ))}
        </GridList>

        <Grid item xs={10}>
          by {props.answer.answerer_name}, {props.answer.date} | Helpful? Yes (
          {props.answer.helpfulness}) | Report
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleA;

// {props.answer.photos.map((image, i) => {
//   return <AnswerPhoto key={i} image={image} />;
// })}