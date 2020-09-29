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
let getReposByUsername = (id, cb) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'http://18.224.37.110/reviews/:' + `${id}`,
    headers: {
      'User-Agent': 'request',
    }
  };
  request.get(options, (err, response, body) => {
    if(err) {
      cb(err, null);
    } else {
      cb(null, body);
    }
  });
}

app.get('/reviews/:product_id', (req, res) => {

  // console.log('this is the id', req.params.product_id);
  getReposByUsername(req.params.product_id, (err, body) => {
    if(err) {
      console.log(err)
    } else {
      console.log(body);
    }
  })
  // res.send('something');
});

// app.get('/', (req, res) => {
//   res.send('Server running!')
// })


app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});