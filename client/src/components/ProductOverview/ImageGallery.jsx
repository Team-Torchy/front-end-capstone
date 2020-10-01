import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Fullscreen } from '@material-ui/icons';
import GallerySelectors from './GallerySelectors.jsx';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullscreen: false
    };
  }

  componentDidMount() {
    // console.log(this.props.changeImg)
  }

  changeView() {
    var bool = this.state.fullscreen
    console.log(!bool)
    this.setState({
      fullscreen: !bool
    }, console.log(this.state));
  }

  render() {
    if (this.state.fullscreen) {
      return (
        <Grid container id='fullscreen'>
          <Grid id='fullscreenContainer' item xs={12} >
            <img className='fullscreenImage' src={this.props.img} />
          </Grid>
          <Grid item xs={3} >
            <GallerySelectors data={this.props.data} changeImg={this.props.changeImg} />
            <Button className='fsButtonfs' id='overlay' onClick={this.changeView.bind(this)}><Fullscreen /></Button>
          </Grid>
        </Grid>
      )
    } else {
      return (
        <Grid container>
          <Grid id='imageContainer' item xs={12} >
            <img className="image" id="mainImage" src={this.props.img} />
          </Grid>
          <Grid item xs={3} >
            <GallerySelectors data={this.props.data} changeImg={this.props.changeImg} />
            <Button className='fsButton' id='overlay' onClick={this.changeView.bind(this)}><Fullscreen /></Button>
          </Grid>
        </Grid>
      );
    }
  }
}

export default ImageGallery;