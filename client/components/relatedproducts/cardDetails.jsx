//this will take care of showing all the card details when a user clicks on a click

import React, {useState} from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const CardDetails = () => {

  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  }

  return(
    <div className = 'card-modal'>
      <button onClick = {toggleModal}>Open Modal</button>
      <Modal
        isOpen = {openModal}
        onRequestClose = {toggleModal}
        contentLabel = 'My Dialog'
        className = 'mymodal'
        overlayClassName = 'myoverlay'
        closeTimeoutMS = {500}
      >
        <div>My modal dialog</div>
      </Modal>
    </div>
  )
};

export default CardDetails;

{/* <div className = 'modal-content'>
        <p>hello</p>
      </div> */}