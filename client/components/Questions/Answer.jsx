import React from 'react';

const Answer = ({ answer }) => {
  return (
    <div>
      <div>A: {answer.body}</div>
    </div>
  );
};

export default Answer;