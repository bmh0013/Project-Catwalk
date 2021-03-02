const express = require('express');
const port = 3001;
const path = require('path');
const TOKEN = require('./token.js');
const axios = require('axios');
const proxy = require('express-http-proxy');
const bodyparser = require('body-parser');
const app = express();

//make a request here to specific things you're looking for

// app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, '/dist')));

app.use('/proxy',
  proxy('https://app-hrsei-api.herokuapp.com/', {
    proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
      //you can update headers
      proxyReqOpts.headers['Authorization'] = TOKEN;
      //you can update method
      // proxyReqOpts.method = 'GET';
      return proxyReqOpts;
    }
  })
)

app.listen(port, () => {
  console.log(`You're listening on port ${port}`)
})