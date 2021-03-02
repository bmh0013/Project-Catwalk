import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import QuestionSearch from './QuestionSearch.jsx';
import { addQuestion, getQuestions, getProducts } from './helperFunctions.js';
import sampleData from './sampleData.js';

const Questions = () => {
  const [productId, setProductId] = useState(21111);
  const [data, setData] = useState([]);
  var base_url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/';

  useEffect(() => {
    console.log('entered useeffect');
    loadData(productId);
  }, []);

  const loadData = async (productId) => {
      await getQuestions(productId)
      .then(receivedData => setData(receivedData.results));
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


    // addQuestion({
    //   body: 'Is this thing any good?',
    //   name: 'Mike',
    //   email: 'email@email.com',
    //   product_id: 0
    // })
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(data => {
    //     console.log('well that did not work');
    //   });