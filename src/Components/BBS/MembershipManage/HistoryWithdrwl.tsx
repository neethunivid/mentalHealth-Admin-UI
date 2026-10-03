import React, {useRef, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, Grid,Typography, } from '@mui/material';
import LeftPanBBS from '../../Common/LeftPanBBS';
import { useDispatch, useSelector } from 'react-redux';
import '../../../assets/css/health.css'
import { fetchData } from '../../../Redux/actions';
import '../MembershipManage/membermanagestyle.scss';
import downloadbtn from '../../../assets/images/5thpage_btn.gif'
import ApiClient from '../../../API/API-client';
import { useNavigate } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import { formatDateArray1, getCurrentDate } from '../../Common/Date_conversion';
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
import arrowForward from "../../../assets/images/6th_btn_next.gif";


const Histroy_withdrawal = () => {
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
  const [selectedValue, setSelectedValue] = useState<any>(10);
  const [pagesizevalue, setpagesizevalue] = useState<any>(10);
  const [currentPage, setCurrentPage] = useState(1); 
  
  //defining the columns and headers of datagrid
  const columns: GridColDef[] = [


    {
      field: 'changeDate', headerName: '退会日', sortable:false,
      renderCell: (params:any) => {
        if (params?.row?.member?.date) {
          return formatDateArray1(params?.row?.member?.date)
        }
        else{
          return null
        } // Return a fallback value if the array is undefined or doesn't have enough elements
     },
      width:80, headerClassName: "sixth_bdr_top_bottom",cellClassName:"dgrid_column-cell blacktxt",headerAlign:"center"
    },
  
    { field: 'memberno', headerName: '会員番号', width:60,sortable:false,
    renderCell: (params:any) => {
     if (params.row?.member && params.row?.member?.memberno) {
       return params.row?.member?.memberno;
     }
     // Return a fallback value if the property is not available
     return null;
   }, headerClassName: "sixth_bdr_top_bottom",cellClassName:"dgrid_column-cell blacktxt",headerAlign:"center" },
   {
     field: 'name', headerName: '名前', width:100,sortable:false,maxWidth:200,
     renderCell: (params) => {
       const fullName = `${params.row?.member?.name} ${params.row?.member?.name2}`; // Combine name and name2 fields
 
       return (
        <Tooltip title={fullName}>
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{fullName}</div>
        </Tooltip>
       );
     }, headerClassName: "sixth_bdr_top_bottom",cellClassName:"dgrid_column-cell blacktxt",headerAlign:"center"
   },
   { field: 'memberid', headerName: 'ID', width:130, sortable:false,maxWidth:200,
   renderCell: (params:any) => {
     if (params.row?.member && params.row?.member?.memberid) {
      return (
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{params.row?.member?.memberid}</div>
       );
     }
     return null;
   }, headerClassName: "sixth_bdr_top_bottom",cellClassName:"dgrid_column-cell blacktxt",headerAlign:"center" },
   { field: 'password', headerName: 'パスワード', width:120,sortable:false,maxWidth:200,
   renderCell: (params:any) => {
     if (params?.row?.member && params?.row?.member?.password) {
       return params.row?.member?.password;
     }
     return null;
   }, headerClassName: "sixth_bdr_top_bottom",cellClassName:"dgrid_column-cell blacktxt" ,headerAlign:"center"},
   { field: 'sex', headerName: '性別', width:60, headerClassName: "sixth_bdr_top_bottom" ,cellClassName:"dgrid_column-cell blacktxt",headerAlign:"center",sortable:false,
    renderCell: (params:any) => {
     const sexValue = params?.row?.member?.sex === 1 ? 'Male' : 'Female';
     return <span>{sexValue}</span>;
   },},
   {
     field: 'dob', headerName: '生年月日',sortable:false,
     renderCell: (params:any) => {
      if (params?.row?.member?.dob) {
        return formatDateArray1(params?.row?.member?.dob)
      }
      else{
        return null
      }
     },
     width:80, headerClassName: "sixth_bdr_top_bottom",cellClassName:"dgrid_column-cell blacktxt",headerAlign:"center"
   },
   { field: 'job_additional', headerName: '職業', width:100,sortable:false,maxWidth:200,
   renderCell: (params:any) => {
     if (params?.row?.member && params?.row?.member?.job_additional) {
      return(
      <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', textAlign: 'center' }}>
      { params?.row?.member?.job_additional}
    </div>
      );
      
     }
     return null;
   }, headerClassName: "sixth_bdr_top_bottom" ,cellClassName:"dgrid_column-cell blacktxt",headerAlign:"center"},
   {
     field: 'joinDate', headerName: '入会日',sortable:false,
     renderCell: (params:any) => {
      if (params?.row?.member?.joinDate) {
        return formatDateArray1(params?.row?.member?.joinDate)
      }
      else{
        return null
      }
     },
     width:80, headerClassName: "sixth_bdr_top_bottom",cellClassName:"dgrid_column-cell blacktxt",headerAlign:"center"
   },
   { field: 'email_pc', headerName: 'eメール', flex:1,sortable:false,
   renderCell: (params:any) => {
     if (params.row?.member && params.row?.member?.email_pc) {
      return(
        <Tooltip title={params.row?.member?.email_pc}>
            <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {params.row?.member?.email_pc}
            </div>
          </Tooltip>
      );
     }
     return null;
   }, headerClassName: "sixth_bdr_top_bottom",cellClassName:"dgrid_column-cell blacktxt",headerAlign:"center" },
   { field: 'deletedReason', headerName: '理由',width:150,maxWidth:200,
   renderCell: (params:any) => {
    if (params.row?.member?.changeCause) {
     return(
     <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', textAlign: 'center' }}>
     { params.row?.member?.changeCause}
   </div>
     );
     
    }
    return null;
  }, headerClassName: "sixth_bdr_top_bottom",cellClassName:"dgrid_column-cell blacktxt" ,headerAlign:"center",sortable:false,},
 
   
 ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //storing data into redux store
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.history_list
  });
  // Create a ref object named 'gridRef' initialized with a value of 'null'
  const gridRef = useRef(null);

  //calss the list api in the onloading

  useEffect(() => {
    fetchUsers(10,1);
  }, []);

//withdrawlistapi
  const fetchUsers = async (pagesize: any,
    pageNumber: number = 1,
   ) => {
    pageNumber -= 1;
    try {
      const req = {
        pageNumber:pageNumber,
        pageSize:pagesize
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
      console.error("403 error occurred");
    } else {
      console.error("Error occurred:", error);
    }
  }
};
//pagination
const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLSelectElement>
) => {
  setRowsPerPage(event.target.value);
  setpagesizevalue(event.target.value);
  setSelectedValue(event.target.value);
  setCurrentPage(1);
  fetchUsers(event.target.value,1);

};
//pageselectiondata for pagination
const jsonData = [
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "75", label: "75" },
  { value: "100", label: "100" }
];
//pagination
const goToPage = (pageNumber: number) => {
  setCurrentPage(pageNumber);
  fetchUsers(selectedValue,pageNumber)

};
//pagination 
const getPageInfo = (data: any) => {
  let page: any = currentPage ? currentPage : 1;
  let offset: any = (page - 1) * selectedValue + 1;
  let count: any = page * selectedValue;
  let totalRows: any = data && data["count"] ? data["count"] : 0;
  let totalPages: number = Math.ceil(totalRows / selectedValue);
  if (count > totalRows) {
    count = totalRows;
  }
  
  return (
    <>
      <span className="padding">
        <span className="black">{data?.count + "件中"}</span>
        <span className="black">
          {offset}〜{count}件{" "}
        </span>
        {page > 1 && (
          <img
            onClick={() => {
              goToPage(currentPage - 1);
            }}
            src={arrowBack}
          ></img>
        )}
        {totalPages > page && (
          <img
            onClick={() => {
              goToPage(currentPage + 1);
            }}
            src={arrowForward}
          ></img>
        )}
      </span>
    </>
  );
};
//getting two diffrent colours for even and odd rows
  const getRowStyleParams = (params: any) =>
    params.indexRelativeToCurrentPage  % 2 === 0 ? 'bg_sixt_TableCell' : 'bg_white_tablecell';

    const getRowId = (row: any) => {
      if (row.member && row.member?.id) {
        return row.member?.id;
      }
      // Return a fallback value if the property is not available
      return '';
    };
  return (
    <Box >
    
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanBBS />
        </Grid>
        <Grid item xs={9} ref={gridRef}>
        <Grid className="content-row">
                    <Grid className="p2red_bg_left size"></Grid>
                    <Grid className="p2red_bg_midle">
                        <Grid className="top-header">
                            <span className="verdana_big"> D.退会者の履歴</span>
                            <span className="verdana_big">入会・退会管理</span>
                        </Grid>
                    </Grid>
                    <Grid className="p2red_bg_right size"></Grid>
                </Grid>
        
               
            <Grid className='mg_top'><Typography>入会・退会管理</Typography></Grid>
           <Grid className='hr'/>
  
          
          <Grid>
           <Grid xs={12}  padding={1} spacing={1} className="data-grid-container">
            <DataGrid 
           
              rows={data?.data??[]}
              getRowId={getRowId}
              columns={columns}
              getRowClassName={getRowStyleParams}
              hideFooterPagination={true}
              hideFooter={true}
              disableColumnMenu={true} 
              localeText={{ noRowsLabel: "結果はありません。" }}
              autoHeight
              rowHeight={38} // Set your desired row height here (default is 52)
              columnHeaderHeight={38}
              
        
              
            
            /></Grid>
             <Grid className="content-row">
              <Grid className="p6red_bg_left size"></Grid>
              <Grid xs={12} container className="p6red_bg_midle">
                <Grid xs={4} className="black"></Grid>
                <Grid xs={4} className="black">
                  <Grid
                    container
                    flexDirection={"row"}
                    justifyContent={"center"}
                    alignSelf={"center"}
                    padding={1}
                  >
                    <span className="black">列を表示</span>
                    <select
                      value={selectedValue}
                      onChange={handleChangeRowsPerPage}
                    >
                      defaultValue={jsonData[0].label}
                      {jsonData.map((option) => (
                        <option key={option.value} value={option.label}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <Grid></Grid>
                  </Grid>
                </Grid>
                <Grid xs={4}>{data?.data && getPageInfo(data)}</Grid>
              </Grid>
              <Grid className="p6red_bg_right size"></Grid>
            </Grid>
            </Grid>
           
            <Grid className='griddwnbtn'><Button onClick={handleDownload} className='padding_top'><img width={183} height={27} src={downloadbtn} /></Button>
            </Grid>
        </Grid>
        
      </Grid>
        

    </Box>
  );
};

export default Histroy_withdrawal;
