const express = require('express');
const port = 3001;
const path = require('path');
const TOKEN = require('./token.js');
const axios = require('axios');
const proxy = require('express-http-proxy');
const bodyparser = require('body-parser');
const app = express();

// let options = {
//   url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx',
//   headers: {
//     'Content-Type': 'application/json;charset=UTF-8',
//     'User-Agent': 'request',
//     "Access-Control-Allow-Origin": "*",
//     'Authorization': token
//   }
// };

//make a request here to specific things you're looking for

// app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, '/dist')));

app.use('/proxy',
  proxy('https://app-hrsei-api.herokuapp.com/', {
  proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
    proxyReqOpts.headers['Authorization'] = TOKEN;
    // console.log(srcReq);
    // console.log(proxyReqOpts.headers);
      proxyReqOpts.method = 'GET';
      return proxyReqOpts;
    }
  })
)

// app.get('/products', (req, res) => {
//   axios.get(options.url, options.headers)
//     .then(response => {
//       console.log('it reaches here');
//       res.send(response)
//     })
//     .catch(err => res.status(500).send(err))
// })

app.listen(port, () => {
  console.log(`You're listening on port ${port}`)
})