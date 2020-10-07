import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

const ShowReviewBody = (props) => {
  return (
    <div>
      {props.show === 'Show less' ? props.body : props.body.slice(0, 150) + '...'}
    </div>
  )
}

export default ShowReviewBody;
