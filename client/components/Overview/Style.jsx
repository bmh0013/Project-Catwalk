import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import CheckIcon from '@material-ui/icons/Check';
import Avatar from '@material-ui/core/Avatar';
import HelpIcon from '@material-ui/icons/Help';

function Style(props) {
  if (props.image !== null) {
    return(
      <div id="style">
        <Badge badgeContent={<CheckIcon fontSize="small"/>} color={'primary'} invisible={props.invisible}>
          <Avatar src={props.image} key={props.id} onClick={event => props.function(event, props)}/>
        </Badge>
      </div>
    )
  } else {
    return(
      <div id="style">
        <Badge badgeContent={<CheckIcon fontSize="small"/>} color={'primary'} invisible={props.invisible}>
          <Avatar key={props.id} onClick={event => props.function(event, props)}>
            <HelpIcon fontSize="large"/>
          </Avatar>
        </Badge>
      </div>
    )
  }
}

export{
  Style
}