import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import AccurateDate from '../RatingsReviews/AccurateDate.jsx';

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
  const classes = useStyles();
  const [reportDisabled, setReportDisabled] = useState(false);
  const [yesDisabled, setYesDisabled] = useState(false);

  const handleReportClick = () => {
    setReportDisabled(true);
  };

  const handleYesClick = () => {
    setYesDisabled(true);
  };

  //Conditional render of answerer name
  let answererName;
  if (props.answer.answerer_name.toLowerCase() === 'seller') {
    answererName = <b>props.answer.answerer_name  <em>SELLER</em></b>;
  } else {
    answererName = props.answer.answerer_name;
  }

  //Conditional render of report button
  let report;
  if (reportDisabled === false) {
    report = (
      <Button
        size="small"
        variant="text"
        disabled={reportDisabled}
        onClick={handleReportClick}
      >
        Report
      </Button>
    );
  } else {
    report = <b>Reported</b>;
  }

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
        {/* {moment('props.answer.date').format('MMMM Do YYYY')} */}
        <Grid item xs={12}>
          <div className="QandA">
          by {answererName}, <AccurateDate date={props.answer.date}/> | Helpful?
            <Button
              size="small"
              variant="text"
              disabled={yesDisabled}
              onClick={handleYesClick}
            >
              Yes
            </Button>
            ({props.answer.helpfulness}) |
            {report}
            {/* <Button
              size="small"
              variant="text"
              disabled={reportDisabled}
              onClick={handleReportClick}
            >
              Report
            </Button> */}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleA;