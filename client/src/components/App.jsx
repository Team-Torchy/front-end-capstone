import React, {Component} from 'react';
import ProductOverview from './ProductOverview.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    //bind any functions here
  }

  //Methods here


  render() {
    return(
      <div>
        <ProductOverview />
      </div>
    )
  }
};

export default App;