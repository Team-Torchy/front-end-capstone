const express = require('express');
const app = express();
const path = require('path');
// const bodyParser = require('body-parser');
const port = 3000;

app.use(express.static(path.join(__dirname, '../client/public')), () => {
  console.log('serving files at ', path.join(__dirname, '../client/public'))
});
// app.use(bodyParser());
// app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.send('Server running!')
})

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});