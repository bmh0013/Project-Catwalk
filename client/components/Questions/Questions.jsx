import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import QuestionSearch from './QuestionSearch.jsx';
import { addQuestion, getQuestions, getProducts } from './helperFunctions.js';
import sampleData from './sampleData.js';

const Questions = () => {
  const [productId, setProductId] = useState(21111);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData(productId);
  }, []);

  const loadData = async (productId) => {
      await getQuestions(productId)
      .then(receivedData => setData(receivedData.results.sort((a, b) => (a.helpfulness > b.helpfulness) ? -1 : 1)));
  };

  return (
    <div>
      <h1>Questions and Answers</h1>
      <div>
        <QuestionSearch />
        {data.map(q => (
          <Question question={q} key={q.question_id} />
        ))}
      </div>
    </div>
  );
};

export default Questions;