import React from 'react';
import API from '../../../api';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '75vw'
  },
  avatar: {
    backgroundColor: blue[500],
  },
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
    <Card className={classes.root} variant='outlined'>
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
    </Card>
  );
};

export default Answer;
