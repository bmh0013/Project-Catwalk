const { default: TOKEN } = require("../../../token");

var base_url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/';
var header = {
  'Content-Type': 'application/json',
  'Authorization': TOKEN,
}

async function getQuestions(product_id = 21111, page = 1, count = 5) {
  var url = base_url + 'qa/questions?product_id=' + product_id
    + '&page=' + page + '&count=' + count;

  const response = await fetch(url, {
    method: 'GET',
    headers: header
  });

  return response.json();
};

async function addQuestion(options) {
  var url = base_url + 'qa/questions';
  console.log(JSON.stringify(options));

  const response = await fetch(url, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(options),
  });

  console.log(response);

  return 'Added';
};

async function addAnswer(options) {
  var url = base_url + `qa/questions/${options.questionId}/answers`;
  console.log(options);
  const response = await fetch(url, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(options),
  });
  return 'response.json()';
};

async function getProducts() {
  var url = base_url + 'products';

  const response = await fetch(url, {
    method: 'GET',
    headers: header
  });
  return response.json();
};

async function markQuestionHelpful(questionId) {
  var url = base_url + `qa/questions/${questionId}/helpful`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: header,
  });

  return 'Success';
};

//not sure report question is a requested feature
async function reportQuestion(questionId) {
  var url = base_url + `qa/questions/${questionId}/report`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: header,
  });

  return 'Reported';
};

async function markAnswerHelpful(answerId) {
  var url = base_url + `qa/answers/${answerId}/helpful`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: header,
  });
  return 'Success';
};

async function reportAnswer(answerId) {
  var url = base_url + `qa/answers/${answerId}/report`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: header,
  });
  return 'Reported';
};

module.exports = {
  getQuestions,
  addQuestion,
  getProducts,
  markAnswerHelpful,
  markQuestionHelpful,
  reportAnswer,
  reportQuestion
}