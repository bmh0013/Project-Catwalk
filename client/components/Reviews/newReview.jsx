import React, { useState, useEffect } from 'react';
import TOKEN from '../../../token.js';
import API from '../../../api.js';
import { HoverRating } from '../../starRating.jsx';
const axios = require('axios').default;

const NewReview = ({ product, metadata, setModal }) => {
  let [reviewImages, setReviewImages] = useState([]);

  function closeModal() {
    setModal(false);
  }

  function handleUploadImages(e) {
    document.getElementById('thumbnails').innerHTML = '';
    let image;
    for (let i = 0; i < e.target.files.length; i++) {
      image = URL.createObjectURL(e.target.files[i]);
      setReviewImages(prevImages => [...prevImages, image]);
    }
  }

  function handleSubmitReview(e) {
    e.preventDefault();
    const rating = document.getElementById('hover-rating').getAttribute('value');

    if (rating === null) {
      alert('Please select a rating');
    } else {
      setModal(false);
      const form = document.getElementById('newReview').elements;
      let characteristics = {};
      const charList = Object.keys(metadata.characteristics);

      charList.forEach(char => {
        const char_id = metadata.characteristics[char].id
        const value = form[char].value;
        characteristics[char_id] = Number(value);
      })

      const json = {
        product_id: product.id,
        rating: Number(rating),
        summary: form.summary.value || '',
        body: form.body.value,
        recommend: Boolean(form.recommend.value),
        name: form.nickname.value,
        email: form.email.value,
        photos: [],
        characteristics: characteristics
      };

      API.postReview(json)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }
  }

  const form = (
    <form id="newReview" onSubmit={handleSubmitReview}>
    <div className="field">
      <label className="label required">Overall Rating</label><br/>
      <HoverRating />
    </div>

    <div className="field">
      <label className="label required">Do you recommend this product?</label><br/>
      <input name="recommend" type="radio" value="true" required/>Yes
      <input name="recommend" type="radio" value="false" required/>No
    </div>

    <div className="field">
      <h5 className="label required">Characteristics:</h5><br/>
      {!!metadata.characteristics.Size &&
        <span>
          <label className="label" required>Size</label><br/>
          <input name="Size" type="radio" value="1" required/>1
          <input name="Size" type="radio" value="2" required/>2
          <input name="Size" type="radio" value="3" required/>3
          <input name="Size" type="radio" value="4" required/>4
          <input name="Size" type="radio" value="5" required/>5
          <br/>
        </span>
      }
      {!!metadata.characteristics.Width &&
        <span>
          <label className="label" required>Width</label><br/>
          <input name="Width" type="radio" value="1" required/>1
          <input name="Width" type="radio" value="2" required/>2
          <input name="Width" type="radio" value="3" required/>3
          <input name="Width" type="radio" value="4" required/>4
          <input name="Width" type="radio" value="5" required/>5
          <br/>
        </span>
      }
      {!!metadata.characteristics.Comfort &&
        <span>
          <label className="label" required>Comfort</label><br/>
          <input name="Comfort" type="radio" value="1" required/>1
          <input name="Comfort" type="radio" value="2" required/>2
          <input name="Comfort" type="radio" value="3" required/>3
          <input name="Comfort" type="radio" value="4" required/>4
          <input name="Comfort" type="radio" value="5" required/>5
          <br/>
        </span>
      }
      {!!metadata.characteristics.Quality &&
        <span>
          <label className="label" required>Quality</label><br/>
          <input name="Quality" type="radio" value="1" required/>1
          <input name="Quality" type="radio" value="2" required/>2
          <input name="Quality" type="radio" value="3" required/>3
          <input name="Quality" type="radio" value="4" required/>4
          <input name="Quality" type="radio" value="5" required/>5
          <br/>
        </span>
      }
      {!!metadata.characteristics.Length &&
        <span>
          <label className="label" required>Length</label><br/>
          <input name="Length" type="radio" value="1" required/>1
          <input name="Length" type="radio" value="2" required/>2
          <input name="Length" type="radio" value="3" required/>3
          <input name="Length" type="radio" value="4" required/>4
          <input name="Length" type="radio" value="5" required/>5
          <br/>
        </span>
      }
      {!!metadata.characteristics.Fit &&
        <span>
          <label className="label" required>Fit</label><br/>
          <input name="Fit" type="radio" value="1" required/>1
          <input name="Fit" type="radio" value="2" required/>2
          <input name="Fit" type="radio" value="3" required/>3
          <input name="Fit" type="radio" value="4" required/>4
          <input name="Fit" type="radio" value="5" required/>5
        </span>
      }
    </div>

    <div className="field">
      <label className="label">Review Summary</label><br/>
      <input type="text" name="summary" maxLength="60" placeholder="Enter text here..." />
    </div>

    <div className="field">
      <label className="label required">Review Body</label><br/>
      <textarea maxLength="1000" name="body" placeholder="Why did you like the product or not?" required></textarea>
    </div>

    <div className="field">
      <label className="label">Upload Images:</label>
      <input type="file" name="photos" onChange={handleUploadImages} accept="image/*" multiple />
      <span id="thumbnails">
        {reviewImages.map(image => <img src={image} key={image} className="thumbnail"></img>)}
      </span>
    </div>

    <div className="field">
      <label className="label required">Nickname:</label><br/>
      <input type="text" name="nickname" maxLength="60" placeholder="Example: jackson11!" required />
    </div>

    <div className="field">
      <label className="label required">Email:</label><br/>
      <input type="text" name="email" maxLength="60" placeholder="Example: jackson11@email.com" required />
    </div>

    <input type="submit" />

    </form>
  );

  return (
    <div className='modal-outer'>
      <div className='modal-inner'>
        <button className="close" onClick={closeModal}>X</button>
        <h3>Write Your Review About: {product.name}</h3>
        {form}
      </div>
    </div>
    )
};

export default NewReview;