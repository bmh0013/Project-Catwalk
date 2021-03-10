import React from 'react';
import API from '../../../api';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '10px'
  }
}));

const Answer = ({ product_id, answer, refresh }) => {

  const markHelpful = () => {
    API.markAnswerHelpful(answer.id)
      .then(()=> refresh(product_id));
  }

  const report = () => {
    API.reportAnswer(answer.id)
      .then(()=> refresh(product_id));
  }

  const classes = useStyles();

  return (
      <Grid item container direction="column" spacing={0} className={classes.root}>
        <Grid item>
          <Typography variant='h6'>{answer.body}</Typography>
        </Grid>
        <Grid item>
          <Typography component="span">
            {answer.answerer_name + ' | ' + new Date(answer.date).toLocaleDateString('en-us') + ' | '}
          </Typography>
          <Typography component='span' variant='body1'>Helpful?
            <Link aria-label="qa-answer-helpfulness" onClick={markHelpful} variant="body1"> Yes </Link>
             ({answer.helpfulness})   |   <Link onClick={report} variant="body1">Report</Link>
          </Typography>
        </Grid>
      </Grid>
  );
};

export default Answer;


{/* <Card className={classes.root} variant='outlined'>
<CardHeader
      avatar={
        <Avatar aria-label="qa-answer-avatar" className={classes.avatar}>
          A
        </Avatar>
      }
      action={
        <h6>
          Helpful? <Link aria-label="qa-question-helpfulness" onClick={markHelpful} variant="h6">
            Yes
          </Link> ({answer.helpfulness})   |   <Link onClick={report} variant="h6">Report</Link>
        </h6>
      }
      titleTypographyProps={{variant: 'h5'}}
      title={answer.body}
      subheaderTypographyProps={{variant: 'h6'}}
      subheader={answer.answerer_name + ' | ' + new Date(answer.date).toLocaleDateString('en-us')}
      style={{paddingBottom: '0'}}
/>
</Card> */}