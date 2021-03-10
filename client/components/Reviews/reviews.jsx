import React, { useState, useEffect } from 'react';
import TOKEN from '../../../token.js';
import ReviewCard from './reviewCard.jsx';
import Ratings from './ratings.jsx';
import NewReview from './newReview.jsx';
import API from '../../../api.js';
const axios = require('axios').default;


const Reviews = ({ product_id }) => {
  let [product, setProduct] = useState();
  let [reviewCards, setReviewCards] = useState([]);
  let [metadata, setMetadata] = useState();
  let [count, updateCount] = useState(2);
  let [modal, setModal] = useState(false);

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
    API.getReviewCards({
      product_id : product_id,
      sort: 'relevant'
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
      <h3>Ratings & Reviews</h3>
      <div className="flex-container">
        <div className="flex-left">
          {metadata && <Ratings metadata={metadata} reviewCards={reviewCards}/>}
        </div>
        <div className="flex-right">
          <div>
            <h3>{reviewCards.length} reviews, sort by
              <div className="dropdown">
                <button className="dropbtn">relevant <span className="down-caret">></span></button>
                <div className="dropdown-content">
                  <a >helpful</a>
                  <a >newest</a>
                </div>
              </div>
            </h3>
            <div className="review-cards-container">
              {reviewCards.slice(0, count).map(card => <ReviewCard key={card.review_id} reviewCard={card}/>)}
              {reviewCards.length > count && <button id="loadMoreBtn" onClick={loadMore}>Load More</button>}
              <button onClick={() => {setModal(true)}}>Add A Review</button>
            </div>
          </div>
        </div>
      </div>
      {modal && <NewReview setModal={setModal} product={product} metadata={metadata} />}
    </div>
    )
};

export default Reviews;
