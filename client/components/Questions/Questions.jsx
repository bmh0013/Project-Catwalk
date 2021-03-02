import React from 'react';
import Question from './Question.jsx';
import QuestionSearch from './QuestionSearch.jsx';

const Questions = () => (
  <div>
    <h1>Questions and Answers</h1>
    <div>
      <QuestionSearch />
      <Question />
    </div>
  </div>
);

export default Questions;