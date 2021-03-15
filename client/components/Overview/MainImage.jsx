import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile } from '@material-ui/core/';

function MainImage({currentStyle}) {
  console.log('MAIN: ', currentStyle);

  return (
    <div>
    {currentStyle.style_id && <div>
      <img src={currentStyle.photos[0].thumbnail_url}></img>
    </div>}
    {currentStyle.image && <div> <img src={currentStyle.image}></img></div>}
    </div>
  )
}

export{
  MainImage
}