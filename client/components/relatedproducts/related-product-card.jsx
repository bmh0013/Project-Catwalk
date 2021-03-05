import React, {useState} from 'react';
import {StarFill} from 'react-bootstrap-icons';
import Modal from 'react-modal';
import ModalDetails from './modalDetails.jsx';

const RelatedProductCard = ({id, currentProductId, name, category, image, price, features}) => {

  const [openModal, setOpenModal] = useState(false);

  Modal.setAppElement('#root');

  const toggleModal = () => {
    setOpenModal(!openModal);
  }

  return (
    <div className = 'related-card'>
      <StarFill onClick = {toggleModal} />
      <img className = 'related-image' src = {image} alt = {name} />
      <p className = 'product-name'>{name}</p>
      <p className = 'product-category'>{category}</p>
      <p className = 'product-price'>{price}</p>

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