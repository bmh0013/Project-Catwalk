import React from 'react';

function ProductOverview(props) {
  let overview = props.overview;
  return(
    <div>
      {overview}
    </div>
  )
}


export{
  ProductOverview
}