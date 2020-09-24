import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


const OneReview = (props) => {
  return (
  <div>
        <Rating
          name="simple-controlled"
          value={props.person.rating}
          precision={0.5}
          readOnly
        />
    <h3>{props.person.summary}</h3>
    <h6 style={{float: 'right'}}>{props.person.date}</h6>
    <h6 style={{float: 'right'}}>{props.person.reviewer_name}</h6>
    <h4>{props.person.body}</h4>
    {props.person.response !== "" ? <><h3>Response</h3><h4>{props.person.response}</h4></> : null}
  </div >
  );
};

export default OneReview;