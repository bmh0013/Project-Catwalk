import React, {useState, useEffect} from 'react';
import {Star} from 'react-bootstrap-icons';
import Modal from 'react-modal';
import ModalDetails from './modalDetails.jsx';
import Rating from '../Overview/Rating.jsx';
import api from '../../../api.js';

const RelatedProductCard = ({id, currentProductId, name, category, image, price, sendProductId, features}) => {

  const [openModal, setOpenModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [currentProductStyles, setCurrentProductStyles] = useState([]);

  Modal.setAppElement('#root');

  const toggleModal = () => {
    setOpenModal(!openModal);
  }

  const getCurrentProductInfo = async(currentProductId) => {
    await api.getProduct(currentProductId)
      .then(res => setCurrentProduct(res.data))
      .then(() => api.getProductStyles(currentProductId))
      .then(res => setCurrentProductStyles(res.data))
      .catch(err => console.log('error updating modal', err))
  };

  //should run whenever a new current product id has changed
  useEffect(() => {
    getCurrentProductInfo(currentProductId)
  },[currentProductId])

  // console.log('star rating', starRating)

  return (
    <div className = 'product-card'>
      <Star size = {21} className = 'star' onClick = {toggleModal}
        style = {{
          position: 'absolute',
          left: '20.5rem',
          top: '1.5rem',
          color: 'white'
        }}
      />
      <img className = 'product-image' src = {image} alt = {name} />
      <div className = 'bottom-half-card' onClick = {() => sendProductId(id)}>
        <p className = 'product-category'>{category}</p>
        <p className = 'product-name'>{name}</p>
        <p className = 'product-price'>${price}</p>
        <div className=  'star-rating'>Star rating goes herekk</div>
        {/* <div className = 'star-rating'>{starRating}</div> */}
      </div>

      <Modal
        isOpen = {openModal}
        onRequestClose = {toggleModal}
        className = 'mymodal'
        overlayClassName = 'myoverlay'
      >
      {/* import all the necessary modal data here */}
      <ModalDetails
        currentProduct = {currentProduct}
        currentProductStyles = {currentProductStyles}
        name = {name}
        currentProductId = {currentProductId}
        category = {category}
        price = {price}
        features = {features}
      />
      </Modal>
    </div>
  )
};

export default RelatedProductCard;