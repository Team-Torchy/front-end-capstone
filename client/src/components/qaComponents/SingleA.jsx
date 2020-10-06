import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
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
  // const [answersData, setAnswersData] = useState();
  // console.log('SingleA answersData: ', answersData);
  const classes = useStyles();
  const [reportDisabled, setReportDisabled] = useState(false);
  const [yesDisabled, setYesDisabled] = useState(false);

  const handleReportClick = () => {
    setReportDisabled(true);
  };

  const handleYesClick = () => {
    setYesDisabled(true);
  };

  return (
    <div>
      <Grid
        className={classes.root}
        item
        xs={12}
        container
        direction="column"
        justify="flex-start"
      >
        <Grid item xs={8}>
          <div className="QandA">A: {props.answer.body}</div>
        </Grid>

        {/* map over images in answer */}
        <GridList className={classes.gridList} cols={2.5}>
          {props.answer.photos.map((image, i) => (
            <GridListTile key={i}>
              <img className="QandA" src={image.url} />
            </GridListTile>
          ))}
        </GridList>

        <Grid item xs={12}>
          <div className="QandA">
            by {props.answer.answerer_name}, {props.answer.date} | Helpful?
            <Button
              size="small"
              variant="text"
              disabled={yesDisabled}
              onClick={handleYesClick}
            >
              Yes
            </Button>
            ({props.answer.helpfulness}) |
            <Button
              size="small"
              variant="text"
              disabled={reportDisabled}
              onClick={handleReportClick}
            >
              Report
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleA;

// {props.answer.photos.map((image, i) => {
//   return <AnswerPhoto key={i} image={image} />;
// })}