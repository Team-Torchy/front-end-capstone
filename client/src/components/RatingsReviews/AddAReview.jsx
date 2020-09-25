import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';
import { Box } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
//ADD REACT HOOKS SO ThAT YOU CAN MAKE STATE IN HERE AND DEClARE A BOOLEAN ONCLICK THAT WILL CHANGE BOOLEAN AND IF TRUE WILL RENDER ACCORDION UNDER THE BUTTON
const useStyles = makeStyles((theme) => ({
  root: {
    width: '70%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  bodyHelper: {
    padding: theme.spacing(1, 5),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));


const AddAReview = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column}>
            <Typography className={classes.heading}>ADD A REVIEW +</Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.column} />
          <div className={classes.column, classes.bodyHelper}>
          <TextField id="standard-basic" label="Summary" />
            <br />
            <TextField id="standard-basic" label="Body" />
          </div>
          <div className={clsx(classes.column, classes.helper)}>
            <Typography variant="caption">
              Rate this product
              <br />
              <Rating
                name="simple-controlled"
                value={props.rating}
                precision={0.5}
                size="small"
              />
              <br />
              Recommend this product
              <Checkbox
                defaultChecked
                color="default"
                inputProps={{ 'aria-label': 'checkbox with default color' }}
              />
            </Typography>
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions>
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary">
            Submit
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}
export default AddAReview;