import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Select from 'react-select';

class Selectors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      sizes: undefined,
      size: '',
      quantity: 0,
      quantities: [],
      currentSku: 1
    };
  }

  componentDidMount() {
    this.setSelectors();
    this.props.updatePrice(this.props.data.sale_price > 0 ? this.props.data.sale_price : this.props.data.original_price);
    // console.log(this.props);


  }

  componentDidUpdate() {
    if (this.props.data !== this.state.data) {
      this.setSelectors();
    }
    if (this.props.data !== this.state.data) {
      this.props.updatePrice(this.props.data.sale_price > 0 ? this.props.data.sale_price : this.props.data.original_price);
    }
  }

  addToCart() {
    this.props.addToCart();
  }

  setSelectors() {
    //import data to state
    this.setState({
      data: this.props.data
    }, () => {
      var sizes = this.getSizes();

      this.setState({
        sizes,
        size: sizes[0].label,
        quantity: sizes[0].value
      }, () => {
        this.setState({
          quantities: this.getQuantities(this.state.quantity)
        }, () => {
          // console.log(this.state);
        });
      });
    });
  }

  handleChange(e) {
    console.log(e);

    for (var sku in this.state.data.skus) {
      console.log(sku);
      console.log(this.state.data.skus[sku])
      if ( e === sku.value ) {
        this.setSku(sku);
      }
    }

    this.setState({
      size: e.label,
      quantity: e.value
    }, () => {
      // console.log(this.getQuantities(e.value));
      this.setState({
        quantities: this.getQuantities(e.value)
      });
    });
  }

  getQuantities(quant) {
    var quantities = [];

    for (var i = 1; i <= quant; i++) {
      quantities.push({ value: i, label: i });
    }

    return quantities;
  }

  setSku(selectedSku) {
    this.setState({
      currentSku: selectedSku
    }, console.log(this.state.currentSku))
  }

  getSizes() {
    console.log(this.state.data.skus)
    var sizes = Object.values(this.state.data.skus).map(sku => {
      console.log(sku);
      console.log(this.state.data.skus)
      return { value: sku.quantity, label: sku.size };
    });
    return sizes;
  }

  getSku() {

  }

  render() {
    if (!this.state.sizes) { return 'Out of Stock'; }
    if (this.state.sizes) {
      return (
        <Grid container>
          <Grid container>
            <Grid item xs={7}>
              <Select
                defaultValue={{ label: 'Select a size...', value: this.state.size }}
                options={this.state.sizes}
                onChange={this.handleChange.bind(this)}>
              </Select>
            </Grid>
            <Grid item xs={5}>
              <Select
                defaultValue={{ label: 'Quantity...', value: 0 }}
                options={this.state.quantities}></Select>
            </Grid>
          </Grid>
          <Grid item xs={12} >
            <Button onClick={this.addToCart.bind(this)}>Add to Cart +</Button>
            <Button><StarIcon /></Button>
          </Grid>
        </Grid>
      );
    }
    return null;
  }
}

export default Selectors;