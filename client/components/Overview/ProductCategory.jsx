import React from 'react';

function ProductCategory(props) {
  if (props.product !== null) {
    let category = props.category;
    return(
      <div>
        {category}
      </div>
    )
  } else {
    return <div></div>
  }
}

export{
  ProductCategory,
}