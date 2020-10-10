
import React, { Component } from 'react';
import axios from 'axios';
import RatingReviewApp from './RatingsReviews/RatingReviewApp.jsx';
import StarMaker from './RatingsReviews/StarMaker.jsx';
import dummyData from '../../dummyData.js';
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import QandA from './qaComponents/QandA.jsx';
import { Grid } from '@material-ui/core';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    //bind any functions here
    console.log(window.sessionStorage);
  }

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={11}>
            <ProductOverview />
            <QandA />
            <RatingReviewApp num={1} />
          </Grid>
        </Grid>


      </div>
    );
  }
}

export default App;