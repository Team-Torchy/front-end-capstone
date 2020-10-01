import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import AddAReview from './AddAReview.jsx';
import dummyData from '/Users/alecbrock/front-end-capstone/client/dummyData.js';
class RatingReviewApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      reviewData: false,
      product_id: props.num,
      page: 1,
      bool: false,
      lengthTest: false
    }
=======
      dummyData: false,
      num: 1,
      id: 0,
      bool: false
    };
>>>>>>> master
    //bind any functions here
    this.nextTwo = this.nextTwo.bind(this);
    this.nextConditional = this.nextConditional.bind(this);
  }
  componentDidMount() {
    this.getReviews();
  }
  //Methods here
  getReviews() {
<<<<<<< HEAD
    axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=2&page=${this.state.page}`)
      .then((results) => {
        if(!this.state.reviewData) {
          console.log(results.data.results);
        this.setState({
          reviewData: results.data.results
        })
      } else {
        let holder = [...this.state.reviewData, ...results.data.results];
        console.log(holder);
        this.setState({
          reviewData: holder
        })
      }
      })
      .then((x) => {
        this.nextConditional();
      })
      .catch((err) => {
        console.log(err);
      })
  };
=======
    axios.get(`/reviews/${this.state.id}`)
      .then((reviews) => {
        this.setState({
          dummyData: this.props.dummyData
        });
      })
      .catch((error) => {
        // console.log(error);
      });
  }
>>>>>>> master

  nextTwo(event) {
    event.preventDefault();
    this.setState({
<<<<<<< HEAD
      page: this.state.page += 1
    })
    this.getReviews();
  };
=======
      num: this.state.num += 2
    });
  }
>>>>>>> master




  //PAGINATION GET REQUEST LIMIT COUNT OFFSET
  //SETUP GET REQUEST ONLY NEXT IN LINE
  //INDEX
  nextConditional() {
<<<<<<< HEAD
    const { reviewData, page, lengthTest } = this.state,
      next = page + 1;
    axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=2&page=${next}`)
      .then((results) => {
        this.setState({
          lengthTest: results.data.results.length
        })
      })
      .catch((err) => {
        console.log(err);
      })
    };
=======
    const { dummyData, num } = this.state;
    if (dummyData && dummyData.results.length > 2) {
      if (dummyData.results[num] || dummyData.results[num - 1]) {
        return <Button variant="outlined" onClick={() => this.nextTwo()}>MORE REVIEWS</Button>;
      } else {
        return null;
      }
    }
  }
>>>>>>> master

    // if (results.data.results.length > 0) {
    //   console.log(results.data.results.length, 'inside if');
    //   return <Button variant="outlined" onClick={() => this.nextTwo()}>MORE REVIEWS</Button>
    // } else {
    //   return null;
    // }
  setBool() {
    const { bool } = this.state;
    if (bool) {
      this.setState({
        bool: false
      });
    } else {
      this.setState({
        bool: true
      });
    }
  }

  render() {
    const { reviewData, bool, lengthTest } = this.state;
    return (
      <div>
        {reviewData ? <ReviewList reviews={reviewData.results} /> : null}
        {lengthTest ? <Button variant="outlined" onClick={(event) => this.nextTwo(event)}>MORE REVIEWS</Button> : null}
        <Button variant="outlined" onClick={() => this.setBool()}>MORE REVIEWS +</Button>
        {bool ? <AddAReview /> : null}
      </div>
    );
  }
}

export default RatingReviewApp;