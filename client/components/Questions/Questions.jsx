import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import QuestionSearch from './QuestionSearch.jsx';
import sampleData from './sampleData.js';
import Button from '@material-ui/core/Button';
import AddQuestion from './AddQuestion.jsx';
import API from '../../../api';

const Questions = ({ product_id }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
      .catch(err => console.log('getQuestions', err))
      .then(response => setData(response.data.results.sort((a, b) => (a.helpfulness > b.helpfulness) ? -1 : 1)));
  };

  loadData = loadData.bind(this);

  var handleSearch = (searchTerm) => {
    if (searchTerm.length > 2) {
      setSearchTerm(searchTerm);
    } else {
      setSearchTerm('');
    }
    return;
  }

  handleSearch = handleSearch.bind(this);

  const showMore = () => {
    expanded ? setQuestionsToShow(4) : setQuestionsToShow(data.length);
    setExpanded(!expanded);
  }

  return (
    <div>
      <h1>Questions and Answers</h1>
      <div>
        <QuestionSearch handleSearch={handleSearch}/>
        {data.filter(q => q.question_body.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, questionsToShow).map(q => (
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
            <AddQuestion product_id={product_id} refresh={loadData}/>
          </span>
          ) :  <AddQuestion product_id={product_id} refresh={loadData}/>
        }

      </div>
    </div>
  );
};

export default Questions;