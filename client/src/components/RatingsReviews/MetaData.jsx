import React from 'react';
import { Typography, Divider, Grid, Button, Box } from '@material-ui/core';
import StarMaker from './StarMaker.jsx';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale, Stack, HoverState, EventTracker } from '@devexpress/dx-react-chart';

const MetaData = (props) => {
  console.log("WE INSIDE OF META");
  const averageCalculator = (ratings) => {
    var starTotal = 0,
      voteTotal = 0,
      chart = {};
    for (var i = 1; i <= 5; i++) {
      if (ratings[i]) {
        starTotal += ratings[i] * i;
        voteTotal += ratings[i];
      }
    }
    return JSON.stringify(starTotal / voteTotal).slice(0, 3);
  };

  const recommendedCalculator = (data) => {
    if (!data[0]) {
      return "100%";
    } else if (!data[1]) {
      return "0%";
    } else {
      return JSON.stringify(~~((data[1] / (data[0] + data[1])) * 100)) + "%";
    }
  };

  const chartDataCalculator = (data) => {
    var chart = {},
      result = [];
    for (var i = 1; i <= 5; i++) {
      if (data[i]) {
        chart[i] = data[i];
      } else {
        chart[i] = 0;
      }
    }

    var total = chart[1] + chart[2] + chart[3] + chart[4] + chart[5];

    for (var j = 1; j <= 5; j++) {
      result.push({ star: `${j} stars`, rating: chart[j], empty: total - chart[j], placeHolder: 0 });
    }

    return result;
  };
  const onArgumentAxisClick = () => { console.log("hello") };
  return (
    <div>
      <Grid container spacing={1} direction="row">

        <Grid item xs={12}>
          <Typography variant="subtitle1">RATINGS & REVIEWS</Typography>
        </Grid>

        <Grid item xs={5}>
          <Typography variant="h2">{averageCalculator(props.meta.ratings)}</Typography>
        </Grid>

        <Grid item xs={7}>
          <StarMaker rating={Number(averageCalculator(props.meta.ratings))} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2">{recommendedCalculator(props.meta.recommended)} of reviews recommend this product</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" color="textSecondary">Rating Breakdown</Typography>
        </Grid>

        {/* <Grid item xs={2} style={{postion: "relative", right:"40px"}}>
          <Typography variant="caption">something</Typography>
        </Grid> */}
        <Grid item xs={2} container direction="row" space={1}>
          <Grid item xs={12} style={{ maxWidth: 70, maxHeight: 162, position: "relative", top: 3}} container direction="row" space={1}>
            <Grid item xs={12}>
              <Typography style={{ whiteSpace: "nowrap" }} variant="caption">5 stars</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography style={{ whiteSpace: "nowrap" }} variant="caption">4 stars</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography style={{ whiteSpace: "nowrap" }} variant="caption">3 stars</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography style={{ whiteSpace: "nowrap" }} variant="caption">2 stars</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography style={{ whiteSpace: "nowrap" }} variant="caption">1 stars</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={10}>
          <Chart
            data={chartDataCalculator(props.meta.ratings)}
            rotated
            height={180}
            style={{ position: 'relative', right: 10, bottom: 10 }}
          >
            {/* <ArgumentAxis/> */}

            <BarSeries
              name="rating"
              valueField="rating"
              argumentField="star"
              barWidth={.5}
              color='green'
            />
            <EventTracker />
            <Tooltip />

            <BarSeries
              name="empty"
              valueField="empty"
              argumentField="star"
              barWidth={.5}
              color="grey"
            />


            {/* <EventTracker
            />

            <HoverState
              onHoverChange={() => { console.log() }}
            /> */}

            <Stack
              stacks={[
                { series: ['rating', 'empty', 'placeHolder'] },
              ]}
            />
          </Chart>
        </Grid>

        {/* <Grid item xs={1}>
          <Typography variant="caption">something</Typography>
        </Grid> */}
      </Grid>
    </div>
  )
}

export default MetaData;