import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

//Import StarMaker and pass it a number with the key of "rating"

const StarMaker = (props) => {
  return (
    <Rating
          name="simple-controlled"
          value={props.rating}
          precision={0.25}
          size="small"
          readOnly
        />
  );
};

export default StarMaker;