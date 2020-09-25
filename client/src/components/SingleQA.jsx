import React from 'react';
import Grid from '@material-ui/core/Grid';

const SingleQA = (props) => {

  return (
    <div>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} container justify="space-between">
          <Grid item xs={8}>Q: Does this make me look awesome?</Grid>
          <Grid item xs={4}>Helpful? Yes (25) | Add Answer</Grid>
        </Grid>
        <Grid item xs={12} container direction="column" justify="flex-start">
          <Grid item xs={8} py={1}>A: It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Grid>
          <Grid item xs={6}>by User1, January 1, 2019  |  Helpful? Yes (9)  |  Report</Grid>
        </Grid>
        <Grid item xs={12} container justify="space-between">
          <Grid item xs={8}>Q: Am I too good looking in this thing?</Grid>
          <Grid item xs={4}>Helpful? Yes (38) | Add Answer</Grid>
        </Grid>
        <Grid item xs={12} container direction="column" justify="flex-start">
          <Grid item xs={8} py={1}>A: Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Grid>
          <Grid item xs={6}>by User2, December 7, 2020  |  Helpful? Yes (2)  |  Report</Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleQA;