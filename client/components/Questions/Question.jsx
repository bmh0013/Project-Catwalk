import React, { useState, useEffect } from 'react';
import Answer from './Answer';
import { markQuestionHelpful, reportQuestion } from './helperFunctions.js';

const Question = ({ question, handleChange }) => {
  var answers = Object.entries(question.answers).map((a) => a[1]).sort((a, b) => (a.helpfulness > b.helpfulness) ? -1 : 1);

  const [answersToShow, setAnswersToShow] = useState(2);
  const [expanded, setExpanded] = useState(false);

  const showMore = () => {
    expanded ? setAnswersToShow(2) : setAnswersToShow(answers.length);
    setExpanded(!expanded);
  }

  const markHelpful = () => {
    markQuestionHelpful(question.question_id)
      .then(()=> handleChange());
  }

  return (
    <div>
      <span>
        Q: {question.question_body}   |   Helpful?  <a className="qa-link" onClick={markHelpful}>Yes</a> ({question.question_helpfulness})   |   Add Answer
      </span>
      <div className="qa-answers">
        {
          answers.slice(0, answersToShow).map(a => {
            return <Answer answer={a} key={a.id} handleChange={handleChange}/>
          })
        }
        {answers.length > 2 ? (
            <a className="qa-expand" onClick={showMore}>
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