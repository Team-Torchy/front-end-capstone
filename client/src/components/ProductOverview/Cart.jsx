import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Button} from '@material-ui/core';
import CartList from './CartList.jsx';

var Cart = ({ cart, remove }) => {
  return (
    <Grid container >
      <Grid item xs={3}>

      </Grid>
      <Grid item xs={6} >

        <div id='cartBox' className='cartList'>
          Your Cart:
          {cart !== [] ? <CartList cart={cart} remove={remove}/> : <p>Cart Empty!</p>}
        </div>
      </Grid>
      <Grid item xs={3}>

      </Grid>

    </Grid>
  );
};

export default Cart;