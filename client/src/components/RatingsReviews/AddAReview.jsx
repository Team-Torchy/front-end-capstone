import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Accordion, AccordionDetails, AccordionSummary, AccordionActions, Typography, Button, Divider, Checkbox, TextField } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
            <TextField id="standard-summary" label="Summary" />
            <br />
            <TextField id="standard-body" label="Body" />
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