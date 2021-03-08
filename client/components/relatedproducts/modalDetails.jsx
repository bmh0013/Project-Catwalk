// import React from 'react';

// const ModalDetails = (props) => {

//   console.log(props.features)
//   console.log('currentProduct', props.currentProduct);
//   console.log('currentproductstyles', props.currentProductStyles)

//   return(
//     <div className = 'modal-container'>
//       <h1 className = 'modal-heading'>COMPARING</h1>
//       <table className = 'modal-comparison'>
//         <tbody>
//           <tr className = 'modal-names-row'>
//             <th>{props.name}</th>
//             <th></th>
//             <th>{props.currentProduct.name}</th>
//           </tr>
//           <tr>
//             <th>{props.category}</th>
//             <th>Category</th>
//             <th>{props.currentProduct.category}</th>
//           </tr>
//           <tr>
//             <th>${props.price}</th>
//             <th>Price</th>
//             <th>${props.currentProduct.default_price}</th>
//           </tr>
//           <tr>
//             <th>{props.features.length}</th>
//             <th>Number of Features</th>
//             <th>{props.currentProduct['features'].length}</th>
//           </tr>
//           <tr>
//             <th>{props.features.length}</th>
//             <th>Sole</th>
//             <th>{props.currentProduct['features'].length}</th>
//           </tr>
//           <tr>
//             <th>{props.features.length}</th>
//             <th>Material</th>
//             <th>{props.currentProduct['features'].length}</th>
//           </tr>
//           <tr>
//             <th>{props.features.length}</th>
//             <th>Mid-Sole</th>
//             <th>{props.currentProduct['features'].length}</th>
//           </tr>
//           {/* <tr>
//             <th>{props.features.length}</th>
//             <th>Number of Styles</th>
//             <th>{props.currentProductStyles['results'].length}</th>
//           </tr> */}
//         </tbody>
//       </table>
//     </div>
//   )
// };

// export default ModalDetails;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function ModalDetails(props) {
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  function createData(compare_item_details, comparison, current_item_details) {
    return { compare_item_details, comparison, current_item_details };
  }

  const rows = [
    createData(props.category, 'Category', props.currentProduct.category),
    createData(props.price, 'Price', props.currentProduct.default_price),
    createData(props.features.length, '# of Features', props.currentProduct['features'].length),
    // createData(props.category, '# of Styles', props.currentProduct.category),
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">{props.name}</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center">{props.currentProduct.name}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.compare_item_details}</TableCell>
              <TableCell align="left">{row.comparison}</TableCell>
              <TableCell align="left">{row.current_item_details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}