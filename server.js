const express = require('express');
const port = 3000;
const path = require('path');
const token = require('./token.js');
const axios = require('axios');
const bodyparser = require('body-parser');
const app = express();

let options = {
  url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products',
  headers: {
    'User-Agent': 'request',
    'Authorization': token
  }
};

//make a request here to specific things you're looking for

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, '/dist')));

app.get('/', (req, res) => {
  axios.get(options.url, options.headers)
    .then(response => {
      console.log(response);
      res.send(response)
    })
    .catch(err => res.status(500).send(err))
})

app.listen(port, () => {
  console.log(`You're listening on port ${port}`)
})