import React, { useState, useEffect } from "react";
import Answer from "./Answer";
import AddAnswer from "./AddAnswer";
import API from "../../../api";

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 10,
    paddingBottom: 0,
  },
  bold: {
    fontWeight: 600,
  },
}));

const Question = ({ product_id, question, refresh }) => {
  var answers = Object.entries(question.answers)
    .map((a) => a[1])
    .sort((a, b) => (a.helpfulness > b.helpfulness ? -1 : 1));

  const [answersToShow, setAnswersToShow] = useState(2);
  const [expanded, setExpanded] = useState(false);

  const classes = useStyles();

  const showMore = () => {
    expanded ? setAnswersToShow(2) : setAnswersToShow(answers.length);
    setExpanded(!expanded);
  };

  const markHelpful = () => {
    API.markQuestionHelpful(question.question_id).then(() =>
      refresh(product_id)
    );
  };

  return (
    <Box elevation={0}>
      <Grid container spacing={1} className={classes.root}>
        <Grid
          item
          xs={1}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Typography variant="h5" className={classes.bold}>
            Q:
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="h5" className={classes.bold}>
            {question.question_body}
          </Typography>
        </Grid>
        <Grid
          item
          xs={4}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Typography component="span" variant="h6">
            Helpful?
            <Link
              aria-label="qa-question-helpfulness"
              onClick={markHelpful}
              variant="h6"
            >
              {" "}
              Yes{" "}
            </Link>
            ({question.question_helpfulness}) |{" "}
            <AddAnswer
              product_id={product_id}
              question_id={question.question_id}
              question={question.question_body}
              refresh={refresh}
            />
          </Typography>
        </Grid>
        {answers.length ? (
          <Grid item container direction="row" spacing={1}>
            <Grid
              item
              xs={1}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Typography variant="h5" className={classes.bold}>
                A:
              </Typography>
            </Grid>
            <Grid item container direction="column" spacing={1} xs={11}>
              {answers.slice(0, answersToShow).map((a) => {
                return (
                  <Answer
                    product_id={product_id}
                    answer={a}
                    key={a.id}
                    refresh={refresh}
                  />
                );
              })}
            </Grid>
          </Grid>
        ) : null}
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "0px",
          }}
        >
          {answers.length > 2 ? (
            <Button
              color="secondary"
              onClick={showMore}
              size="small"
              variant="outlined"
            >
              {expanded ? (
                <span>Collapse answers</span>
              ) : (
                <span>See more answers</span>
              )}
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Question;

{
  /* <div>
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
); */
}
