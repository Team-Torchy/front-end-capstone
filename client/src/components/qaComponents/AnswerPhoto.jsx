import React from 'react';
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

const AnswerPhoto = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {props.answer.photos.map((image, i) => (
          <GridListTile key={i}>
            <img src={image.url} />

          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default AnswerPhoto;

{/* <GridListTileBar
  title={tile.title}
  classes={{
    root: classes.titleBar,
    title: classes.title,
  }}
  actionIcon={
    <IconButton aria-label={`star ${tile.title}`}>
      <StarBorderIcon className={classes.title} />
    </IconButton>
  }
/>; */}