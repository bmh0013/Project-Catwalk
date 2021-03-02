import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import QuestionSearch from './QuestionSearch.jsx';
import { addQuestion, getQuestions, getProducts } from './helperFunctions.js';
import sampleData from './sampleData.js';

const Questions = () => {
  const [productId, setProductId] = useState(sampleData.product_id);
  const [questions, setQuestions] = useState(sampleData.results);

  useEffect(() => {
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
    // getQuestions()
    //   .then(data => {
    //     console.log(data);
    //   });
    console.log(questions);
  });

  return (
    <div>
      <h1>Questions and Answers</h1>
      <div>
        <QuestionSearch />
        {
          questions.map((q) => {
            return < Question question={q} key={q.question_id} />
          })
        }
      </div>
    </div>
  );
};

export default Questions;