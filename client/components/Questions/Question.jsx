import React from 'react';
import Answer from './Answer';

const Question = ({ question }) => {
  var answers = Object.entries(question.answers).map((a) => a[1]).sort((a, b) => (a.helpfulness > b.helpfulness) ? -1 : 1);

  return (
    <div>
      <div>Q: {question.question_body}      Helpful? Yes ({question.question_helpfulness})   |   Add Answer </div>
      <div className="answers">
        {
          answers.map(a => {
            return <Answer answer={a} key={a.id} />
          })
        }
      </div>
    </div>
  );
};

export default Question;