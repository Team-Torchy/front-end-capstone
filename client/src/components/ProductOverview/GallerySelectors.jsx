import React from 'react';
import { Grid } from '@material-ui/core';

var testURL = 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg';

const GallerySelectors = (props) => {
  return (
    <Grid id='overlay'>
      <img className='selector' src={testURL} /><br />
      <img className='selector' src={testURL} /><br />
      <img className='selector' src={testURL} /><br />
      <img className='selector' src={testURL} /><br />
      <img className='selector' src={testURL} /><br />
    </Grid>
  );
};

export default GallerySelectors;