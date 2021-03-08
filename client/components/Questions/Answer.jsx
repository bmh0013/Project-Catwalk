import React from 'react';
import API from '../../../api';

const Answer = ({ product_id, answer, refresh }) => {

  const markHelpful = () => {
    API.markAnswerHelpful(answer.id)
      .then(()=> refresh(product_id));
  }

  const report = () => {
    API.reportAnswer(answer.id)
      .then(()=> refresh(product_id));
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