import React, {useState, useEffect} from 'react';
import RelatedProductCard from './related-product-card.jsx';
import axios from 'axios';

const RelatedList = () => {

  //use hooks to render the intial set of data from the API
  //the productId state value should be dependent on lukas's product overview section
  const [productId, setProductId] = useState(['21111']);
  //this will be an array of productID based off the productID state
  const [relatedItems, setRelatedItems] = useState([]);
  //this will generate an array of objects in accordance to the relatedItems
  const [relatedItemsData, setRelatedItemsData] = useState({});

  //this will do a componentDidMount-like functionality
  useEffect(() => {
    const url = `/proxy/api/fec2/hratx/products/${productId}/related`;
    axios.get(url)
      .then(res => {
        setRelatedItems(res.data);
      })
      .catch(err => console.log(err))
  }, [productId])

  //do useEffect again to pull all the data in accordance to the relatedItems array
  useEffect(() => {
    console.log(relatedItems);
  },[relatedItems])


  return (
    <div className = 'related-list'>
      <h1>Related items</h1>
    </div>
  )
};

export default RelatedList;