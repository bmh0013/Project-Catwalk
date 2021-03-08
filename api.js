import TOKEN from './token.js';
const axios = require('axios').default;

// Handles all get requests, requires a route and a params
function handleGetRequests(route, params) {
  let headers;
  if (params) {
    headers = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hratx/${route}`,
      headers: {
        Authorization: TOKEN
      },
      params: params
    }
  } else {
    headers = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hratx/${route}`,
      headers: {
        Authorization: TOKEN
      }
    }
  }
  return axios(headers)
}

function getAllProducts() {
  return handleGetRequests('products')
}

function getProduct(product_id) {
  return handleGetRequests(`products/${product_id}`)
}

function getProductStyles(product_id) {
  return handleGetRequests(`products/${product_id}/styles`)
}

function getRelatedProductIds(product_id) {
  return handleGetRequests(`products/${product_id}/related`)
}

function getReviewCards(params) {
  return handleGetRequests('reviews', params)
}

function getMetadata(params) {
  return handleGetRequests('reviews/meta', params)
}

function getQuestions(params) {
  return handleGetRequests('qa/questions/', params)
}

function getAnswers(question_id, params) {
  return handleGetRequests(`qa/questions/${question_id}/answers`, params)
}

// Handles all put requests, requires a route and params object
function handlePostRequests(route, params) {
  let headers = {
    method: 'post',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hratx/${route}`,
    headers: {
      Authorization: TOKEN
    },
    params: params
  };
  return axios(headers)
}

function postReview(params) {
  return handlePostRequests('reviews', params)
}

export default {
  getAllProducts,
  getProduct,
  getProductStyles,
  getRelatedProductIds,
  getReviewCards,
  getMetadata,
  getQuestions,
  getAnswers
}