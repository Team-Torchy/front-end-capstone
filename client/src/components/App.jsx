import React, { Component } from 'react';
import axios from 'axios';
import dummyData from '/Users/alecbrock/front-end-capstone/client/dummyData.js';
import RatingReviewApp from './RatingsReviews/RatingReviewApp.jsx';
import StarMaker from './RatingsReviews/StarMaker.jsx';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyData
    }
    //bind any functions here
  }


  render() {
    return (
      <div>
        <RatingReviewApp dummyData={this.state.dummyData} />
      </div>
    )
  }
};

export default App;