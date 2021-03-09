import React, { useState } from 'react';
import { Style } from './Style.jsx';
import HelpIcon from '@material-ui/icons/Help';

function ProductStyles(props) {
  let [selectedStyle, updateStyle] = useState(null);
  let [styleList, updateList] = useState({});
  let defaultImage = null;

  function currentStyle(e, style) {
    e.preventDefault();
    if (style.name !== selectedStyle) {
      updateStyle(selectedStyle = style.name);

      for (let k in styleList) {
        if (Number(k) === Number(style.id)) {
          updateList(styleList = {...styleList, [k]: false});
        } else {
          updateList(styleList = {...styleList, [k]: true});
        }
      }
    }
  }

  if (props.styles !== null) {

    return (
      <div>
        <h6>Style > {selectedStyle}</h6>
        {props.styles.map(style => {
          if (style.photos[0].thumbnail_url !== null) {
            defaultImage = style.photos[0].thumbnail_url;
          } else {
            defaultImage = null;
          }

          if (style['default?'] && selectedStyle === null) {
            updateStyle(selectedStyle = style.name);
            updateList(styleList = {...styleList, [style.style_id]: false})
          }

          if (styleList[style.style_id] === undefined) {
            updateList(styleList = {...styleList, [style.style_id]: true})
          }

          return (
            <div>
              <Style
                id={style.style_id}
                image={defaultImage}
                name={style.name}
                function={currentStyle}
                invisible={styleList[style.style_id]}
              />
            </div>
          )
        })}
      </div>
    )
  } else {
    return (<div></div>);
  }
}

export{
  ProductStyles,
}