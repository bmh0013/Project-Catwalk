var base_url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/';

async function getQuestions(product_id = 21111, page = 1, count = 5) {
  var url = base_url + 'qa/questions?product_id=' + product_id
    + '&page=' + page + '&count=' + count;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'f83a9d35d6c9a77194d30509e501d64f347346c3',
    }
  });
  return response.json();
};

async function addQuestion(options) {
  var url = base_url + 'qa/questions';
  console.log(JSON.stringify(options));

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'f83a9d35d6c9a77194d30509e501d64f347346c3',
    },
    body: JSON.stringify(options),
  });
  return response.json();
};

async function addAnswer(options) {
  var url = base_url + `qa/questions/${options.questionId}/answers`;
  console.log(JSON.stringify(options));

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'f83a9d35d6c9a77194d30509e501d64f347346c3',
    },
    body: JSON.stringify(options),
  });
  return response.json();
};

async function getProducts() {
  var url = base_url + 'products';

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'f83a9d35d6c9a77194d30509e501d64f347346c3',
    }
  });
  return response.json();
};

async function markQuestionHelpful(questionId) {
  var url = base_url + `qa/questions/${questionid}/helpful`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'f83a9d35d6c9a77194d30509e501d64f347346c3',
    },
    body: { question_id: questionId }
  });
  return response.json();
};

async function reportQuestion(questionId) {
  var url = base_url + `qa/questions/${questionid}/report`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'f83a9d35d6c9a77194d30509e501d64f347346c3',
    },
    body: { question_id: questionId }
  });
  return response.json();
};

async function markAnswerHelpful(answerId) {
  var url = base_url + `qa/answers/${answerId}/helpful`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'f83a9d35d6c9a77194d30509e501d64f347346c3',
    },
    body: { answer_id: answerId }
  });
  return response.json();
};

async function reportAnswer(answerId) {
  var url = base_url + `qa/answers/${answerId}/report`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'f83a9d35d6c9a77194d30509e501d64f347346c3',
    },
    body: { answer_id: answerId }
  });
  return response.json();
};

module.exports = {
  getQuestions,
  addQuestion,
  getProducts
}