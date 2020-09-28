import React, {Component} from 'react';

import ProductOverview from './ProductOverview.jsx';


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

        <ProductOverview />
        <QandA />

      </div>
    );
  }
}

export default App;