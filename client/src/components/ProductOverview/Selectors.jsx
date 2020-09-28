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
      options: undefined,
      quantity: 0
    };
  }

  componentDidMount() {
    // console.log(this.props);

    // console.log('Data: ', data);
    if (!this.state.data) { return null; }
    var options = Object.values(this.props.data.skus).map(sku => {
      return sku;
    });

    var valuesSize = options.map(option => {
      return { 'value': option.size, 'label': option.size };
    });

    this.setState({
      data: this.props.data,
      options: options,
    });

    console.log(this.props.data);

    console.log('Sizes: ', valuesSize);

    console.log('Options: ', options);
  }

  render() {
    if (!this.state.data) { return 'Out of Stock'; }

    return (
      <Grid container>
        <Grid item xs={7}>
          <Select options={this.state.data.sizes} />
          <Button>Add to Cart +</Button>
        </Grid>
        <Grid item xs={5} >
          <Select options={this.state.data} />
          <Button><StarIcon /></Button>
        </Grid>
      </Grid>
    );
  }
}

export default Selectors;