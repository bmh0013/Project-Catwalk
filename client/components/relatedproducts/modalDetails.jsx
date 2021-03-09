import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const ModalDetails = props => {
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

    console.log('currentproductstyles', props.currentProductStyles)
    console.log('realtedItemsStyles', props.relatedItemsStyles)

  const classes = useStyles();

  function createData(compare_item_details, comparison, current_item_details) {
    if(!Array.isArray(compare_item_details) && !Array.isArray(current_item_details)) {
      return { compare_item_details, comparison, current_item_details}
    }

    let compareItemFeature = '❌';
    let currentItemFeature = '❌';

    for (let i = 0; i < compare_item_details.length; i++) {
      if (compare_item_details[i].feature === comparison) {
        compareItemFeature = compare_item_details[i].value
        break;
      }
    }
    for (let j = 0; j < current_item_details.length; j++) {
      if (current_item_details[j].feature === comparison) {
        currentItemFeature = current_item_details[j].value
        break;
      }
    }

    return { compare_item_details: compareItemFeature, comparison, current_item_details: currentItemFeature};
  }

  const rows = [
    createData(props.category, 'Category', props.currentProduct.category),
    createData(props.price, 'Price', props.currentProduct.default_price),
    createData(props.features.length, '# of Features', props.currentProduct['features'].length),
    createData(props.features, 'Sole', props.currentProduct['features']),
    createData(props.features, 'Material', props.currentProduct['features']),
    createData(props.features, 'Mid-Sole', props.currentProduct['features']),
    createData(props.features, 'Stitching', props.currentProduct['features']),
    createData(props.features, 'Lenses', props.currentProduct['features']),
    createData(props.features, 'UV Protection', props.currentProduct['features']),
    createData(props.features, 'Frames', props.currentProduct['features']),
    createData(props.features, 'Fabric', props.currentProduct['features']),
    createData(props.features, 'Button', props.currentProduct['features']),
    createData(props.features, 'Cut', props.currentProduct['features']),
    createData(props.relatedItemsStyles.results.length, '# of Styles', props.currentProductStyles.results.length),
    createData(props.relatedItemsStyles.results[0].name, 'Style Name', props.currentProductStyles.results[0].name),
  ];

  return (
    <TableContainer className = 'scroll-table'>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style ={{fontSize: 25}}>{props.name}</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center" style ={{fontSize: 25}}>{props.currentProduct.name}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow>
              <TableCell align="center" style ={{fontSize: 16}}>{row.compare_item_details}</TableCell>
              <TableCell align="center" style ={{fontSize: 16}}>{row.comparison}</TableCell>
              <TableCell align="center" style ={{fontSize: 16}}>{row.current_item_details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ModalDetails;