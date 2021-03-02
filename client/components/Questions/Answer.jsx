import React from 'react';

const Answer = ({ answer }) => {
  return (
    <div>
      <div>A: {answer.body}</div>
      <div>by {answer.answerer_name}, {answer.date} | Helpful? Yes ({answer.helpfulness})  | Report</div>
    </div>
  );
};

export default Answer;