import React from 'react';
import Answer from './Answer';

const Question = ({ question }) => {
  var answers = Object.entries(question.answers);

  return (
    <div>
      <div>Q: {question.question_body}      Helpful? Yes ({question.question_helpfulness})   |   Add Answer </div>
      <div className="answers">
        {
          answers.map(answer => {
            return <Answer answer={answer[1]} key={answer[0]} />
          })
        }
      </div>
    </div>
  );
};

export default Question;