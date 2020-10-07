import React from 'react';
import { Grid } from '@material-ui/core';

var testURL = 'https://pbs.twimg.com/profile_images/949787136030539782/LnRrYf6e_400x400.jpg';

const GallerySelectors = (props) => {
  // console.log(props.data)
  return (
    <Grid container>
      <Grid item id='overlay'>
        {props.data.map((img) => {
          // console.log(props)
          return (
            <div className='selector' key={props.data.indexOf(img)}>
              <img className='galleryImage' data-imgurl={img.url} src={img.thumbnail_url} onClick={props.changeImg}></img> <br />
            </div>
          );
        })}
      </Grid>
    </Grid>
  );
};

export default GallerySelectors;