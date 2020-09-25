import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import StyleList from './StyleList.jsx';
import axios from 'axios';
import FeaturesList from './FeaturesList.jsx';
import Selectors from './Selectors.jsx';

const apiURL = 'http://18.224.37.110';
const testStyles = [{ 'id': 0, 'name': 'test1', 'url': 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg' }, { 'id': 1, 'name': 'test2', 'url': 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg' }, { 'id': 2, 'name': 'test3', 'url': 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg' }, { 'id': 3, 'name': 'test4', 'url': 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg' }];

const dummyData = [
  {
		'id': 1,
		'name': 'Camo Onesie',
		'slogan': 'Blend in to your crowd',
		'description': 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
		'category': 'Jackets',
    'default_price': '140',
    'features': [
      {
        'feature': 'Sole',
        'value': 'Rubber'
      },
      {
        'feature': 'Material',
        'value': 'FullControlSkin'
      },
      // ...
    ],
	},
  {
		'id': 2,
		'name': 'Bright Future Sunglasses',
		'slogan': 'You\'ve got to wear shades',
		'description': 'Where you\'re going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.',
		'category': 'Accessories',
		'default_price': '69'
	},
  {
		'id': 3,
		'name': 'Morning Joggers',
		'slogan': 'Make yourself a morning person',
		'description': 'Whether you\'re a morning person or not. Whether you\'re gym bound or not. Everyone looks good in joggers.',
		'category': 'Pants',
		'default_price': '40'
	},
	// ...
];

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 1,
      productData: {},
      styleList: [],
      styleSelectedId: 0,
    };
    this.handleStyleSelect.bind(this);
  }

  componentDidMount() {
    this.getProductData();
    this.getStylesForProduct();
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

  getStylesForProduct() {
    axios.get(`${apiURL}/products/${this.state.productId}/styles`)
      .then(res => {
        console.log(res.data.results);

        this.setState({
          styleList: res.data.results,
          styleSelectedId: 1
        });
      });
  }

  setStyle(id) {
    this.setState({
      styleSelectedId: id
    });
  }

  getImagesForProduct() {

  }

  updateBorder(style) {
    style.style = 'border: 4px solid blue';
  }

  handleStyleSelect(e) {
    console.log(e.target.id);
    this.setStyle(e.target.id);
  }

  render() {
    return (

      <Grid
        container
        cols={2}
        spacing={3}
        id="OverviewContainer"
      >
        <Grid container id="NavBar" style={{ 'background': 'darkgray', 'height': '50px' }}>
          <Grid item xs={12}>
            <span className="nav">navbar</span>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <img className="image" id="mainImage" src={this.state.productImg} /><br />
        </Grid>

        <Grid item xs={5}>
          <p className="info" id='ratings'>***** read all reviews</p>
          <p className="info" id='category'> {'Category >'} {this.state.productData.category}</p>
          <h1>{this.state.productData.name}</h1>
          <p className="info" id="price">${this.state.productData.default_price}</p>
          <p className='info' id='style'>{'Style >'}  </p>
          <p className="info" id="styleCategory">{this.state.productData.style}</p> <br />
          <StyleList styleList={this.state.styleList} handleSelect={this.handleStyleSelect.bind(this)} setStyle={this.setStyle.bind(this)}/>
          <Selectors data={this.state.styleList[this.state.styleSelectedId]} />
        </Grid>
        <Grid container padding={3}>
          <Grid m={3} item xs={8}>
            <h3 className="desc" id="slogan">{this.state.productData.slogan}</h3>
            <p className="desc" id="description">{this.state.productData.description}</p>
          </Grid>
          <Grid item xs={4} id="SpecialOverview">
            <FeaturesList features={this.state.productData.features}/>
          </Grid>

        </Grid>

      </Grid>
    );
  }
}

export default ProductOverview;