import React, { useState, useEffect } from 'react';
import Answer from './Answer';

const Question = ({ question }) => {
  var answers = Object.entries(question.answers).map((a) => a[1]).sort((a, b) => (a.helpfulness > b.helpfulness) ? -1 : 1);

  const [answersToShow, setAnswersToShow] = useState(2);
  const [expanded, setExpanded] = useState(false);

  const showMore = () => {
    expanded ? setAnswersToShow(2) : setAnswersToShow(answers.length);
    setExpanded(!expanded);
  }

  return (
    <div>
      <div>Q: {question.question_body}      Helpful? Yes ({question.question_helpfulness})   |   Add Answer </div>
      <div className="answers">
        {
          answers.slice(0, answersToShow).map(a => {
            return <Answer answer={a} key={a.id} />
          })
        }
        {answers.length > 2 ? (
            <a className="btn btn-primary" onClick={showMore}>
              {expanded ? (
                <span>SHOW LESS</span>
              ) : (
                <span>LOAD MORE ANSWERS</span>
              )}
            </a>
          ) : null
        }
      </div>
    </div>
  );
};

export default Question;