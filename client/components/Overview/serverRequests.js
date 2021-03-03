import key from './token.js';
const axios = require('axios');

function getProductInfo() {
  const URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/products';
  console.log(key);
  axios({
    method: 'get',
    url: URL,
    headers: {
      Authorization: key,
    }
  })
  .then(res => {
    console.log(res.data);
  })
  .catch(err => {
    console.log(err)
  });
}

export default getProductInfo;