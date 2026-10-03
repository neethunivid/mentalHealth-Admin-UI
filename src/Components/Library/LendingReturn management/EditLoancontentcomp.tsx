import React, {useRef, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Grid,Typography, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../Redux/actions';
import ApiClient from '../../../API/API-client';
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import { formatDateArray1, getCurrentDate } from '../../Common/Date_conversion';
import '../Common/library.scss';



const Edit_LoanLendercompo = () => {
  //defining the columns and headers of datagrid
  const columns: GridColDef[] = [


    {
      field: 'Ledername', headerName: '貸出者氏名', sortable:false,
      renderCell: (params:any) => {
        if (params?.row?.member?.changeDate) {
          return formatDateArray1(params?.row?.member?.changeDate)
        }
        else{
          return null
        } // Return a fallback value if the array is undefined or doesn't have enough elements
     },
      width:150, headerClassName: "headergridcell_blue1",cellClassName:"gridcolumn-cells blacktxt",headerAlign:"center"
    },
  
    { field: 'furigana', headerName: 'ふりがな', width:60,sortable:false,
    renderCell: (params:any) => {
     if (params.row?.member && params.row?.member?.memberno) {
       return params.row?.member?.memberno;
     }
     // Return a fallback value if the property is not available
     return null;
   }, headerClassName: "headergridcell_blue1",cellClassName:"gridcolumn-cells blacktxt",headerAlign:"center" },
   {
     field: 'pref', headerName: '都道府県', width:150,sortable:false,
     renderCell: (params) => {
       const fullName = `${params.row?.member?.name} ${params.row?.member?.name2}`; // Combine name and name2 fields
 
       return (
        <Tooltip title={fullName}>
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{fullName}</div>
        </Tooltip>
       );
     }, headerClassName: "headergridcell_blue1",cellClassName:"gridcolumn-cells blacktxt",headerAlign:"center"
   },
   { field: 'muncipality', headerName: '市町村', width:150, sortable:false,maxWidth:200,
   renderCell: (params:any) => {
     if (params.row?.member && params.row?.member?.memberid) {
      return (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{params.row?.member?.memberid}</div>
       );
     }
     return null;
   }, headerClassName: "headergridcell_blue1",cellClassName:"gridcolumn-cells blacktxt",headerAlign:"center" },
   
   { field: 'Email', headerName: 'E-mail', flex:1, headerClassName: "headergridcell_blue1" ,cellClassName:"gridcolumn-cells blacktxt",headerAlign:"center",sortable:false,
    renderCell: (params:any) => {
     const sexValue = params?.row?.member?.sex === 1 ? 'Male' : 'Female';
     return <span>{sexValue}</span>;
   },},
   {
     field: 'telephone', headerName: '電話番号',sortable:false,
     renderCell: (params:any) => {
      if (params?.row?.member?.dob) {
        return formatDateArray1(params?.row?.member?.dob)
      }
      else{
        return null
      }
     },
     width:120, headerClassName: "headergridcell_blue1",cellClassName:"gridcolumn-cells blacktxt",headerAlign:"center"
   },
   
 ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //storing data into redux store
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.history_list
  });
  
  const gridRef = useRef(null);

  

  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    try {
      const req = {
      };
     dispatch(fetchData("history_list", "api/members/withdrawlist", req));
      if (!data || !Array.isArray(data)) {
        return null; 
      }
      else if (!data) {

      }

    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
 

//function to download csv file
const downloadFile = (data: any, fileName: any, fileType: any) => {
  const blob = new Blob(["\ufeff" + data], { type: "text/csv;charset=UTF-8" })
  const a = document.createElement('a');
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  a.dispatchEvent(clickEvt);
  a.remove();
};
//download api
const handleDownload = async () => {
  const dataRequest = {
    "withdrawList":true,
    
}
  try {
    const apiData = await ApiClient.post('api/export/member', dataRequest);
    //function for getting currentdate and time along with the filename while downloading
    const formattedDate = getCurrentDate();
    if (apiData && apiData.data) {
      downloadFile(apiData.data, `withdraw_member_${formattedDate}`, 'text/csv')
    }
  } catch (error: any) {
    if (error.response && error.response.status === 403) {
      console.log("403 error occurred");
    } else {
      console.log("Error occurred:", error);
    }
  }
};

//getting two diffrent colours for even and odd rows
  const getRowStyleParams = (params: any) =>
    params.indexRelativeToCurrentPage  % 2 === 0 ? "mbr-list-bg1" : "mbr-list-bg1";

    const getRowId = (row: any) => {
      if (row.member && row.member?.id) {
        return row.member?.id;
      }
      // Return a fallback value if the property is not available
      return '';
    };
  return (
    <Box >
    
      <Grid container xs={12} ref={gridRef}>
        

       
        
               
           
          {data && data?.data && data?.data?.length !== 0 ?(
          <>
           <Grid xs={12}  padding={1} spacing={1} className="data-grid-container">
            <DataGrid 
           
              rows={data?.data??[]}
              getRowId={getRowId}
              columns={columns}
              getRowClassName={getRowStyleParams}
              hideFooterPagination={true}
              hideFooter={true}
              disableColumnMenu={true} 
              autoHeight
              rowHeight={38} // Set your desired row height here (default is 52)
              columnHeaderHeight={38}
              
        
              
            
            /></Grid>
           
            </>) : <div></div>}
        
        
      </Grid>
        

    </Box>
  );
};

export default Edit_LoanLendercompo;
