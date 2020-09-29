import React from 'react';
import OneReview from './OneReview.jsx';

const ReviewList = (props) => {
  return (
    <div>
      {props.reviews.map((personReview, i) => (
        <OneReview person={personReview} key={i} />
      ))
      }
    </div>
  )
};

export default ReviewList;