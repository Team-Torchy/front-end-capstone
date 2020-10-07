import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Button} from '@material-ui/core';
import CartList from './CartList.jsx';

var Cart = ({ cart }) => {
  return (
    <Grid container >
      <Grid item xs={3}>

      </Grid>
      <Grid item xs={6} id='cartItems'>

        <div id='cartBox'>
          Your Cart:
          {cart !== [] ? <CartList cart={cart} /> : null}
        </div>
      </Grid>
      <Grid item xs={3}>

      </Grid>

    </Grid>
  );
};

export default Cart;