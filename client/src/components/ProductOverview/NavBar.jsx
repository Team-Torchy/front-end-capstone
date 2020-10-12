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
    e.preventDefault();
    var showCart = !this.state.showCart;
    this.setState({
      showCart
    });
  }

  render() {
    return (
      <Grid container id="NavBar" style={{ 'background': '#0D1B2A', 'height': '50px' }}>
        <Grid item xs={12}>
          <span className="nav">
            <Grid item xs={10}>
            Torchy's Haberdashery
            </Grid>
            <Grid item xs={2} >
              <Button id='cart' onClick={this.handleShow.bind(this)}>
                <ShoppingCart id="cartButton" style={{'fill': 'white'}}></ShoppingCart>
              </Button>
            </Grid>
          </span>
          <div id='cartContainer' style={
            this.state.showCart ? {'display': 'block'} : {'display': 'none'}
          }
          ><p id='close' onClick={this.handleShow.bind(this)}>X</p>
            <Cart cart={this.props.cart} remove={this.props.remove} sku={this.props.sku}/>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default NavBar;