import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import QuestionSearch from './QuestionSearch.jsx';
import { addQuestion, getQuestions, getProducts } from './helperFunctions.js';
import sampleData from './sampleData.js';
import Button from '@material-ui/core/Button';

const Questions = () => {
  const [productId, setProductId] = useState(21111);
  const [data, setData] = useState([]);
  const [questionsToShow, setQuestionsToShow] = useState(4);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    loadData(productId);
  }, []);

  var loadData = async (productId) => {
      await getQuestions(productId)
      .then(receivedData => setData(receivedData.results.sort((a, b) => (a.helpfulness > b.helpfulness) ? -1 : 1)));
  };

  loadData = loadData.bind(this);

  const showMore = () => {
    expanded ? setQuestionsToShow(4) : setQuestionsToShow(data.length);
    setExpanded(!expanded);
  }

  return (
    <div>
      <h1>Questions and Answers</h1>
      <div>
        <QuestionSearch />
        {data.slice(0, questionsToShow).map(q => (
          <Question question={q} key={q.question_id} handleChange={loadData} />
        ))}
        {data.length > 2 ? (
          <Button color="primary" onClick={showMore} size="small">

              {expanded ? (
                <span>show fewer questions</span>
              ) : (
                <span>load more questions</span>
              )}

          </Button>
          ) : null
        }
      </div>
    </div>
  );
};

export default Questions;