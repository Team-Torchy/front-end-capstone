import React from 'react';
import Cart from './Cart.jsx';
import { ShoppingCart } from '@material-ui/icons/';
import { Grid, Button, Modal } from '@material-ui/core/';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false
    };
  }

  handleShow(e) {
    var showCart = !this.state.showCart;
    this.setState({
      showCart
    });
  }

  render() {
    return (
      <Grid container id="NavBar" style={{ 'background': 'darkgray', 'height': '50px' }}>
        <Grid item xs={12}>
          <span className="nav"><Button id='cart' onClick={this.handleShow.bind(this)}><ShoppingCart></ShoppingCart></Button></span>
          <div id='cartContainer' style={
            this.state.showCart ? {'display': 'block'} : {'display': 'none'}
          }
          onClick={this.handleShow.bind(this)}
          >
            <Cart cart={this.props.cart} skus={this.props.skus} skuList={this.props.skuList}/>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default NavBar;