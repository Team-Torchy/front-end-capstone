const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const request = require('request');
// const bodyParser = require('body-parser');
const port = 3000;

app.use(express.static(path.join(__dirname, '../client/public')));
// app.use(bodyParser());
// app.use(express.urlencoded());


app.get('/reviews/:product_id', (req, res) => {

  // console.log('this is the id', req.params.product_id);
  axios.get(`http://18.224.37.110/reviews/${req.params.product_id}`)
  .then((result) => {
    console.log(result.data)
  })
  .catch((err) => {
    console.log(err);
  })
  // res.send('something');
});

// app.get('/', (req, res) => {
//   res.send('Server running!')
// })


app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});