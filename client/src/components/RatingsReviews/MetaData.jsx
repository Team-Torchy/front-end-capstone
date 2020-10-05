import React from 'react';
import { Typography, Divider, Grid, Button, Box } from '@material-ui/core';
import StarMaker from './StarMaker.jsx';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';

const MetaData = (props) => {
  const averageCalculator = (ratings) => {
    return Math.round(((ratings[1] + ratings[2] * 2 + ratings[3] * 3 + ratings[4] * 4 + ratings[5] * 5) / (ratings[1] + ratings[2] + ratings[3] + ratings[4] + ratings[5])) * 10) / 10;
  }
  const data = [
    {star: '5 stars', rating: props.meta.ratings[5]},
    {star: '4 stars', rating: props.meta.ratings[4]},
    {star: '3 stars', rating: props.meta.ratings[3]},
    {star: '2 stars', rating: props.meta.ratings[2]},
    {star: '1 stars', rating: props.meta.ratings[1]},
  ];

  return (
    <div>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Typography variant="subtitle1">RATINGS & REVIEWS</Typography>
        </Grid>

        <Grid item xs={5}>
          <Typography variant="h2">{averageCalculator(props.meta.ratings)}</Typography>
        </Grid>

        <Grid item xs={7}>
          {/* {console.log(props.)} */}
          <StarMaker rating={averageCalculator(props.meta.ratings)} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2">{~~((props.meta.recommended[1] / (props.meta.recommended[0] + props.meta.recommended[1])) * 100)}% of reviews recommend this product</Typography>
        </Grid>

        <Grid item xs={12}>


        <Chart
          data={data}
          rotated
          height={180}
        >
          <ArgumentAxis />
          {/* <ValueAxis max={5} /> */}

          <BarSeries
            valueField="rating"
            argumentField="star"
            barWidth= {.2}
            color= 'grey'
          />


        </Chart>

        </Grid>

        {/* <Grid item xs={12}>
          bar
        </Grid>

        <Grid item xs={12}>
          bar
        </Grid>

        <Grid item xs={12}>
          bar
        </Grid> */}

      </Grid>

    </div>
  )
}

export default MetaData;