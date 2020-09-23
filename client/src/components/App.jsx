import React, {Component} from 'react';
import QandA from './QandA.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      questionsAndAnswers: []
    };
    //bind any functions here
  }

  //Methods here


  render() {
    return (
      <div>
        <h1>we are rendering react!!</h1>
        <QandA />
      </div>
    );
  }
}

export default App;