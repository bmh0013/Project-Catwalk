import React from 'react';
import { markAnswerHelpful, reportAnswer } from './helperFunctions.js';

const Answer = ({ answer, handleChange }) => {

  const markHelpful = () => {
    markAnswerHelpful(answer.id)
      .then(()=> handleChange());
  }

  const report = () => {
    reportAnswer(answer.id)
      .then(()=> handleChange());
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