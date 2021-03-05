import React from 'react';

function ProductTitle(props) {
  if (props.product !== null) {
    let title = props.title;
    return(
      <div>
        {title}
      </div>
    )
  } else {
    return <div></div>
  }

}

export{
  ProductTitle
}