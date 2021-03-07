import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import QuestionSearch from './QuestionSearch.jsx';
//import { addQuestion, getQuestions, getProducts } from './helperFunctions.js';
import sampleData from './sampleData.js';
import Button from '@material-ui/core/Button';
import AddQuestion from './AddQuestion.jsx';
import API from '../../../api';

const Questions = ({ product_id }) => {
  //const [productId, setProductId] = useState(product_id);
  const [data, setData] = useState([]);
  const [questionsToShow, setQuestionsToShow] = useState(4);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    loadData(product_id);
  }, []);

  var loadData = async (product_id) => {
      let options = {
        product_id: product_id,
        page: 1,
        count: 200
      }

      API.getQuestions(options)
      //await getQuestions(productId,1,200)
      .catch(err => console.log('getQuestions', err))
      .then(response =>
        {
          setData(response.data.results.sort((a, b) => (a.helpfulness > b.helpfulness) ? -1 : 1));
        });
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
          <Question product_id={product_id} question={q} key={q.question_id} refresh={loadData} />
        ))}
        {data.length > 2 ? (
          <span>
            <Button color="primary" onClick={showMore} size="small" variant="outlined">
              {expanded ? (
                <span>FEWER QUESTIONS</span>
              ) : (
                <span>MORE QUESTIONS</span>
              )}
            </Button>
            <AddQuestion productId={product_id} refresh={loadData}/>
          </span>
          ) :  <AddQuestion productId={product_id} refresh={loadData}/>
        }

      </div>
    </div>
  );
};

export default Questions;