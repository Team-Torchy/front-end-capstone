import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import productListData from '../../productListData.js';


let products = productListData.map((product) => product);

const QuestionSearch = (props) => {
  const [filmsData, setFilmsData] = useState(products);

  return (
    <Autocomplete
      id="combo-box-demo"
      options={products}
      getOptionLabel={(option) => option.name}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="HAVE A QUESTION? SEARCH FOR ANSWERS..." variant="outlined" />}
    />
  );
};



export default QuestionSearch;