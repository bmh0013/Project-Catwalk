import React from 'react';
import Answer from './Answer';

const Question = ({ question }) => {
  var answers = Object.entries(question.answers);
  console.log(answers);
  // if (answers.length > 0) {
  //   answers = answers.map(answer => {
  //     return <Answer answer={answer[1]} key={answer[0]} />
  //   })
  // } else {
  //   answers = '';
  // }

  console.log(answers);

  return (
    <div>
      <div>Q: {question.question_body}</div>
      {
        answers.map(answer => {
          return <Answer answer={answer[1]} key={answer[0]} />
        })
      }
    </div>
  );
};

export default Question;