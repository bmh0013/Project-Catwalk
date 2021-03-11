import React from 'react';

function ProductPrice(props) {
  let price = props.price;
  return(
    <div>
      ${price}
    </div>
  )
}

export{
  ProductPrice
}