import React from 'react';

function ProductPrice(props) {
  if (props.product !== null) {
    let price = props.price;
    return(
      <div>
        ${price}
      </div>
    )
  } else {
    return <div></div>
  }

}

export{
  ProductPrice
}