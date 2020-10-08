
import React, { Component } from 'react';
import axios from 'axios';
import RatingReviewApp from './RatingsReviews/RatingReviewApp.jsx';
import StarMaker from './RatingsReviews/StarMaker.jsx';
import dummyData from '../../dummyData.js';
import ProductOverview from './ProductOverview/ProductOverview.jsx';
import QandA from './qaComponents/QandA.jsx';
import {useCookies, Cookies, withCookies, setCookie} from 'react-cookie';




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

        <ProductOverview />
        <QandA />
        <RatingReviewApp num={3} />

      </div>
    );
  }
}

export default App;