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
  thumbnail: {
    border: "1px solid #ddd",
    borderRadius: 4,
    padding: 5,
    width: 150,
  },
}));

const Answer = ({ product_id, answer, refresh }) => {
  const classes = useStyles();
  const hasPhotos = !!answer.photos.length;

  const markHelpful = () => {
    API.markAnswerHelpful(answer.id).then(() => refresh(product_id));
  };

  const report = () => {
    API.reportAnswer(answer.id).then(() => refresh(product_id));
  };

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
      {hasPhotos && (
        <Grid item container>
          {answer.photos.map((img) => {
            return (
              <a target="_blank" href={img}>
                <img className={classes.thumbnail} key={img} src={img} />
              </a>
            );
          })}
        </Grid>
      )}
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
