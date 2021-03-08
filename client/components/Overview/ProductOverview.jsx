import React from 'react';

function ProductOverview(props) {
  console.log('PROPS: ', props)
  if (props.product !== null) {
    let overview = props.overview;
    return(
      <div>
        {overview}
      </div>
    )
  } else {
    return <div></div>
  }

}

export{
  ProductOverview
}