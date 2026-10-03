import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React,{useEffect,useState} from 'react'
import pref from '../../Common/pref';

const EditModifying_Lender_Table = ({ data }: any) => {
  let state;
  const [stateValue,setStateValue]=useState('');
 useEffect(()=>{
pref.map((place:any)=>{

  if(place.id===data.memberLibrary.state){
   
    state= place.name
   setStateValue(state);
  }
})

 },[]);

  
  return (
    <TableContainer component={Paper} className='edit-table-root'>
      <Table aria-label='company table'>
        <TableHead>
          <TableRow>
            <TableCell className='edit-table-root-col1 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right'>貸出者氏名</TableCell>
            <TableCell className='edit-table-root-col2 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right'>ふりがな</TableCell>
            <TableCell className='edit-table-root-col3 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right'>都道府県</TableCell>
            <TableCell className='edit-table-root-col4 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right'>市町村</TableCell>
            <TableCell className='edit-table-root-col5 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right'>E-mail</TableCell>
            <TableCell className='edit-table-root-col6 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right'>電話番号</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='editModifying_cell_background'>
          <TableRow>
            {/* data.memberLibrary.state */}
            <TableCell className='edit-table-root-col1 cell-paddingreserv edit-table-root-border-right'>{`${data.memberLibrary.nameLast}${' '} ${data.memberLibrary.nameFirst}`}</TableCell>
            <TableCell className='edit-table-root-col2 cell-paddingreserv edit-table-root-border-right'>{data.memberLibrary.phoneticCom1}</TableCell>
            <TableCell className='edit-table-root-col3 cell-paddingreserv edit-table-root-border-right'>{stateValue}</TableCell>
            <TableCell className='edit-table-root-col4 cell-paddingreserv edit-table-root-border-right'>{data.memberLibrary.address1}</TableCell>
            <TableCell className='edit-table-root-col5 cell-paddingreserv edit-table-root-border-right'>{data.memberLibrary.email}</TableCell>
            <TableCell className='edit-table-root-col6 cell-paddingreserv edit-table-root-border-right'>{data.memberLibrary.phone}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EditModifying_Lender_Table;
