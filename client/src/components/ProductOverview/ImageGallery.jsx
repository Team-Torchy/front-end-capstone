import React from 'react';
import { Grid } from '@material-ui/core';
import GallerySelectors from './GallerySelectors.jsx';

class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <Grid container>
        <Grid item xs={12} >
          <img className="image" id="mainImage" src={this.props.img} />
        </Grid>
        <Grid item xs={3} >
          <GallerySelectors />
        </Grid>
      </Grid>
    );
  }
}

export default ImageGallery;