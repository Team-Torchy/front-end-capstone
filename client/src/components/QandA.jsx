import React from 'react';
import TextField from '@material-ui/core/TextField';

const QandA = (props) => {

  return (
    <div>
      <h4>QUESTIONS {'&'} ANSWERS</h4>
      <form>
        <TextField
          variant="outlined"
          placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
          helperText="Full width!"
          fullWidth
        />
      </form>
    </div>
  );
}


export default QandA;