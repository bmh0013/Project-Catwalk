import API_KEY from './token.js';
const axios = require('axios');

function getReviewInfo(cb, id) {
  let headers = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews/meta',
    params: {
      product_id: 21113
    },
    headers: {
      Authorization: API_KEY
    }
  }
  axios(headers)
  .then(res => {
    console.log(res);
    cb(null, res.data.ratings);
  })
  .catch(err => {
    cb(err);
  });
}

function getProductInfo(cb) {
  let headers = {
    method: 'get',
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products',
    headers: {
      Authorization: API_KEY
    }
  }
  axios(headers)
  .then(res => {
    cb(null, res.data);
  })
  .catch(err => {
    cb(err);
  });
}

export{
  getReviewInfo,
  getProductInfo,
}