import React, { useState,useEffect } from 'react';
import TOKEN from '../../../token.js'
import API from '../../../api.js';
const axios = require('axios').default;
var moment = require('moment');

<<<<<<< HEAD
const ReviewCard = ({ reviewCard }) => {
  let date = moment(reviewCard.date, 'YYYY-MM-DD').format('MMMM D, YYYY');
=======
const ReviewCard = (props) => {

  let date = moment(props.review.date, 'YYYY-MM-DD').format('MMMM D, YYYY');

  useEffect(() => {
    console.log('Data:', props.data);
    console.log('Review:', props.review);
  }, [])
  
  let card = props.reviewCard;
  let date = moment(card.date, 'YYYY-MM-DD').format('MMMM D, YYYY');
>>>>>>> production

  function handleHelpful(e) {
    let review_id = e.target.getAttribute('data');
    API.updateHelpful(review_id, {review_id})
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  function handleReport(e) {
    let review_id = e.target.getAttribute('data');
    API.updateReport(review_id, {review_id})
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  var thumbnails = (
    <span className="thumbnail-container">
      {reviewCard.photos.map(photo =>
        <a key={photo.id}>
          <img className="thumbnail" src={photo.url}/>
        </a>
      )}
    </span>
  );

  var feedback = (
    <span className='helpful'>
      Helpful? &nbsp;
      <a className='helpful-link' data={reviewCard.review_id} onClick={handleHelpful}>Yes </a>
      ({ reviewCard.helpfulness }) &nbsp; |  &nbsp;
      <a className='report-link' data={reviewCard.review_id} onClick={handleReport}>Report</a>
    </span>
  );

  return (
    <div className='review-card'>
      <span className="rating">Rating: {reviewCard.rating}</span>
      <span className="user_date">{reviewCard.reviewer_name} | {date}</span>
      <h5>{reviewCard.body}</h5>
      <p>
        {reviewCard.summary}
      </p>
      {thumbnails}
      {!!reviewCard.response && <p><u>Response:</u> {reviewCard.response}</p>}
      {feedback}
      {!!reviewCard.recommend && <span className='recommend'><u>I recommend this product!</u></span>}
    </div>
    )
};

export default ReviewCard;
