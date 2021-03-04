//this will take care of showing all the card details when a user clicks on a click

import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ModalDetails = ({currentProductId, name, category, price}) => {

  const [currentProduct, setCurrentProduct] = useState([]);

  useEffect(() => {
    const url = `/proxy/api/fec2/hratx/products/${currentProductId}`;
    axios.get(url)
      .then(res => {
        console.log('response data', res.data) //working fine
        setCurrentProduct(res.data)
      })
      .then(() => console.log('currentproduct', currentProduct))
      .catch(err => console.log(err))
  },[currentProductId])

  return(
    <div>
      <h1>COMPARING</h1>
      <h2>{currentProductId}</h2>
      <p>{name}<span className = 'comparison'>Name</span></p>
      <p>{category}<span className = 'comparison'>Category</span></p>
      <p>{price}<span className = 'comparison'>Price</span></p>

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