//this will take care of showing all the card details when a user clicks on a click

import React, {useState} from 'react';

const ModalDetails = ({name, category}) => {

  return(
    <div>
      <h1>{name}</h1>
      <h2>{category}</h2>
    </div>
  )
};

export default ModalDetails;

{/* <div className = 'modal-content'>
        <p>hello</p>
      </div> */}



      // console.log('does it reach here?');
      // const [openModal, setOpenModal] = useState(false);

      // const toggleModal = () => {
      //   setOpenModal(!openModal);
      // }

    //   <div className = 'card-modal'>
    //   <button onClick = {toggleModal}>Open Modal</button>
    //   <Modal
    //     isOpen = {openModal}
    //     onRequestClose = {toggleModal}
    //     contentLabel = 'My Dialog'
    //     className = 'mymodal'
    //     overlayClassName = 'myoverlay'
    //     closeTimeoutMS = {500}
    //   >
    //     <div>My modal dialog</div>
    //   </Modal>
    // </div>