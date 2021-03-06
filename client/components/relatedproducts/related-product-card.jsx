import React, {useState} from 'react';
import {Star, StarFill} from 'react-bootstrap-icons';
import Modal from 'react-modal';
import ModalDetails from './modalDetails.jsx';

const RelatedProductCard = ({id, name, category, image, price, handleActionButton}) => {

  const [starFill, setStarFill] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  Modal.setAppElement('#root');

  const toggleStarFill = () => {
    setStarFill(!starFill);
  }

  const toggleModal = () => {
    setOpenModal(!openModal);
  }

  let starToggle;
    if (starFill) {
      starToggle =
        <span onClick = {toggleStarFill}>
          <i className ="fas fa-star clicker" onClick = {() => handleActionButton(id)}></i>
        </span>
    } else {
      starToggle =
        <span onClick = {toggleStarFill}>
          <i className ="far fa-star clicker" onClick = {() => handleActionButton(id)}></i>
        </span>
    }

  return (
    <div className = 'related-card' onClick = {toggleModal}>
      {starToggle}
      <img className = 'related-image' src = {image} alt = {name} />
      <p className = 'product-name'>{name}</p>
      <p className = 'product-category'>{category}</p>
      <p className = 'product-price'>{price}</p>

      <Modal
        isOpen = {openModal}
        onRequestClose = {toggleModal}
        contentLabel = 'My Dialog'
        className = 'mymodal'
        overlayClassName = 'myoverlay'
        closeTimeoutMS = {500}
      >
      <ModalDetails
        name = {name}
        category = {category}
        price = {price}
      />
      </Modal>
    </div>
  )
};

export default RelatedProductCard;