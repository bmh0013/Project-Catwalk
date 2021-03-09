import React, { useState, useEffect } from 'react';
import TOKEN from '../../../token.js';
import ReviewCard from './reviewCard.jsx';
import Ratings from './ratings.jsx';
import NewReview from './newReview.jsx';
import API from '../../../api.js';
const axios = require('axios').default;


const Reviews = ({ product_id }) => {
  var [product, setProduct] = useState();
  var [reviewCards, setReviewCards] = useState([]);
  var [metadata, setMetadata] = useState();
  var [showCards, updateShowCards] = useState([]);
  var [modal, setModal] = useState(false);

  useEffect(() => {
    fetchProductInfo()
    fetchReviews();
    fetchMetadata();
  }, []);

  function fetchProductInfo() {
    API.getProduct(product_id)
    .then(res => {
      setProduct(res.data);
    })
    .catch(err => console.log(err));
  }

  function fetchReviews() {
    API.getReviewCards({ product_id })
    .then(res => loadReviews(res.data.results))
    .catch(err => console.log(err));
  }

  function fetchMetadata() {
    API.getMetadata({ product_id })
    .then(res => {
      setMetadata(res.data);
    })
    .catch(err => console.log(err));
  }

  function loadReviews(data) {
    let results = [];
    let count = 0;

    for (let i = 0; i < 2; i++) {
      if (data[i]) {
        count++;
        results.push(data[i]);
      }
    }

    data.splice(0, count)
    setReviewCards(data);
    updateShowCards(oldReview => [...oldReview, ...results]);
  }

  return (
    <div>
      <h3>Ratings & Reviews</h3>
      <div className="flex-container">
        <div className="flex-left">
          {metadata && <Ratings product={product} metadata={metadata} />}
        </div>
        <div className="flex-right">
          {showCards.map(card => <ReviewCard key={card.review_id} reviewCard={card}/>)}
          {!!reviewCards.length && <button onClick={() => {loadReviews(reviewCards)}}>Load More</button>}
          <button onClick={() => {setModal(true)}}>Add A Review</button>
        </div>
      </div>
      {modal && <NewReview setModal={setModal} product={product} metadata={metadata} />}
    </div>
    )
};

export default Reviews;
