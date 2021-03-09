import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import QuestionSearch from './QuestionSearch.jsx';
import sampleData from './sampleData.js';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddQuestion from './AddQuestion.jsx';
import API from '../../../api';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blue[500],
  },
}));

const Questions = ({ product_id, product_name }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [questionsToShow, setQuestionsToShow] = useState(4);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    loadData(product_id);
  }, []);

  const classes = useStyles();

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
    <Card className={classes.root}>
      <CardHeader
        titleTypographyProps={{variant: 'h5'}}
        title='QUESTIONS AND ANSWERS'
        style={{paddingBottom: '0', paddingTop: '4'}}
      />
      <CardContent style={{height: '200'}}>
        <QuestionSearch handleSearch={handleSearch}/>
        {data.filter(q => q.question_body.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, questionsToShow).map(q => (
          <Question product_id={product_id} question={q} key={q.question_id} refresh={loadData} />
        ))}
      </CardContent>
      <CardActions style={{justifyContent: 'center'}}>
        {data.length > 2 ? (
            <span>
              <Button color="primary" onClick={showMore} size="large" variant="outlined">
                {expanded ? (
                  <span>FEWER QUESTIONS</span>
                ) : (
                  <span>MORE ANSWERED QUESTIONS</span>
                )}
              </Button>

            </span>
            ) :  null
          }
        <AddQuestion product_id={product_id} refresh={loadData}/>
      </CardActions>
    </Card>
  );
};

export default Questions;