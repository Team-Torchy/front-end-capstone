import React, { useState } from 'react';
import StarMaker from './StarMaker.jsx';
import { Typography, Divider, Grid, Button, Box } from '@material-ui/core';
import { Chart, BarSeries } from '@devexpress/dx-react-chart-material-ui';
import { Stack } from '@devexpress/dx-react-chart';

const MetaData = (props) => {
  const [hovered, setHovered] = useState({ hovered: false });

  const onMouseEnter = e => {
    setHovered({ hovered: e });
  };

  const onMouseLeave = e => {
    setHovered({ hovered: false });
  };

  const averageCalculator = (ratings) => {
    let starTotal = 0,
      voteTotal = 0,
      chart = {};
    for (let i = 1; i <= 5; i++) {
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

  const currentFilters = () => {
    return (
      Object.keys(props.filters).map((x, i) => (
        <Grid item xs={12} key={i}>
          <Typography variant="caption">{x}</Typography>
        </Grid>
      ))
    )
  };

  const chartDataCalculator = (data) => {
    let chart = {};

    for (let i = 1; i <= 5; i++) {
      if (data[i]) {
        chart[i] = data[i];
      } else {
        chart[i] = 0;
      }
    }

    let total = chart[1] + chart[2] + chart[3] + chart[4] + chart[5];

    const style1 = hovered.hovered === 1 ? { color: "red", textDecoration: 'underline' } : {};
    const style2 = hovered.hovered === 2 ? { color: "red", textDecoration: 'underline' } : {};
    const style3 = hovered.hovered === 3 ? { color: "red", textDecoration: 'underline' } : {};
    const style4 = hovered.hovered === 4 ? { color: "red", textDecoration: 'underline' } : {};
    const style5 = hovered.hovered === 5 ? { color: "red", textDecoration: 'underline' } : {};

    const func = (x) => {
      if (x === 1) {
        return style1;
      } else if (x === 2) {
        return style2;
      } else if (x === 3) {
        return style3;
      } else if (x === 4) {
        return style4;
      } else {
        return style5;
      }
    };

    return (
      <Grid item xs={12} space={1}>
        {Object.keys(chart).map((x) => {
          let result = [];
          result.push({ star: `${x} stars`, rating: chart[x], empty: total - chart[x] });
          return (
            <Grid onMouseEnter={() => onMouseEnter(Number(x))} onMouseLeave={() => onMouseLeave()} item xs={12} container onClick={() => props.sortByRating(Number(x))} key={x} style={{ maxHeight: 30 }}>
              <Grid item xs={2} style={{ position: 'relative', top: 2 }}>
                <Typography style={func(Number(x))} variant="caption">{`${x} stars`}</Typography>
              </Grid>
              <Grid item xs={9}>
                <Chart
                  data={result}
                  rotated
                  height={49}
                  style={{ position: 'relative', right: 10, bottom: 10 }}
                >
                  <BarSeries
                    name="rating"
                    valueField="rating"
                    argumentField="star"
                    barWidth={.5}
                    color='green'
                  />

                  <BarSeries
                    name="empty"
                    valueField="empty"
                    argumentField="star"
                    barWidth={.5}
                    color="grey"
                  />
                  <Stack
                    stacks={[
                      { series: ['rating', 'empty'] },
                    ]}
                  />
                </Chart>
              </Grid>
              <Grid item xs={1} style={{ position: 'relative', top: 2 }}>
                <Typography style={func(Number(x))} variant="caption">{chart[x]}</Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    )
  };
  const { filters } = props;
  const { ratings, recommended } = props.meta;

  return (
    <div>
      <Grid container spacing={1} direction="row">

        <Grid item xs={12}>
          <Typography variant="subtitle1">RATINGS & REVIEWS</Typography>
        </Grid>

        <Grid item xs={5}>
          <Typography variant="h2">{averageCalculator(ratings)}</Typography>
        </Grid>

        <Grid item xs={7}>
          <StarMaker rating={Number(averageCalculator(ratings))} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2">{recommendedCalculator(recommended)} of reviews recommend this product</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="caption" color="textSecondary">Rating Breakdown</Typography>
        </Grid>
        {Object.keys(filters).length > 0 ? <Grid item xs={12}> {currentFilters()} </Grid> : null}
        {Object.keys(filters).length > 0 ? <Typography variant="caption" onClick={() => props.changeReviewOrRating()}>clear filters</Typography> : null}
        {chartDataCalculator(ratings)}
      </Grid>
    </div>
  )
}

export default MetaData;