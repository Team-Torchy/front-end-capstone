import React from 'react';
import OneReview from './OneReview.jsx';

const ReviewList = (props) => {
  console.log("WE INSIDE OF REVIEW LIST")
  return (
    <div>
      {props.reviews.map((personReview, i) => (
        <OneReview person={personReview} putHelpful={props.putHelpful} putReport={props.putReport} key={i} />
      ))
      }
    </div>
  )
};

export default ReviewList;