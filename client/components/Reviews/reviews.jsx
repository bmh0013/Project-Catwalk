import React, { useState, useEffect } from 'react';
import TOKEN from '../../../token.js';
import ReviewCard from './reviewCard.jsx';
import Ratings from './ratings.jsx';
import NewReview from './newReview.jsx';
import API from '../../../api.js';


import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

const axios = require('axios').default;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '20px',
    maxWidth: "80vw",
  },
  reviewBreakdownContainer: {
    border: '1px solid black',
    overflow: "scroll",
  },
  ratingsBreakdownContainer: {
    border: '1px solid red',
  },
}));

const Reviews = ({ product_id }) => {
  let [product, setProduct] = useState();
  let [reviewCards, setReviewCards] = useState([]);
  let [metadata, setMetadata] = useState();
  let [count, updateCount] = useState(2);
  let [modal, setModal] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    fetchProductInfo()
    fetchReviews('relevant');
    fetchMetadata();
  }, []);

  function fetchProductInfo() {
    API.getProduct(product_id)
    .then(res => {
      setProduct(res.data);
    })
    .catch(err => console.log(err));
  }

  function fetchReviews(sort) {
    API.getReviewCards({
      product_id : product_id,
      sort: sort
    })
    .then(res => {
      setReviewCards(res.data.results);
    })
    .catch(err => console.log(err));
  }

  function fetchMetadata() {
    API.getMetadata({ product_id })
    .then(res => {
      setMetadata(res.data);
    })
    .catch(err => console.log(err));
  }

  function loadMore() {
    updateCount(count + 2);
  }

  return (
    <div>
      <Box elevation={0} className={classes.root}>
        <Grid container spacing={1}>
          <Grid container item xs={4} className={classes.ratingsBreakdownContainer}>
            Hello
          </Grid>
          <Grid container item xs={8} className={classes.reviewBreakdownContainer}>
            <Grid item xs={12}>
              {reviewCards.length} reviews, sort by &nbsp;
              <NativeSelect onChange={() => {console.log('Sorting...')}}>
                <option value="relevant">relevant</option>
                <option value="helpful">helpful</option>
                <option value="newest">newest</option>
              </NativeSelect>
            </Grid>
            {reviewCards.slice(0, count).map(card => <ReviewCard key={card.review_id} reviewCard={card}/>)}
            <Grid item xs={4}>
              <Button variant="outlined" style={{marginTop: '.5vw'}} onClick={() => {setModal(true)}}>Add A Review</Button>
            </Grid>
            <Grid item xs={4}>
              {reviewCards.length > count &&
              <Button variant="outlined" style={{marginTop: '.5vw'}} onClick={loadMore}>Load More</Button>}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
    )
};

export default Reviews;



  // <Grid item container direction="column" spacing={3} style={{ maxWidth: "97%" }}>
  //   <Grid item xs={4}>
  //     {/* {metadata && <Ratings metadata={metadata} reviewCards={reviewCards}/>} */}
  //     </Grid>
  //     <Grid item container xs={8}>
  //       {reviewCards.slice(0, count).map(card => <ReviewCard key={card.review_id} reviewCard={card}/>)}
  //     </Grid>
  //   </Grid>
