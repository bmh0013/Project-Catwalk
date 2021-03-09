const express = require('express');
const path = require('path');
const axios = require('axios');
const proxy = require('express-http-proxy');
const bodyparser = require('body-parser');

const port = 3002;
const app = express();

app.use(express.static(path.join(__dirname, '/dist')));

app.listen(port, () => {
  console.log(`You're listening on port ${port}`)
})