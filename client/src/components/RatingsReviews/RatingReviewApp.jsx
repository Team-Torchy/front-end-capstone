import React, { Component } from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import AddAReview from './AddAReview.jsx';
import { Typography, Divider, Grid, Button, Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Image from 'react-image-resizer';
import MetaData from './MetaData.jsx';

class RatingReviewApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewData: false,
      metaData: false,
      product_id: props.num,
      page: 1,
      bool: false,
      lengthTest: false
    }
    //bind any functions here
    this.nextTwo = this.nextTwo.bind(this);
    this.nextConditional = this.nextConditional.bind(this);
  }
  componentDidMount() {
    this.getReviews();
    this.getMetaData();
  }

  //Methods here
  getReviews() {
    axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=2&page=${this.state.page}`)
      .then((results) => {
        console.log(results.data.results);
        if (!this.state.reviewData) {
          this.setState({
            reviewData: results.data.results
          })
        } else {
          let holder = [...this.state.reviewData, ...results.data.results];
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

  getMetaData() {
    axios.get(`http://18.224.37.110/reviews/meta/?product_id=${this.state.product_id}`)
      .then((data) => {
        this.setState({
          metaData: data.data
        })
        console.log(this.state.metaData);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  nextTwo(event) {
    event.preventDefault();
    this.setState({
      page: this.state.page += 1
    })
    this.getReviews();
  };




  //PAGINATION GET REQUEST LIMIT COUNT OFFSET
  //SETUP GET REQUEST ONLY NEXT IN LINE
  //INDEX
  nextConditional() {
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
    const { reviewData, bool, lengthTest } = this.state;
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={3} style={{ maxWidth: '300px' }}>
            {this.state.metaData ? <MetaData meta={this.state.metaData} /> : null}
          </Grid>

          <Grid item xs={5} >
            {reviewData.length > 0 ? <ReviewList reviews={reviewData} /> : null}
            {lengthTest ? <Button variant="outlined" onClick={(event) => this.nextTwo(event)}>MORE REVIEWS</Button> : null}
            <Button variant="outlined" onClick={() => this.setBool()}>MORE REVIEWS +</Button>
            {bool ? <AddAReview /> : null}
          </Grid>
          <Grid item xs={2}>
          </Grid>
        </Grid>
      </div>
    )
  }
};

export default RatingReviewApp;