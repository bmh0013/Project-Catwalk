import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const useStyles = makeStyles({
  root: {
    width: 200,
    display: 'flex',
    alignItems: 'center',
  },
});

function HoverRating() {
  const [value, setValue] = React.useState(null);
  const [hover, setHover] = React.useState(-1);
  const classes = useStyles();

  return (
    <div className={classes.root} id='hover-rating' value={value}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.25}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
    </div>
  );
}

function StaticRating(props) {
  let reviewData = props.data;

  // STATIC DEMO DATA
  // let reviewData = {
  //   1: 20,
  //   2: 20,
  //   3: 12,
  //   4: 0,
  //   5: 20,
  // }

  let values = Object.entries(reviewData).map(e =>
    e[0] * e[1])
    .reduce((a, b) => a + b, 0) /
    Object.values(reviewData).reduce((a, b) => a + b, 0);

  const [value, setValue] = React.useState(values);

  return (
    <div>
      <Rating
        name="read-only"
        value={value} readOnly
        precision={0.25}
      />
    </div>
  );
}

export{
  HoverRating,
  StaticRating
}
