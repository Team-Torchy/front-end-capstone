import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import AddAReview from './AddAReview.jsx';

class RatingReviewApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyData: false,
      num: 1,
      id: 0,
      bool: false
    }
    //bind any functions here
    this.nextTwo = this.nextTwo.bind(this);
  }
  componentDidMount() {
    this.getReviews();
  }
  //Methods here
  getReviews() {
    axios.get(`/reviews/1`)
    .then((results) => {
      console.log(results.data);
    })
    .catch((err) => {
      console.log(err);
    })
  };

  nextTwo() {
    this.setState({
      num: this.state.num += 2
    })
  };




  //PAGINATION GET REQUEST LIMIT COUNT OFFSET
  //SETUP GET REQUEST ONLY NEXT IN LINE
  //INDEX
  nextConditional() {
    const { dummyData, num } = this.state;
    if (dummyData && dummyData.results.length > 2) {
      if (dummyData.results[num] || dummyData.results[num - 1]) {
        return <Button variant="outlined" onClick={() => this.nextTwo()}>MORE REVIEWS</Button>
      } else {
        return null;
      }
    }
  };

  setBool() {
    const { bool } = this.state;
    if (bool) {
      this.setState({
        bool: false
      })
    } else {
      this.setState({
        bool: true
      })
    }
  }

  render() {
    const { dummyData, num, bool } = this.state;
    return (
      <div>
        {dummyData ? <ReviewList reviews={dummyData} num={num} /> : null}
        {this.nextConditional()}
        <Button variant="outlined" onClick={() => this.setBool()}>MORE REVIEWS +</Button>
        {bool ? <AddAReview /> : null}
      </div>
    )
  }
};

export default RatingReviewApp;