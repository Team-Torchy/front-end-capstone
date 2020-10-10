import React, { Component } from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import AddAReview from './AddAReview.jsx';
import MetaData from './MetaData.jsx';
import dummyData from '../../../dummyData.js';
import { Typography, Divider, Grid, Button, Box, InputLabel, MenuItem, FormHelperText, FormControl, Select } from '@material-ui/core';

class RatingReviewApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: props.num,
      reviewData: false,
      metaData: false,
      ratingData: false,
      allReviewsCount: 0,
      currentSortString: 'relevant',
      page: 1,
      bool: false,
      lengthTest: false,
      filters: {},
    };
    this.putHelpful = this.putHelpful.bind(this);
    this.putReport = this.putReport.bind(this);
    this.sortByRating = this.sortByRating.bind(this);
    this.changeReviewOrRating = this.changeReviewOrRating.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.getReviews();
  }

  getReviews() {
    let nextReview = this.state.page + 1;
    const reviews = axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=2&page=${this.state.page}`);
    const meta = axios.get(`http://3.137.191.193/reviews/meta/?product_id=${this.state.product_id}`);
    const next = axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=2&page=${nextReview}`);
    const all = axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=${3000000}`);
    axios.all([reviews, meta, next, all]).then(axios.spread((...responses) => {
      console.log(responses[3].data.results);
      this.setState({
        reviewData: responses[0].data.results,
        metaData: responses[1].data,
        lengthTest: responses[2].data.results.length,
        page: nextReview,
        allReviewsCount: responses[3].data.results.length
      });
    }))
      .catch((err) => {
        console.log(err);

      });
  };

  getPaginatedReviews() {
    let nextReview = this.state.page + 1;
    const reviews = axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=2&page=${this.state.page}`);
    const next = axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=2&page=${nextReview}`);
    axios.all([reviews, next]).then(axios.spread((...responses) => {
      this.setState({
        reviewData: [...this.state.reviewData, ...responses[0].data.results],
        lengthTest: responses[1].data.results.length,
        page: nextReview
      });
      console.log(this.state.reviewData);
    }))
      .catch((err) => {
        console.log(err);
      });
  };

  putHelpful(id) {
    axios.put(`http://3.137.191.193/reviews/${id}/helpful`)
      .then((result) => {
        axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=${this.state.reviewData.length}`)
          .then((data) => {
            this.setState({
              reviewData: data.data.results
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  putReport(id) {
    axios.put(`http://3.137.191.193/reviews/${id}/report`)
      .then(() => {
        axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=${this.state.reviewData.length - 1}`)
          .then((data) => {
            this.setState({
              reviewData: data.data.results
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  sortByRating(num) {
    let result = [],
      bool = false,
      ratingData = this.state.ratingData,
      filter = this.state.filters;

    axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}`)
      .then((data) => {
        if (ratingData.length > 0) {
          for (var i = 0; i < ratingData.length; i++) {
            if (ratingData[i].rating !== num) {
              result.push(ratingData[i]);
              filter[`${ratingData[i].rating} stars`] = true;
            }
            if (ratingData[i].rating === num) {
              delete filter[`${ratingData[i].rating} stars`];
              bool = true;
            }
          }
        }
        if (!ratingData || !bool) {
          data.data.results.map((x, i) => {
            if (x.rating === num) {
              result.push(x);
              filter[`${x.rating} stars`] = true;
            }
          });
        }

        if (result.length > 0) {
          this.setState({
            ratingData: result,
            filters: filter
          });
        } else {
          this.setState({
            ratingData: false,
            filters: {}
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
  };

  changeReviewOrRating() {
    this.setState({
      ratingData: false,
      filters: {}
    });
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

  handleChange(e) {
    // console.log(e.target.value)
    // this.setState({
    //   currentSortString: e.target.value,
    //   page: 1,
    //   reviewData: false
    // })
    //   this.getPaginatedReviews()
  };

  render() {
    const { reviewData, bool, lengthTest, metaData, filters } = this.state;
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} container direction="row">
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={4} style={{ maxWidth: 300 }}>
            </Grid>
            <Grid item xs={3} style={{ maxWidth: 148, position: 'relative', top: 3 }}>
              <Typography>{this.state.allReviewsCount} reviews, sorted by</Typography>
            </Grid>
            <Grid item xs={2}>
              <FormControl style={{ minWidth: 120 }}>
                {/* <InputLabel>Age</InputLabel> */}
                <Select
                  value={this.state.currentSortString}
                  onChange={this.handleChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value={""}>None</MenuItem>
                  <MenuItem value={"relevant"}>Relevant</MenuItem>
                  <MenuItem value={"helpful"}>Helpful</MenuItem>
                  <MenuItem value={"newest"}>Newest</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={2}>
            </Grid>
          </Grid>
          <Grid item xs={3} style={{ maxWidth: 300 }}>
            {metaData ? <MetaData meta={metaData} sortByRating={this.sortByRating} filters={filters} changeReviewOrRating={this.changeReviewOrRating} /> : null}
          </Grid>
          <Grid item xs={7} >
            {this.reviewOrRatingData()}
            {lengthTest ? <Button variant="outlined" onClick={() => this.getPaginatedReviews()}>MORE REVIEWS</Button> : null}
            <Button variant="outlined" onClick={() => this.setBool()}>MORE REVIEWS +</Button>
            {bool ? <AddAReview /> : null}
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default RatingReviewApp;