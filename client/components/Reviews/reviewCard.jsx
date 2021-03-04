import React, { useState,useEffect } from 'react';
import TOKEN from '../../../token.js'
const axios = require('axios').default;
var moment = require('moment');

const ReviewCard = (props) => {
  let date = moment(props.review.date, 'YYYY-MM-DD').format('MMMM D, YYYY');

  // useEffect(() => {
  //   console.log('Data:', props.data);
  //   console.log('Review:', props.review);
  //   console.log('Photos:', props.review.photos);
  // }, [])

  function handleHelpful(e) {
    let review_id = e.target.getAttribute('data');
    handlePutRequests(review_id, 'helpful')
  }

  function handleReport(e) {
    let review_id = e.target.getAttribute('data');
    handlePutRequests(review_id, 'report')
  }

  function handlePutRequests(review_id, route) {
    let headers = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews/${review_id}/${route}`,
      headers: {
        Authorization: TOKEN
      },
      parameters: {
        review_id: review_id
      }
    };
    axios(headers)
    .then(response => {
      console.log(review_id, response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <div className='review-card'>
      <span className="rating">Rating: {props.review.rating}</span>
      <span className="user_date">{props.review.reviewer_name} | {date}</span>
      <h5>{props.review.body}</h5>
      <p>
        {props.review.summary}
      </p>
      <span className="thumbnail-container">
        {props.review.photos.map(photo =>
          <a href={photo.url} key={photo.id}>
            <img className="thumbnail" src={photo.url}>
            </img>
          </a>
        )}
      </span>
      {!!props.review.response && <p><u>Response:</u> {props.review.response}</p>}
      <span className='helpful'>
        Helpful? &nbsp;
        <a className='helpful-link' data={props.review.review_id} onClick={handleHelpful}>Yes</a> ({props.review.helpfulness}) &nbsp; |  &nbsp;
        <a className='report-link' data={props.review.review_id} onClick={handleReport}>Report</a>
      </span>
      {!!props.review.recommend && <span className='recommend'><u>I recommend this product!</u></span>}
    </div>
    )
};

export default ReviewCard;