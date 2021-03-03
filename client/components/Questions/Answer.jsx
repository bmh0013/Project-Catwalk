import React from 'react';

const Answer = ({ answer }) => {
  return (
    <div>
      <div>A: {answer.body}</div>
      <div>by {answer.answerer_name}, {new Date(answer.date).toLocaleDateString('en-us')} | Helpful? Yes ({answer.helpfulness})  | Report</div>
    </div>
  );
};

export default Answer;