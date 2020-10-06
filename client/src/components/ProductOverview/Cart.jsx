import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Button} from '@material-ui/core';
import CartList from './CartList.jsx';

var Cart = ({cart, skus}) => {
  return (
    <Grid container>
      <Grid item xs={3}>

      </Grid>
      <Grid item xs={6}>

        <div id='cartBox'>
          Your Cart:
          {cart !== [] ? <CartList cart={cart} skus={skus} /> : null}
        </div>
      </Grid>
      <Grid item xs={3}>

      </Grid>

    </Grid>
  );
};

export default Cart;