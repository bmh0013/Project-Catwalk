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
  var [count, updateCount] = useState(2);
  var [modal, setModal] = useState(false);

  useEffect(() => {
    fetchProductInfo()
    fetchReviews();
    fetchMetadata();
  }, []);

  useEffect(() => {
    return () => {
      if (count >= reviewCards.length) {
        document.getElementById("loadMoreBtn").style.display = "none";
      }
     }
  }, [count]);

  function fetchProductInfo() {
    API.getProduct(product_id)
    .then(res => {
      setProduct(res.data);
    })
    .catch(err => console.log(err));
  }

  function fetchReviews() {
    API.getReviewCards({ product_id })
    .then(res => setReviewCards(res.data.results))
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
      <h3>Ratings & Reviews</h3>
      <div className="flex-container">
        <div className="flex-left">
          {metadata && <Ratings metadata={metadata} reviewCards={reviewCards}/>}
        </div>
        <div className="flex-right">
          {reviewCards.slice(0, count).map(card => <ReviewCard key={card.review_id} reviewCard={card}/>)}
          {!!reviewCards.length && <button id="loadMoreBtn" onClick={loadMore}>Load More</button>}
          <button onClick={() => {setModal(true)}}>Add A Review</button>
        </div>
      </div>
      {modal && <NewReview setModal={setModal} product={product} metadata={metadata} />}
    </div>
    )
};

export default Reviews;
