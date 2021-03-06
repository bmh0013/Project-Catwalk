const express = require('express');
const path = require('path');
const axios = require('axios');
const proxy = require('express-http-proxy');
const bodyparser = require('body-parser');

const TOKEN = require('./token2.js');
const port = 3002;
const app = express();
// const { default: TOKEN } = require("./token.js");

app.use(express.static(path.join(__dirname, '/dist')));
app.use(bodyparser.json());
//GET
app.use('/proxy',
  proxy('https://app-hrsei-api.herokuapp.com/', {
    proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
      //you can update headers
      proxyReqOpts.headers['Authorization'] = TOKEN;
      //you can update method
      proxyReqOpts.method = 'GET';
      return proxyReqOpts;
    }
  })
)

app.listen(port, () => {
  console.log(`You're listening on port ${port}`)
})