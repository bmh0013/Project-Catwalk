import React from "react";
import API from "../../../api";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "10px",
  },
}));

const Answer = ({ product_id, answer, refresh }) => {
  const markHelpful = () => {
    API.markAnswerHelpful(answer.id).then(() => refresh(product_id));
  };

  const report = () => {
    API.reportAnswer(answer.id).then(() => refresh(product_id));
  };

  const classes = useStyles();

  return (
    <Grid
      item
      container
      direction="column"
      spacing={0}
      className={classes.root}
    >
      <Grid item>
        <Typography variant="h6">{answer.body}</Typography>
      </Grid>
      <Grid item>
        <Typography component="span">
          {answer.answerer_name +
            " | " +
            new Date(answer.date).toLocaleDateString("en-us") +
            " | "}
        </Typography>
        <Typography component="span" variant="body1">
          Helpful?
          <Link
            aria-label="qa-answer-helpfulness"
            onClick={markHelpful}
            variant="body1"
          >
            {" "}
            Yes{" "}
          </Link>
          ({answer.helpfulness}) |{" "}
          <Link onClick={report} variant="body1">
            Report
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Answer;
