const express = require('express');
const path = require('path');
const axios = require('axios');
const proxy = require('express-http-proxy');
const bodyparser = require('body-parser');
const rawbody = require('raw-body');

const TOKEN = require('./token.js');
const port = 3002;
const app = express();
// const { default: TOKEN } = require("./token.js");

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
//bodyparser has to be declared AFTER the use proxy

app.use(bodyparser.json());

//for the post requests
app.use('/post', proxy('https://app-hrsei-api.herokuapp.com/', {
  reqBodyEncoding: null
}))

app.listen(port, () => {
  console.log(`You're listening on port ${port}`)
})