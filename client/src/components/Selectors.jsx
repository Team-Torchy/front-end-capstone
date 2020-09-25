import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Select from 'react-select';

const Selectors = ({data}) => {

  if (!data) { return null; }

  // console.log('Data: ', data);
  var options = Object.values(data.skus).map(sku => {
    return sku;
  });

  var valuesSize = options.map(option => {
    return {'value': option.size, 'label': option.size};
  });

  var valuesQty = options.map(option => {
    return {'value': option.quantity, 'label': option.quantity};
  });

  console.log('Sizes: ', valuesSize);

  console.log('Options: ', options);

  return (
    <Grid container>
      <Grid item xs={7}>
        <Select options={valuesSize} />
      </Grid>
      <Grid item xs={5}>
        <Select options={valuesQty} />
      </Grid>
    </Grid>
  );
};

export default Selectors;