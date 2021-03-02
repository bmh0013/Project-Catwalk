import React, {useState, useEffect} from 'react';
import RelatedProductCard from './related-product-card.jsx';
import axios from 'axios';

const RelatedList = () => {

  //use hooks to render the intial set of data from the API
  const [data, setData] = useState([]);

  //this will do a componentDidMount-like functionality
  useEffect(() => {
    const url = '/proxy/api/fec2/hratx/products';
    axios.get(url)
      .then(res => console.log(res.data))
      .catch(err => console.log('i get error here',err))
  }, [])

  return (
    <div className = 'related-list'>
      <h1>Related items</h1>
    </div>
  )
};

export default RelatedList;