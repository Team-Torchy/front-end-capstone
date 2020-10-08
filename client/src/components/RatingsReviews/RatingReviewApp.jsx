import React, { Component } from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import AddAReview from './AddAReview.jsx';
import { Typography, Divider, Grid, Button, Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import dummyData from '../../../dummyData.js';

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
      lengthTest: false,
      ratingData: false,
      filters: {},
    }
    //bind any functions here
    // this.nextTwo = this.nextTwo.bind(this);
    // this.nextConditional = this.nextConditional.bind(this);
    this.putHelpful = this.putHelpful.bind(this);
    this.putReport = this.putReport.bind(this);
    this.sortByRating = this.sortByRating.bind(this);
    this.changeReviewOrRating = this.changeReviewOrRating.bind(this);
  }
  componentDidMount() {
    this.getReviews();
  }

  //Methods here
  // getReviews() {
  //   axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=2&page=${this.state.page}`)
  //     .then((results) => {
  //       this.getMetaData((data) => {
  //         this.nextConditional((data2, page) => {
  //           if (results && data && data2) {
  //             this.setState({
  //               reviewData: results.data.results,
  //               metaData: data,
  //               lengthTest: data2,
  //               page: page
  //             })
  //           }
  //         })
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // };
  // getMetaData(cb) {
  //   axios.get(`http://18.224.37.110/reviews/meta/?product_id=${this.state.product_id}`)
  //     .then((data) => {
  //       cb(data.data);
  //     })
  //     .catch((err) => {
  //     })
  // };

  // nextConditional(cb) {
  //   const { page } = this.state,
  //     next = page + 1;
  //   axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=2&page=${next}`)
  //     .then((results) => {
  //       cb(results.data.results.length, next);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // };

  getReviews() {

    axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=2&page=${this.state.page}`)
      .then((results) => {
        // console.log(results.data.results);
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

    let nextReview = this.state.page + 1;
    const reviews = axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=2&page=${this.state.page}`);
    const meta = axios.get(`http://18.224.37.110/reviews/meta/?product_id=${this.state.product_id}`);
    const next = axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=2&page=${nextReview}`);
    axios.all([reviews, meta, next]).then(axios.spread((...responses) => {
      this.setState({
        reviewData: responses[0].data.results,
        metaData: responses[1].data,
        lengthTest: responses[2].data.results.length,
        page: nextReview

      })
      console.log(this.state.reviewData);
    }))
      .catch((err) => {
        console.log(err);
      })
  }



  getMetaData() {
    axios.get(`http://18.224.37.110/reviews/meta/?product_id=${this.state.product_id}`)
      .then((data) => {
        this.setState({
          metaData: data.data
        })
        // console.log(this.state.metaData);
      }

  getPaginatedReviews() {
    let nextReview = this.state.page + 1;
    const reviews = axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=2&page=${this.state.page}`);
    const next = axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=2&page=${nextReview}`);
    axios.all([reviews, next]).then(axios.spread((...responses) => {
      this.setState({
        reviewData: [...this.state.reviewData, ...responses[0].data.results],
        lengthTest: responses[1].data.results.length,
        page: nextReview

      })
      console.log(this.state.reviewData);
    }))
      .catch((err) => {
        console.log(err);
      })
  };

  putHelpful(id) {
    axios.put(`http://18.224.37.110/reviews/${id}/helpful`)
      .then((result) => {
        axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=${this.state.reviewData.length}`)
          .then((data) => {
            this.setState({
              reviewData: data.data.results
            })
          })
      })
      .catch((err) => {
        console.log(err);
      })
  };

  putReport(id) {
    axios.put(`http://18.224.37.110/reviews/${id}/report`)
      .then(() => {
        axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=${this.state.reviewData.length - 1}`)
          .then((data) => {
            this.setState({
              reviewData: data.data.results
            })
          })
      })
      .catch((err) => {
        console.log(err);
      })
  };
  //ON MOUNT MAKE GET REQUEST FOR ALL REVIEWS THEN WHEN USER CLICKS ON RATING IN CHART IT WILL TRIGGER SORTBYRATING FUNC THIS FUNC WILL USE THE DATA FROM ALL REVIEWS AND FILTER BY RATING AND ADD TO DIFFERENT IF RATING DATA HAS ALREADY BEEN FILTERED AND USER CLICKS RATING AGAIN THEN LOOP AGAIN AND GET RID OF DATA ALSO MAKE A CONDITIONAL RENDER AT BOTTOM

  sortByRating(num) {
    let result = [],
      bool = false,
      ratingData = this.state.ratingData,
      filter = this.state.filters;

    axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}`)
      .then((data) => {
        if (ratingData.length > 0) {
          for (var i = 0; i < ratingData.length; i++) {
            if (ratingData[i].rating !== num) {
              result.push(ratingData[i]);
              filter[`${ratingData[i].rating} stars`] = true;
            }
            if (ratingData[i].rating === num) {
              delete filter[`${ratingData[i].rating} stars`]
              bool = true;
            }
          }
        }
        if (!ratingData || !bool) {
          data.data.results.map((x, i) => {
            if (x.rating === num) {
              result.push(x)
              filter[`${x.rating} stars`] = true;
            }
          })
        }

        if (result.length > 0) {
          this.setState({
            ratingData: result,
            filters: filter
          })
        } else {
          this.setState({
            ratingData: false,
            filters: {}
          })
        }
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
  };

  changeReviewOrRating() {
    console.log("something")
    this.setState({
      ratingData: false,
      filters: {}
    })
  };

  reviewOrRatingData() {
    if (this.state.ratingData) {
      return <ReviewList reviews={this.state.ratingData} putHelpful={this.putHelpful} putReport={this.putReport} />;
    } else if (this.state.reviewData) {
      return <ReviewList reviews={this.state.reviewData} putHelpful={this.putHelpful} putReport={this.putReport} />;
    } else {
      return null;
    }
  };


  render() {
    const { reviewData, bool, lengthTest } = this.state;
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={3} style={{ maxWidth: '300px' }}>
            {this.state.metaData ? <MetaData meta={this.state.metaData} sortByRating={this.sortByRating} filters={this.state.filters} changeReviewOrRating={this.changeReviewOrRating}/> : null}
          </Grid>

          <Grid item xs={5} >
            {/* {reviewData.length > 0 ? <ReviewList reviews={reviewData} putHelpful={this.putHelpful} putReport={this.putReport}/> : null} */}
            {this.reviewOrRatingData()}
            {lengthTest ? <Button variant="outlined" onClick={() => this.getPaginatedReviews()}>MORE REVIEWS</Button> : null}
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