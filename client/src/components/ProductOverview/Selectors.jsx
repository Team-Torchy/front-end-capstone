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
      quantities: []
    };
  }

  componentDidMount() {
    this.setSelectors();
  }

  setSelectors() {
    //import data to state
    this.setState({
      data: this.props.data
    }, () => {
      var sizes = Object.values(this.state.data.skus).map(sku => {
        console.log(sku.size);
        return { value: sku.quantity, label: sku.size };
      });
      this.setState({
        sizes,
        size: sizes[0].label,
        quantity: sizes[0].value
      }, () => {
        var quantities = this.getQuantities(this.state.quantity);
        this.setState({
          quantities
        }, () => {
          console.log(this.state);
        });
      });
    });
  }

  handleChange(e) {
    console.log(e);
    this.setState({
      size: e.label,
      quantity: e.value
    }, () => {
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

  render() {
    if (!this.state.sizes) { return 'Out of Stock'; }
    if (this.state.sizes) {
      return (
        <Grid container>
          <Grid item xs={12}>
            <Select
              defaultValue={{ label: this.state.size, value: this.state.size }}
              options={this.state.sizes}
              onChange={this.handleChange.bind(this)}>
            </Select>
            <Select
              defaultValue={{ label: 'Quantity...', value: 0 }}
              options={this.state.quantities}></Select>
          </Grid>
          <Grid item xs={12} >
            <Button>Add to Cart +</Button>
            <Button><StarIcon /></Button>
          </Grid>
        </Grid>
      );
    }
    return null;
  }
}

export default Selectors;