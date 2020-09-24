import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import StyleList from './StyleList.jsx'
const testStyles = [{ 'id': 0, 'name': 'test', 'url': 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg' }, { 'id': 1, 'name': 'test', 'url': 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg' }, { 'id': 2, 'name': 'test', 'url': 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg' }, { 'id': 3, 'name': 'test', 'url': 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg' }]

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
      .style = "border: 4px solid blue"
  }

  handleStyleSelect(e) {
    // console.log(e.target)
    this.state.styleSelected
      .style = "border: none"

    this.setState({
      styleSelected: e.target
    }, () => {
      // console.log(this.state.styleSelected)
      this.updateBorder()
    })

  }

  render() {
    return (

      <Grid
        container
        cols={2}
        spacing={3}
        id="OverviewContainer"
      >
        <Grid container id="NavBar" style={{ "background": "darkgray", "height": "50px" }}>
          <Grid item xs={12}>
            <span className="nav">navbar</span>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <img className="image" id="mainImage" src="https://thumbs.dreamstime.com/b/soccer-meadow-score-115727331.jpg" /><br />
        </Grid>

        <Grid item xs={5} style={{ "background": "lightblue" }}>
          <p className="info" id='ratings'>***** read all reviews</p>
          <p className="info" id='category'>Product Category</p>
          <h1>This is the Product Title</h1>
          <p className="info" id="price">$999</p>
          <p className='info' id='style'>Style >  </p>
          <p className="info" id="styleCategory">Style Selected</p> <br />
          <StyleList styleList={this.state.styleList} handleSelect={this.handleStyleSelect.bind(this)} />
        </Grid>
        <Grid container style={{ "background": "red" }} padding={3}>
          <Grid m={3} item xs={8}>
            <h3 className="desc" id="slogan">Witty description!</h3>
            <p className="desc" id="description">This is the product description!</p>
          </Grid>
          <Grid item xs={4} id="SpecialOverview">
            <ul>
              <li>x FILLER info</li>
              <li>x FILLER info</li>
              <li>x FILLER info</li>
              <li>x FILLER info</li>
            </ul>
          </Grid>

        </Grid>

      </Grid>



      // <div className="container">
      //   <section className="image" id='mainImage'>
      //   </section>

      //   <br />
      //   <section className="product-desc" >
      //   </section>
      // </div>
    );
  }
}

export default ProductOverview;