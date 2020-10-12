const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
const request = require('request');

var session = undefined;
// const bodyParser = require('body-parser');
const port = 3000;

app.get('/session', (req, res) => {
  console.log('request to /session');
  res.send(session);

});

app.use(express.static(path.join(__dirname, '../client/public')), () => {
  console.log('serving files at ', path.join(__dirname, '../client/public'));
});


axios.get('http://3.137.191.193/cart')
  .then(response => {
    // console.log(response.headers);
    var cookies = response.headers['set-cookie'];
    console.log(cookies);
    cookies = cookies[0].split(';');
    console.log(cookies);
    cookies = cookies[0].split('=');
    console.log(cookies);

    session = cookies[1];

    console.log(session);

    // res.header('user_session', response.headers['set-cookie']);
    // res.send(response);
    // res.end();
  })
  .catch(err => {
    console.log(err);
    // res.status(500).end();
  });
// app.use(bodyParser());
// app.use(express.urlencoded());
let getReposByUsername = (id, cb) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: 'http://3.137.191.193/reviews/:' + `${id}`,
    headers: {
      'User-Agent': 'request',
    }
  };
  request.get(options, (err, response, body) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, body);
    }
  });
};

app.get('/reviews/:product_id', (req, res) => {

  // console.log('this is the id', req.params.product_id);
  getReposByUsername(req.params.product_id, (err, body) => {
    if (err) {
      console.log(err);
    } else {
      console.log(body);
    }
  });
  // res.send('something');
});

app.get('/session', (req, res) => {

  axios.get('http://3.137.191.193/?product_id=1')
    .then(response => {
      console.log(response);
      res.send(response);
    })
    .catch(err => {
      console.log(err);
    });

});


app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});