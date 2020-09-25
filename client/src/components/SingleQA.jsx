import React from 'react';
import Grid from '@material-ui/core/Grid';

const SingleQA = (props) => {

  return (
    <div>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} container justify="space-between">
          <Grid item xs={4}>Q: Does this make me look awesome?</Grid>
          <Grid item xs={4}>Helpful? Yes (25) | Add Answer</Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleQA;