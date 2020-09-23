import React from 'react';
import Button from '@material-ui/core/Button';
import StyleList from './StyleList.jsx'
const testStyles = [{'id': 0, 'name': 'test', 'url': 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg'}, {'id': 1, 'name': 'test', 'url': 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg'}, {'id': 2, 'name': 'test', 'url': 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg'}, {'id': 3, 'name': 'test', 'url': 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg'}]

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styleList: testStyles,
      styleSelected: {},
    }
    this.handleStyleSelect.bind(this);
  }

  updateBorder() {
    this.state.styleSelected
      .style="border: 4px solid blue"
  }

  handleStyleSelect(e) {
    // console.log(e.target)
      this.state.styleSelected
        .style="border: none"

      this.setState({
        styleSelected: e.target
      }, () => {
        // console.log(this.state.styleSelected)
        this.updateBorder()
      })

  }

  render() {
    return (
      <div className="container">
        <div className="image" id='mainImage'>
          <img className="image" src="https://thumbs.dreamstime.com/b/soccer-meadow-score-115727331.jpg" /><br />
        </div>

        <div className="product">
          <p className="info" id='ratings'>***** read all reviews</p>
          <p className="info" id='category'>Product Category</p>
          <h1>This is the Product Title</h1>
          <p className="info" id="price">$999</p>
          <p className='info' id='style'>Style >  </p>
          <p className="info" id="styleCategory">Style Selected</p> <br />
         <StyleList styleList={this.state.styleList} handleSelect={this.handleStyleSelect.bind(this)} />
        </div>
      </div>
    );
  }
}

export default ProductOverview;