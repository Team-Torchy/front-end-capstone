
import React, { Component } from 'react';
import axios from 'axios';
import RatingReviewApp from './RatingsReviews/RatingReviewApp.jsx';
import StarMaker from './RatingsReviews/StarMaker.jsx';

import ProductOverview from './ProductOverview.jsx';


import QandA from './qaComponents/QandA.jsx';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    //bind any functions here
  }

  render() {
    return (
      <div>

        <ProductOverview />
        <QandA />
        <RatingReviewApp dummyData={this.state.dummyData} />

      </div>
    );
  }
}

export default App;