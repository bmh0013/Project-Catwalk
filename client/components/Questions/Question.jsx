import React, { useState, useEffect } from 'react';
import Answer from './Answer';
import AddAnswer from './AddAnswer';
import API from '../../../api';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import grey from "@material-ui/core/colors/grey";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600
  },
  cardheader: {
    title: {
      fontSize: '26px !important'
    }
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
              <Avatar aria-label="qa-question-asker" className={classes.avatar}>
                Q
              </Avatar>
            }
            action={
              <IconButton aria-label="qa-question-helpfulness" onClick={markHelpful}>
                {question.question_helpfulness}
                <FavoriteIcon />
              </IconButton>
            }
            titleTypographyProps={{variant: 'h5'}}
            title={question.question_body}
            subheaderTypographyProps={{variant: 'h6'}}
            subheader={question.asker_name + ' | ' + new Date(question.question_date).toLocaleDateString('en-us')}
            style={{paddingBottom: '0'}}
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
          <CardActions style={{justifyContent: 'center'}}>
            {answers.length > 2 ? (
                <Button color="primary" onClick={showMore} size="large" variant='outlined'>
                  {expanded ? (
                    <span>show fewer answers</span>
                  ) : (
                    <span>show more answers</span>
                  )}
                </Button>
              ) : null
            }
            <AddAnswer product_id={product_id} question_id={question.question_id} refresh={refresh}/>
          </CardActions>
        </Card>
    </div>
  );
};

export default Question;

{
//   <span>
//   Q: {question.question_body}   |   Helpful?  <a className="qa-link" onClick={markHelpful}>Yes</a> ({question.question_helpfulness})   |   <AddAnswer product_id={product_id} question_id={question.question_id} refresh={refresh}/>
// </span>


  /* <CardActions>
{answers.length > 2 ? (
    <Button color="default" onClick={showMore} size="small">
      {expanded ? (
        <span>show fewer answers</span>
      ) : (
        <span>show more answers</span>
      )}
    </Button>
  ) : null
}
</CardActions> */}