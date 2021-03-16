import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList, GridListTile } from '@material-ui/core/';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 150,
    height: 300,
  },
}));


function Gallery(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight={100} className={classes.gridList} cols={1}>
      {
        Object.values(props.styles).map(photos => {
          for (let i = 0; i < photos.length; i++) {
            return (
              <GridListTile >
                <img src={photos[i].thumbnail_url} onClick={event => props.function()} />
              </GridListTile>
            )
          }
        })
      }
      </GridList>
    </div>
  );
}

export{
  Gallery
}