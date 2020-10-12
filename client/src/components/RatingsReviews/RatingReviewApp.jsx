import React, { Component } from 'react';
import axios from 'axios';
import ReviewList from './ReviewList.jsx';
import AddAReview from './AddAReview.jsx';
import MetaData from './MetaData.jsx';
import dummyData from '../../../dummyData.js';
import metaData from '../../../dummyMeta.js';
import { Typography, Divider, Grid, Button, Box, InputLabel, MenuItem, FormHelperText, FormControl, Select } from '@material-ui/core';

class RatingReviewApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lengthTest: true,
      product_id: props.num,
      reviewData: false,
      newestData: false,
      relevanceData: false,
      helpfulData: false,
      mainData: false,
      metaData: false,
      allReviewsCount: 0,
      currentSortString: '',
      page: 1,
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
    const meta = axios.get(`http://3.137.191.193/reviews/meta/?product_id=${this.state.product_id}`);
    const all = axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=${3000000}`);
    const newest = axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=${3000000}&sort=newest`);
    const relevance = axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=${3000000}%sort=relevant`);
    const helpful = axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=${3000000}&sort=helpful`);
    axios.all([meta, all, newest, relevance, helpful]).then(axios.spread((...responses) => {
      this.setState({
        metaData: responses[0].data,
        allReviewsCount: responses[1].data.results.length,
        reviewData: responses[1].data.results,
        newestData: responses[2].data.results,
        relevanceData: responses[3].data.results,
        helpfulData: responses[4].data.results
      });
    }))
      .then(() => {
        console.log(this.state.reviewData);
        this.reviewOrRatingData(this.state.currentSortString, this.state.filters);
      })
      .catch((err) => {
        console.log(err);

      });
  };


  getPaginatedReviews() {
    var page = 0;
    if (this.state.mainData[this.state.page + 2]) {
      page = this.state.page + 2;
    } else {
      if (this.state.mainData[this.state.page + 1]) {
        page = this.state.page + 1;
      } else {
        this.setState({
          lengthTest: false
        });
        return;
      }
    }
    if (!this.state.mainData[this.state.page + 3]) {
      this.setState({
        lengthTest: false,
        page: page
      });
    } else {
      this.setState({
        lengthTest: true,
        page: page
      });
    }
  };

  putHelpful(id) {
    axios.put(`http://3.137.191.193/reviews/${id}/helpful`)
      .then(() => {
        const all = axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=${3000000}`);
        const newest = axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=${3000000}&sort=newest`);
        const relevance = axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=${3000000}%sort=relevant`);
        const helpful = axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=${3000000}&sort=helpful`);
        axios.all([all, newest, relevance, helpful]).then(axios.spread((...responses) => {
          this.setState({
            reviewData: responses[0].data.results,
            newestData: responses[1].data.results,
            relevanceData: responses[2].data.results,
            helpfulData: responses[3].data.results
          });
          this.reviewOrRatingData(this.state.currentSortString, this.state.filters);
        }));
      })
      // .then(() => {
      //   this.reviewOrRatingData(this.state.currentSortString, this.state.filters);
      // })
      .catch((err) => {
        console.log(err);
      });
  }

  putReport(id) {
    axios.put(`http://3.137.191.193/reviews/${id}/report`)
      .then(() => {
        const all = axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=${3000000}`);
        const newest = axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=${3000000}&sort=newest`);
        const relevance = axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=${3000000}%sort=relevant`);
        const helpful = axios.get(`http://3.137.191.193/reviews/?product_id=${this.state.product_id}&count=${3000000}&sort=helpful`);
        axios.all([all, newest, relevance, helpful]).then(axios.spread((...responses) => {
          this.setState({
            reviewData: responses[0].data.results,
            newestData: responses[1].data.results,
            relevanceData: responses[2].data.results,
            helpfulData: responses[3].data.results
          });
          this.reviewOrRatingData(this.state.currentSortString, this.state.filters);
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  postAReview(obj) {
    console.log(obj);
  };

  changeReviewOrRating() {
    this.setState({
      filters: {}
    });
    this.reviewOrRatingData(this.state.currentSortString, {});
  };

  handleChange(e) {
    this.setState({
      currentSortString: e.target.value,
      page: 1,
      lengthTest: true
    });
    this.reviewOrRatingData(e.target.value, this.state.filters);
  };

  sortByRating(num) {
    var bool = false;
    const { filters } = this.state;
    if (Object.keys(filters).length > 0) {
      Object.keys(filters).map((x) => {
        if (Number(x) !== num) {
          filters[x] = true;
        } else if (Number(x) === num) {
          delete filters[x];
          bool = true;
        }
      });
    }
    if (!bool) {
      filters[num] = true;
    }
    this.setState({
      filters: filters,
      page: 1,
      lengthTest: true
    });
    this.reviewOrRatingData(this.state.currentSortString, filters);
  }

  reviewOrRatingData(val, filters) {
    var data = false;
    var filter = Object.keys(filters);
    var rating = [];
    var count = 0;
    if (val === "") { data = this.state.reviewData; }
    if (val === "relevant") { data = this.state.relevanceData; }
    if (val === "helpful") { data = this.state.helpfulData; }
    if (val === "newest") { data = this.state.newestData; }

    if (filter.length) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].rating === Number(filter[count])) {
          rating.push(data[i]);
        }
        if (i === data.length - 1 && filter[count + 1]) {
          i = 0;
          count++;
        }
      }
    }
    if (rating.length) {
      this.setState({
        mainData: rating
      });
    } else {
      this.setState({
        mainData: data
      });
    }
  }

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
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={3} style={{ maxWidth: 300, position: 'relative', bottom: 45 }}>
            {metaData ? <MetaData meta={metaData} sortByRating={this.sortByRating} filters={filters} changeReviewOrRating={this.changeReviewOrRating} /> : null}
          </Grid>
          <Grid item xs={5} >
            {this.state.mainData ? <ReviewList reviews={this.state.mainData} putHelpful={this.putHelpful} putReport={this.putReport} page={this.state.page} /> : null}
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={12} container direction="row">
            <Grid item xs={6}>
              {lengthTest ? <Button style={{ float: 'right' }} variant="outlined" onClick={() => this.getPaginatedReviews()}>MORE REVIEWS</Button> : null}
            </Grid>
            <Grid item xs={6}>
              {metaData ? <AddAReview style={{ float: 'left' }} postAReview={this.postAReview} meta={metaData} /> : null}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default RatingReviewApp;

// getReviews() {
//   let nextReview = this.state.page + 1;
//   const reviews = axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=2&page=${this.state.page}`);
//   const meta = axios.get(`http://18.224.37.110/reviews/meta/?product_id=${this.state.product_id}`);
//   const next = axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=2&page=${nextReview}`);
//   const all = axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=${3000000}`);
//   axios.all([reviews, meta, next, all, newest, relevance, helpful]).then(axios.spread((...responses) => {
//     console.log(responses[3].data.results)
//     this.setState({
//       reviewData: responses[0].data.results,
//       metaData: responses[1].data,
//       lengthTest: responses[2].data.results.length,
//       page: nextReview,
//       allReviewsCount: responses[3].data.results.length,
//       newestData: responses[4].data.results,
//       relevanceData: responses[5].data.results,
//       helpfulData: responses[6].data.results
//     })
//   }))
//     .catch((err) => {
//       console.log(err);
//     })
// };
// getPaginatedReviews() {
//   let nextReview = this.state.page + 1;
//   const reviews = axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=2&page=${this.state.page}`);
//   const next = axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=2&page=${nextReview}`);
//   axios.all([reviews, next]).then(axios.spread((...responses) => {
//     this.setState({
//       reviewData: [...this.state.reviewData, ...responses[0].data.results],
//       lengthTest: responses[1].data.results.length,
//       page: nextReview
//     })
//     console.log(this.state.reviewData);
//   }))
//     .catch((err) => {
//       console.log(err);
//     })
// };
// sortByRating(num) {
//   console.log(this.state.currentSortString);
//   let result = [],
//     bool = false,
//     ratingData = this.state.ratingData,
//     filter = this.state.filters;

//   const normal = axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=${3000000}`);
//   const sorted = axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=${3000000}&sort=${this.state.currentSortString}`)

//   axios.all([normal, sorted]).then(axios.spread((...responses) => {
//     if (ratingData.length > 0) {
//       for (var i = 0; i < ratingData.length; i++) {
//         if (ratingData[i].rating !== num) {
//           result.push(ratingData[i]);
//           filter[`${ratingData[i].rating} stars`] = true;
//         }
//         if (ratingData[i].rating === num) {
//           delete filter[`${ratingData[i].rating} stars`]
//           bool = true;
//         }
//       }
//     }

// if (!ratingData || !bool) {
//   if (this.state.currentSortString === "") {
//   responses[0].data.results.map((x, i) => {
//     if (x.rating === num) {
//       result.push(x)
//       filter[`${x.rating} stars`] = true;
//     }
//   })
// } else {
//   responses[1].data.results.map((x, i) => {
//     if (x.rating === num) {
//       console.log(x);
//       result.push(x)
//       filter[`${x.rating} stars`] = true;
//     }
//   })
// }
// } if (ratingData && bool && this.state.currentSortString !== "") {
//   console.log("YESS")
//   responses[1].data.results.map((x, i) => {
//     if (x.rating === num) {
//       console.log(x);
//       result.push(x)
//       filter[`${x.rating} stars`] = true;
//     }
//   })
// }

//     if (result.length > 0) {
//       this.setState({
//         ratingData: result,
//         filters: filter
//       })
//     } else {
//       this.setState({
//         ratingData: false,
//         filters: {}
//       })
//     }
//   }))
//     .catch((err) => {
//       console.log(err);
//     })
// };
// reviewOrRatingData() {
//   if (this.state.currentSortString === "") {
//     if (this.state.ratingData) {
//       return <ReviewList reviews={this.state.ratingData} putHelpful={this.putHelpful} putReport={this.putReport} />;
//     } else if (this.state.reviewData) {
//       return <ReviewList reviews={this.state.reviewData} putHelpful={this.putHelpful} putReport={this.putReport} />;
//     } else {
//       return null;
//     }
//   } else {
//     if (this.state.ratingData) {
//       return <ReviewList reviews={this.state.ratingData} putHelpful={this.putHelpful} putReport={this.putReport} />;
//     } else if (this.state.sortedData) {
//       return <ReviewList reviews={this.state.sortedData} putHelpful={this.putHelpful} putReport={this.putReport} />;
//     } else {
//       return null
//     }
//   }
// };

// returnReviewTag(review) {
//   return <ReviewList reviews={review} putHelpful={this.putHelpful} putReport={this.putReport} />;
// }

// reviewOrRatingData() {
//   const { currentSortString, ratingData, reviewData, sortedData } = this.state;
//   const currSortSting = currentSortString === "";

//   if (ratingData) { return this.returnReviewTag(ratingData) };
//   if (currSortSting && reviewData) { return this.returnReviewTag(reviewData) };
//   if (!currSortSting && sortedData) { return this.returnReviewTag(sortedData) };
//   return null;
// };


//CHANGING LENGTH TEST TWICE IS SETTING LENGTHTEST BACK TO FALSE FIND DIFFERENT WAY TO GET LENGTHTEST

// handleChange(e) {
//   if (e.target.value === "") {
//     this.setState({
//       currentSortString: e.target.value,
//       sortedData: false,
//       lengthTest: this.state.secondLengthTest
//     })
//   } else {
//     axios.get(`http://18.224.37.110/reviews/?product_id=${this.state.product_id}&count=${3000000}&sort=${e.target.value}`)
//       .then((data) => {
//         this.setState({
//           sortedData: data.data.results,
//           currentSortString: e.target.value,
//           lengthTest: false,
//           secondLengthTest: this.state.lengthTest
//         })
//         if (this.state.ratingData) {
//           Object.keys(this.state.filters).map((x) => {
//             this.sortByRating(Number(x.split(' ')[0]));
//           })
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   }
// };