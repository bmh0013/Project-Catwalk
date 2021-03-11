import React, { useState } from 'react';
import { Style } from './Style.jsx';
import HelpIcon from '@material-ui/icons/Help';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { AllSizes } from './AllSizes.jsx';

function ProductStyles(props) {
  let [selectedStyle, updateStyle] = useState(null);
  let [styleList, updateList] = useState({});
  let [sizes, updateSizes] = useState([]);
  let defaultImage = null;

  function currentStyle(e, style) {
    e.preventDefault();
    if (style.name !== selectedStyle) {
      updateStyle(selectedStyle = style);

      for (let k in styleList) {
        if (Number(k) === Number(style.id)) {
          updateList(styleList = {...styleList, [k]: false});
        } else {
          updateList(styleList = {...styleList, [k]: true});
        }
      }
    }
  }

  return (
    <div>
      <div>
      <h6>Style > {selectedStyle ? selectedStyle.name : ''}</h6>
      </div>

      {props.styles.map(style => {
        let firstStyle = props.styles[0];
        if (style.photos[0].thumbnail_url !== null) {
          defaultImage = style.photos[0].thumbnail_url;
        } else {
          defaultImage = null;
        }

        if (style.style_id === firstStyle.style_id && selectedStyle === null) {
          updateStyle(selectedStyle = style);
          updateSizes(sizes = [...sizes, [ style.style_id, style.skus ]]);
          updateList(styleList = {...styleList, [style.style_id]: false})
        }

        if (styleList[style.style_id] === undefined) {
          updateList(styleList = {...styleList, [style.style_id]: true})
          updateSizes(sizes = [...sizes, [ style.style_id, style.skus ]]);
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

      {/* GET SIZES
      {(() => {
          const useStyles = makeStyles((theme) => ({
            formControl: {
              margin: theme.spacing(1),
              minWidth: 120,
            },
            selectEmpty: {
              marginTop: theme.spacing(2),
            },
          }));

          const classes = useStyles();
          const [size, setSize] = useState('');
          const handleChange = (event) => {
            setSize(event.target.value);
          };

          let styleData = undefined;
          sizes.map(arr => {
            console.log('ARR: ', arr)
            if (arr[0] === selectedStyle.id || arr[0] === selectedStyle.style_id) {
              styleData = arr[1];
            }
          })

          return (
            <div>
              <FormControl className={classes.formControl}>
                <InputLabel id="SizeChart">Select size</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="select"
                  value={size}
                  onChange={handleChange}
                >
                  <AllSizes sizes={styleData} />
                </Select>
              </FormControl>
            </div>
          );
        })
      } */}
    </div>
  )
}


export{
  ProductStyles,
}