import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const BookTableList = ({ booklist ,selectedIds,handleCheckboxChange,handleCheckboxAllChange}: any) => { 
  return (
    <TableContainer component={Paper} className="edit-table-root">
    <Table aria-aria-label="company table">
      <TableHead>
        <TableRow>
          <TableCell className="edit-table-root-col7 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
          <input type="checkbox" 
                    name="checkboxall"
                    checked={selectedIds?.length > 1}
                    onChange={handleCheckboxAllChange}
                    />
          </TableCell>
         
          <TableCell className="edit-table-root-col11 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
            連番
          </TableCell>
          <TableCell className="edit-table-root-col12 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
            ISBN
          </TableCell>
          <TableCell className="edit-table-root-col13 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
            タイトル
          </TableCell>
          <TableCell className="edit-table-root-col14 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
            著作名
          </TableCell>
          <TableCell className="edit-table-root-col15 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
            編集・監修
          </TableCell>
          <TableCell className="edit-table-root-col16 cell-paddingreserv editModifyingHeaderBold edit-table-root-border-right">
            発売元
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody className="editModifying_cell_background">
        {booklist&& booklist.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="edit-table-root-col7 cell-paddingreserv edit-table-root-border-right-bottom">
            <input type="checkbox" value={item.id} 
            name="checkboxsingle"
            checked={selectedIds?.includes(item.id)}
            onChange={(e) => {
                 handleCheckboxChange(e, item.id);
                 // Handle individual row selection here
             }} />
            </TableCell>
            <TableCell className="edit-table-root-col11 cell-paddingreserv edit-table-root-border-right-bottom">
              {item.bookNo&&item.bookNo}
            </TableCell>
            <TableCell className="edit-table-root-col12 cell-paddingreserv edit-table-root-border-right-bottom">
              <label className="black">{item.isbnCode&&item.isbnCode}</label>
            </TableCell>
            <TableCell className="edit-table-root-col13 cell-paddingreserv edit-table-root-border-right-bottom">
              <label className="black">{item.title&&item.title}</label>
            </TableCell>
            <TableCell className="edit-table-root-col14 cell-paddingreserv edit-table-root-border-right-bottom">
              <label className="black">{item.author&&item.author}</label>
            </TableCell>
            <TableCell className="edit-table-root-col15 cell-paddingreserv edit-table-root-border-right-bottom">
              <label className="black">{item.editSupervision&&item.editSupervision}</label>
            </TableCell>
            <TableCell className="edit-table-root-col16 cell-paddingreserv edit-table-root-border-right-bottom">
              <label className="black">{item.publisher&&item.publisher}</label>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default BookTableList;
