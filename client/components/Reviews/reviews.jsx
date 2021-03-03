import React, { useState, useEffect } from 'react';
import TOKEN from '../../../token.js'
import ReviewCard from './reviewCard.jsx'
const axios = require('axios').default;


const Reviews = (props) => {
  var [data, setData] = useState(JSON.parse('{"product_id":"21112","ratings":{"2":"1","3":"1","4":"2","5":"1"},"recommended":{"false":"2","true":"3"},"characteristics":{"Quality":{"id":70909,"value":"4.2000000000000000"}}}'));
  var [reviewData, setReviewData] = useState(JSON.parse(`{"product":"21112","page":0,"count":5,"results":[{"review_id":268324,"rating":3,"summary":"I'm enjoying wearing these shades","recommend":true,"response":"","body":"Comfortable and practical.","date":"2019-04-14T00:00:00.000Z","reviewer_name":"shortandsweeet","helpfulness":5,"photos":[{"id":457369,"url":"https://images.unsplash.com/photo-1560570803-7474c0f9af99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"},{"id":457370,"url":"https://images.unsplash.com/photo-1561693532-9ff59442a7db?ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80"},{"id":457371,"url":"https://images.unsplash.com/photo-1487349384428-12b47aca925e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"}]},{"review_id":268322,"rating":4,"summary":"I am liking these glasses","recommend":true,"response":"Glad you're enjoying the product!","body":"They are very dark. But that's good because I'm in very sunny spots","date":"2019-06-23T00:00:00.000Z","reviewer_name":"bigbrotherbenjamin","helpfulness":5,"photos":[]},{"review_id":268323,"rating":4,"summary":"They look good on me","recommend":true,"response":"","body":"I so stylish and just my aesthetic.","date":"2019-03-12T00:00:00.000Z","reviewer_name":"fashionperson","helpfulness":1,"photos":[]},{"review_id":268326,"rating":2,"summary":"This product was ok!","recommend":false,"response":"","body":"They're fine but I wouldn't buy again.","date":"2019-05-23T00:00:00.000Z","reviewer_name":"anyone","helpfulness":0,"photos":[]},{"review_id":268325,"rating":5,"summary":"I'm not a fan!","recommend":false,"response":"Sorry to hear. Is there anything in particular you don't like?","body":"I don't like them","date":"2019-06-16T00:00:00.000Z","reviewer_name":"negativity","helpfulness":0,"photos":[]}]}`));
  var [reviewCards, setReviewCards] = useState([])

  useEffect(() => {
    loadReviews()
  }, []);

  function loadReviews() {
    let results = [];
    let count = 0;
    for (let i = 0; i < 2; i++) {
      if (reviewData.results[i]) {
        count++
        results.push(reviewData.results[i]);
      }
    }
    reviewData.results.splice(0, count)
    setReviewData(reviewData);
    setReviewCards(oldReview => [...oldReview, ...results]);
    return results
  }

  return (
    <div>
      <h3>Ratings & Reviews</h3>
      <div className="flex-container">
        <div className="flex-left">
          This will have Star Rating information.
        </div>
        <div className="flex-right">
          {reviewCards.map(review =>
          <ReviewCard
            key={review.review_id}
            data={data}
            review={review}
          />)}
          {!!reviewData.results.length && <button onClick={loadReviews}>Load More</button>}
          <button>Add A Review</button>
        </div>
      </div>
    </div>
    )
};

export default Reviews;