import { TableRow, TableCell, Grid } from '@mui/material';
import { useForm, Controller } from "react-hook-form";

import InputEditComponent from './InputEditComponent';
const TableRowComponent = ({ cell0, cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8, cell9, cell10, cell11,
    handleCheckboxChange }: any) => {

    return (
        <TableRow>
            {cell1 == "checkbox" ? <TableCell className='Table-root-border-right-bottom '>
                <input type="checkbox" value={cell2} onChange={handleCheckboxChange} /></TableCell> :
                <TableCell className=' Table-root-col1 cell-padding  Table-root-border-right-bottom  '></TableCell>}
            <TableCell className=' Table-root-col2 cell-padding Table-root-border-right-bottom  ' >{cell2}</TableCell>
            <TableCell className='Table-root-col3 cell-padding  Table-root-border-right-bottom  '>{cell3}</TableCell>
            <TableCell className='Table-root-col4 cell-padding Table-root-border-right-bottom '>{cell4}</TableCell>
            <TableCell className='Table-root-col5 cell-padding Table-root-border-right-bottom '>{cell5}</TableCell>
            <TableCell className='Table-root-col6 cell-padding Table-root-border-right-bottom '>{cell6}</TableCell>
            <TableCell className='Table-root-col7 cell-padding Table-root-border-right-bottom '>{cell7}</TableCell>
            <TableCell className='Table-root-col8 cell-padding Table-root-border-right-bottom '>{cell8}</TableCell>
            <TableCell className='Table-root-col9 cell-padding Table-root-border-right-bottom '>{cell9}</TableCell>
            <TableCell className='Table-root-col10 cell-padding Table-root-border-right-bottom '>{cell10}</TableCell>
            <TableCell className='Table-root-col11 cell-padding  Table-root-border-right-bottom '>{cell11}</TableCell>
        </TableRow>
    );
}

export default TableRowComponent;
