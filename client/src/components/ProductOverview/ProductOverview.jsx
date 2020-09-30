import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import StyleList from './StyleList.jsx';
import axios from 'axios';
import FeaturesList from './FeaturesList.jsx';
import Selectors from './Selectors.jsx';
import StarMaker from '../RatingsReviews/StarMaker.jsx';
import ImageGallery from './ImageGallery.jsx';
import NavBar from './NavBar.jsx';

const apiURL = 'http://18.224.37.110';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 1,
      skuId: 1,
      productData: {},
      styleList: [],
      styleSelectedId: 0,
      imgURL: '',
      styleName: '',
      price: 0,
      review: 0,
      galleryImages: [],
      cart: []
    };
    this.handleStyleSelect.bind(this);
  }

  componentDidMount() {
    this.getProductData();
    this.getStylesForProduct();
    this.getImagesForProduct();
    this.getReviewAverage();
  }

  addToCart() {
    console.log('add to cart', this.state.productId)
  }

  getProductData() {
    axios.get(`${apiURL}/products/${this.state.productId}`)
      .then((res) => {
        // console.log(res.data)
        this.setState({
          productData: res.data
        });
      })
      .then(() => {
        console.log(this.state.productData);
      });
  }

  getReviewAverage() {
    axios.get(`${apiURL}/reviews/?product_id=${this.state.productId}`)
      .then(res => {

        var results = res.data.results.map(result => {
          return result.rating;
        });

        var total = 0;
        for (var i = 0; i < results.length; i++) {
          total += results[i];
        }
        total = total / 5;
        // console.log('stars', total);
        this.setState({
          review: total
        });
      });
  }

  getStylesForProduct() {
    axios.get(`${apiURL}/products/${this.state.productId}/styles`)
      .then(res => {
        console.log(res.data.results);

        this.setState({
          styleList: res.data.results,
          styleSelectedId: 1,
          imgURL: res.data.results[0].photos[0].url,
          styleName: res.data.results[0].name
        }, () => {
          this.setState({
            galleryImages: this.state.styleList[this.state.styleSelectedId - 1].photos
          })
        });
      });
  }

  setStyle(id) {
    this.setState({
      styleSelectedId: id - 1,
      imgURL: this.state.styleList[id - 1].photos[0].url,
      styleName: this.state.styleList[id - 1].name
    }, () => {
      this.setState({
        galleryImages: this.state.styleList[this.state.styleSelectedId].photos
      })
    });
  }

  getImagesForProduct() {
    if (this.state.styleList[this.state.styleSelectedId]) {
      this.setState({
        imgURL: this.state.styleList[this.state.styleSelectedId].photos[0].url
      });
    }
  }

  handleStyleSelect(e) {
    // console.log(e.target.id);
    this.setStyle(e.target.id);

  }

  changeImage(e) {
    // console.log(e.target.getAttribute('data-imgurl'))
    this.setState({
      imgURL: e.target.getAttribute('data-imgurl')
    })
  }

  updatePrice(price) {
    this.setState({
      price
    });
  }

  render() {
    return (

      <Grid
        container
        cols={2}
        spacing={3}
        id="OverviewContainer"
      >
        <NavBar />

        <Grid item id='gallery' xs={6}>
          <ImageGallery data={this.state.galleryImages} img={this.state.imgURL} changeImg={this.changeImage.bind(this)} />
          <br />
        </Grid>

        <Grid item xs={5}>
          <p className="info" id='ratings'><StarMaker rating={this.state.review}/></p>
          <p className="info" id='category'> {'Category >'} {this.state.productData.category}</p>
          <h1>{this.state.productData.name}</h1>
          <p className="info" id="price">${this.state.price}</p>
          <p className='info' id='style'>{'Style >'}  </p>
          <p className="info" id="styleCategory">{this.state.styleName}</p> <br />
          <StyleList styleList={this.state.styleList} handleSelect={this.handleStyleSelect.bind(this)} setStyle={this.setStyle.bind(this)} />
          {this.state.styleList[this.state.styleSelectedId] ? <Selectors data={this.state.styleList[this.state.styleSelectedId - 1]} style={this.state.styleName} updatePrice={this.updatePrice.bind(this)} addToCart={this.addToCart.bind(this)}/> : null }
        </Grid>
        <Grid container padding={3}>
          <Grid m={3} item xs={8}>
            <h3 className="desc" id="slogan">{this.state.productData.slogan}</h3>
            <p className="desc" id="description">{this.state.productData.description}</p>
          </Grid>
          <Grid item xs={4} id="SpecialOverview">
            <FeaturesList features={this.state.productData.features} />
          </Grid>

        </Grid>

      </Grid>
    );
  }
}

export default ProductOverview;