import React, {Component} from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import dummyData from '/Users/alecbrock/front-end-capstone/client/dummyData.js';
import ReviewList from './ReviewList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyData: false,
      num: 1,
      id: 0
    }
    //bind any functions here
    this.nextTwo = this.nextTwo.bind(this);
  }
  componentDidMount() {
    this.getReviews();
  }
  //Methods here
  getReviews() {
    axios.get(`/reviews/${this.state.id}`)
    .then((reviews) => {
      this.setState({
        dummyData
      })
    })
    .catch((error) => {
      console.log(error);
    })
  };

  nextTwo() {
    this.setState({
      num: this.state.num += 2
    })
  }

  nextConditional() {
    const { dummyData, num } = this.state;
    if(dummyData && dummyData.results.length > 2) {
      if(dummyData.results[num] || dummyData.results[num - 1]) {
        return <button onClick={() => this.nextTwo()}>NEXT REVIEWS</button>;
      } else {
        return null;
      }
    }
  };

  render() {
    const { dummyData, num } = this.state;
    return(
      <div>
        {dummyData ? <ReviewList reviews={dummyData} num={num} /> : null}
        {this.nextConditional()}
      </div>
    )
  }
};

export default App;