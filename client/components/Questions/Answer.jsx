import React from 'react';
import { markAnswerHelpful, reportAnswer } from './helperFunctions.js';

const Answer = ({ answer, refresh }) => {

  const markHelpful = () => {
    markAnswerHelpful(answer.id)
      .then(()=> refresh());
  }

  const report = () => {
    reportAnswer(answer.id)
      .then(()=> refresh());
  }

  return (
    <div>
      <div>A: {answer.body}</div>
      <span>
        by {answer.answerer_name}, {new Date(answer.date).toLocaleDateString('en-us')} | Helpful? <a className="qa-link" onClick={markHelpful}>Yes</a> ({answer.helpfulness})  | <a className="qa-link" onClick={report}>Report</a>
      </span>
    </div>
  );
};

export default Answer;