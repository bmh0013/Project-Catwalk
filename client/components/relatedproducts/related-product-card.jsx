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
      <p>{name}</p>
      <p>{category}</p>
      <img src = {image} alt = {name} />
      <p>{price}</p>

      <Modal
        isOpen = {openModal}
        onRequestClose = {toggleModal}
        contentLabel = 'My Dialog'
        className = 'mymodal'
        overlayClassName = 'myoverlay'
        closeTimeoutMS = {500}
      >
        <ModalDetails name = {name} category = {category}/>
      </Modal>
    </div>
  )
};

export default RelatedProductCard;