import React from 'react';
import OneReview from './OneReview.jsx';

const ReviewList = (props) => {
  return (
    <div>
      {props.reviews.results.map((personReview, i) => (
        props.num >= i ? <OneReview person={personReview} key={i} /> : null
      ))
      }
    </div>
  )
};

export default ReviewList;