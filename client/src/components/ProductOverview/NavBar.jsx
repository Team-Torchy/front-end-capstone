import React from 'react';
import { ShoppingCart } from '@material-ui/icons/'
import { Grid, Button } from '@material-ui/core/'

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <Grid container id="NavBar" style={{ 'background': 'darkgray', 'height': '50px' }}>
        <Grid item xs={12}>
          <span className="nav"><Button id='cart'><ShoppingCart></ShoppingCart></Button></span>
        </Grid>
      </Grid>
    );
  }
}

export default NavBar;