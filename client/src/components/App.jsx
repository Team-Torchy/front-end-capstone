import React, {Component} from 'react';
import QandA from './qaComponents/QandA.jsx';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    //bind any functions here
  }

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