import React, { useState, useEffect } from 'react';
import { TOKEN } from '../../../token.js'
import API from '../../../api.js';
import { StaticRating } from '../../starRating.jsx';
import Body from './body.jsx';
import ImageModal from './ImageModal.jsx';
const axios = require('axios').default;
var moment = require('moment');

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  reviewCard: {
    width: '100%',
    marginTop: '1vw',
    paddingBottom: '.5vw',
    borderBottom: '3px solid black',
  }
}));

const ReviewCard = ({ reviewCard, setReviewCards, product_id }) => {
  const classes = useStyles();
  const date = moment(reviewCard.date, 'YYYY-MM-DD').format('MMMM D, YYYY');

  function handleHelpful(e) {
    const review_id = e.target.getAttribute('data');
    API.updateHelpful(review_id, {review_id})
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  function handleReport(e) {
    const review_id = e.target.getAttribute('data');
    API.updateReport(review_id, {review_id})
    .then(res => {
      console.log(res);
      API.getReviewCards({
        product_id : product_id,
        sort: document.getElementById('sort').value,
        count: 100
      })
        .then(res => {
          setReviewCards(res.data.results);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }

  const thumbnails = (
    <div className="thumbnail-container">
      {reviewCard.photos.map((photo, index) =>
        <ImageModal className={classes.testing} imageUrl={photo.url} key={photo.id}/>
      )}
    </div>
  );

  const feedback = (
    <span className='helpful'>
      Helpful? &nbsp;
      <a className='helpful-link' data={reviewCard.review_id} onClick={handleHelpful}>Yes </a>
      ({ reviewCard.helpfulness }) &nbsp; |  &nbsp;
      <a className='report-link' data={reviewCard.review_id} onClick={handleReport}>Report</a>
    </span>
  );

  return (
    <div>
      <Grid container spacing={1} item xs={12} className={classes.reviewCard} id={reviewCard.review_id}>
        <Grid item xs={6}>
          <StaticRating data={{[reviewCard.rating]: 1}} />
        </Grid>
        <Grid item xs={6} style={{textAlign: 'right'}}>
          {reviewCard.reviewer_name} | {date}
        </Grid>
        <Grid item xs={12} style={{fontWeight: 'bold'}}>
          {reviewCard.summary}
        </Grid>
        <Grid item xs={12}>
          <Body body={reviewCard.body} id={reviewCard.review_id} />
        </Grid>
        {!!reviewCard.photos.length &&
        <Grid item xs={12}>
          {thumbnails}
        </Grid>}
        {!!reviewCard.response &&
        <Grid item xs={12}>
          Response: {reviewCard.response}
        </Grid>}
        <Grid item xs={6}>
          {feedback}
        </Grid>
        {!!reviewCard.recommend &&
        <Grid item xs={6} style={{textAlign: 'right', fontWeight: 'bold'}}>
          <CheckIcon fontSize="large" style={{transform: 'translate(0px, 6px)'}}/>I recommend this product!
        </Grid>}
      </Grid>
    </div>
  )
};

export default ReviewCard;
