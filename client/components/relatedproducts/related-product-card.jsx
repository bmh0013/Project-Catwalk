import React, {useState, useEffect} from 'react';
import {StarFill} from 'react-bootstrap-icons';
import Modal from 'react-modal';
import ModalDetails from './modalDetails.jsx';
import Rating from '../Overview/Rating.jsx';
import api from '../../../api.js';
import {StaticRating} from '../../starRating.jsx';

const RelatedProductCard = ({id, currentProductId, relatedItemsStyles, name, category, image, price, sendProductId, features, starRating}) => {

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

  useEffect(() => {
    getCurrentProductInfo(currentProductId)
  },[currentProductId])

  return (
    <div className = 'product-card'>
      <StarFill size = {21} className = 'star' onClick = {toggleModal}
        style = {{
          position: 'absolute',
          left: '16rem',
          top: '1.5rem',
          color: '#e8e8e8'
        }}
      />
      <img className = 'product-image' src = {image} alt = {name} />
      <div className = 'bottom-half-card' onClick = {() => sendProductId(id)}>
        <p className = 'product-category'>{category.toUpperCase()}</p>
        <p className = 'product-name'>{name}</p>
        <p className = 'product-price'>${price}</p>
        <div className = 'product-rating'><StaticRating data = {starRating} /></div>
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
        relatedItemsStyles = {relatedItemsStyles}
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