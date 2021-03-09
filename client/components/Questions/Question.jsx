import React, { useState, useEffect } from 'react';
import Answer from './Answer';
import AddAnswer from './AddAnswer';
import API from '../../../api';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '80vw',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Question = ({ product_id, question, refresh }) => {
  var answers = Object.entries(question.answers).map((a) => a[1]).sort((a, b) => (a.helpfulness > b.helpfulness) ? -1 : 1);

  const [answersToShow, setAnswersToShow] = useState(2);
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles();

  const showMore = () => {
    expanded ? setAnswersToShow(2) : setAnswersToShow(answers.length);
    setExpanded(!expanded);
  }

  const markHelpful = () => {
    API.markQuestionHelpful(question.question_id)
      .then(()=> refresh(product_id));
  }

  return (
    <div>
        <Card className={classes.root} variant='outlined'>
            <CardHeader
              avatar={
                <Avatar aria-label="qa-question-avatar" className={classes.avatar}>
                  Q
                </Avatar>
              }
              action={
                <h5>
                  Helpful? <Link aria-label="qa-question-helpfulness" onClick={markHelpful} variant="h5">
                    Yes
                  </Link> ({question.question_helpfulness})   |   <AddAnswer product_id={product_id} question_id={question.question_id} question={question.question_body} refresh={refresh}/>
                </h5>
              }
              titleTypographyProps={{variant: 'h5'}}
              title={question.question_body}
              subheaderTypographyProps={{variant: 'h6'}}
              subheader={question.asker_name + ' | ' + new Date(question.question_date).toLocaleDateString('en-us')}
              style={{paddingBottom: '0', paddingTop: '4'}}
            />
          <CardContent>
            <div className="qa-answers">
              {
                answers.slice(0, answersToShow).map(a => {
                  return <Answer product_id={product_id} answer={a} key={a.id} refresh={refresh}/>
                })
              }
            </div>
          </CardContent>
          <CardActions style={{justifyContent: 'flex-end', paddingTop: 0}}>
            {answers.length > 2 ? (
                <Button color="secondary" onClick={showMore} size="small" variant='outlined'>
                  {expanded ? (
                    <span>Collapse answers</span>
                  ) : (
                    <span>See more answers</span>
                  )}
                </Button>
              ) : null
            }
          </CardActions>
        </Card>
    </div>
  );
};

export default Question;