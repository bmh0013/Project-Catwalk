import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';
import QuestionSearch from './QuestionSearch.jsx';
import AddQuestion from './AddQuestion.jsx';
import API from '../../../api';

import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '75vw',
    justifyContent: 'center'
  },
  questionsGridItem: {
    maxHeight: '50vh',
    overflow: 'scroll'
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
    <Box>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography variant="h5" style={{paddingBottom: '0', paddingTop: '4'}}>
            QUESTIONS AND ANSWERS
          </Typography>
        </Grid>
        <Grid item>
          <QuestionSearch handleSearch={handleSearch}/>
        </Grid>
        <Grid item className={classes.questionsGridItem}>
          <Grid container direction="column" spacing={3}>
            {
              data.filter(q => q.question_body.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, questionsToShow)
                .map(q => (
                  <Grid item>
                    <Question product_id={product_id} question={q} key={q.question_id} refresh={loadData} />
                  </Grid>
                ))
            }
          </Grid>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center" spacing={1}>
        {
        data.length > 2 ? (
          <Grid item>
            <Button color="primary" onClick={showMore} size="large" variant="outlined">
              {expanded ? (
                <span>FEWER QUESTIONS</span>
              ) : (
                <span>MORE ANSWERED QUESTIONS</span>
              )}
            </Button>
          </Grid>
          ) :  null
        }
        <Grid item>
          <AddQuestion product_id={product_id} refresh={loadData}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Questions;