import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SingleQA from './SingleQA.jsx';
import Grid from '@material-ui/core/Grid';
import { spacing } from '@material-ui/system';

const QandA = (props) => {

  return (
    <div>
      <Grid container spacing={2} direction="column">
        <Grid item xs={12} container>
          <Grid item xs={4}>QUESTIONS {'&'} ANSWERS</Grid>
          <TextField
            variant="outlined"
            placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
            fullWidth
          />
        </Grid>
        <SingleQA />
        <Grid item xs={6} container spacing={2}>
          <Button mx={2} variant="contained">MORE ANSWERED QUESTIONS</Button>
          <Grid item xs={1} />
          <Button variant="contained">ADD A QUESTION +</Button>
        </Grid>
      </Grid>
    </div>
  );
};


export default QandA;

{/* <h4>QUESTIONS {'&'} ANSWERS</h4>
<form>
  <TextField
    variant="outlined"
    placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
    fullWidth
  />
  <SingleQA />
  <Button variant="contained">MORE ANSWERED QUESTIONS</Button>
  <Button variant="contained">ADD A QUESTION +</Button>
</form> */}