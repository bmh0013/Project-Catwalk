import React, {useState} from 'react';
import {Star} from 'react-bootstrap-icons';
import Modal from 'react-modal';
import ModalDetails from './modalDetails.jsx';

const RelatedProductCard = ({id, currentProductId, name, category, image, price, features, starRating}) => {

  const [openModal, setOpenModal] = useState(false);

  Modal.setAppElement('#root');

  const toggleModal = () => {
    setOpenModal(!openModal);
  }

  console.log('star rating', starRating)

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
      <div className = 'bottom-half-card'>
        <p className = 'product-category'>{category}</p>
        <p className = 'product-name'>{name}</p>
        <p className = 'product-price'>{price}</p>
        {/* <p className = 'star-rating'>{starRating()}</p> */}
      </div>

      <Modal
        isOpen = {openModal}
        onRequestClose = {toggleModal}
        className = 'mymodal'
        overlayClassName = 'myoverlay'
      >
      {/* import all the necessary modal data here */}
      <ModalDetails
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