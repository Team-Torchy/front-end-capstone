import React from 'react';
import Button from '@material-ui/core/Button';

const ProductOverview = (props) => {
  return (
    <div className="container">
      <div className="image" id='mainImage'>
        <img className="image" src="https://thumbs.dreamstime.com/b/soccer-meadow-score-115727331.jpg" /><br />
      </div>

      <div className="product">
        <p className="info" id='ratings'>***** read all reviews</p>
        <p className="info" id='category'>Product Category</p>
      </div>
        <h1>This is the Product Title</h1>
        <p className="info" id="price">$999</p>
        <p className='info' id='style'>Style >  </p>
        <p className="info" id="styleCategory">Style Selected</p>
    </div>
  );
}

export default ProductOverview;