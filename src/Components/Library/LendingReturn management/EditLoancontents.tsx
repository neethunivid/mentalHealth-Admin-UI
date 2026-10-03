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
import LeftPanBBS from '../../Common/LeftPanBBS';
import Edit_LoanLendercompo from './EditLoancontentcomp';
import activebutton from "../../../assets/images/lib_reset_s.gif";
import editbutton from "../../../assets/images/lib_edit.gif";
import savebtn from "../../../assets/images/lib_save.gif"



const Edit_Loancontent = () => {
    const CellRenderer=(rowData :any) =>{
        const [isEditing, setEditing] = useState(false);
      
        const handleEditClick = () => {
          setEditing(!isEditing);
        };
      
        return (
          <>
            {isEditing ? (
              <Button onClick={handleEditClick}>
                <img src={editbutton} alt='editbutton'/>
              </Button>
            ) : (
              <Button onClick={handleEditClick}>
                <img src={activebutton} alt='activebutton'/>
              </Button>
            )}
        
          </>
        );
      }
  //defining the columns and headers of datagrid
  const columns: GridColDef[] = [


    {
      field: 'changeDate', headerName: '貸出No', sortable:false,
      renderCell: (params:any) => {
        if (params?.row?.member?.memberno) {
          return params?.row?.member?.memberno
        }
        else{
          return null
        } // Return a fallback value if the array is undefined or doesn't have enough elements
     },
      width:60, headerClassName: "headergridcell_blue1",cellClassName:"gridcolumn-cells blacktxt",headerAlign:"center",align:"center"
    },
  
    { field: 'memberno', headerName: '貸出日', width:90,sortable:false,align:"center",
    renderCell: (params) => {

    
        const handleInputChange = (event:any) => {
          
        };
  
        const handleInputBlur = () => {
          // Handle saving the edited value to your data source
          // You can use this.state or a state management library like Redux
          // Example: this.setState({ joinDate: editedValue });
        };
  
        return (
          <input name="rank[]" className="bdr-text" type="text" defaultValue={formatDateArray1(params?.row?.member?.changeDate)}/>
        );
      },
   headerClassName: "headergridcell_blue1",cellClassName:"gridcolumn-cells blacktxt",headerAlign:"center" },
   {
     field: 'name', headerName: '返却予定', width:90,sortable:false,align:"center",
     renderCell: (params) => {

    
        const handleInputChange = (event:any) => {
          
        };
  
        const handleInputBlur = () => {
          // Handle saving the edited value to your data source
          // You can use this.state or a state management library like Redux
          // Example: this.setState({ joinDate: editedValue });
        };
  
        return (
          <input name="rank[]" className="bdr-text" type="text" defaultValue={formatDateArray1(params?.row?.member?.changeDate)}/>
        );
      },
      headerClassName: "headergridcell_blue1",cellClassName:"gridcolumn-cells blacktxt",headerAlign:"center"
   },
   { field: 'memberid', headerName: '返却日', width:90, sortable:false,align:"center",
   renderCell: (params) => {

    
    const handleInputChange = (event:any) => {
      
    };

    const handleInputBlur = () => {
      // Handle saving the edited value to your data source
      // You can use this.state or a state management library like Redux
      // Example: this.setState({ joinDate: editedValue });
    };

    return (
      <input name="rank[]" className="bdr-text" type="text" defaultValue={formatDateArray1(params?.row?.member?.changeDate)}/>
    );
  },
    headerClassName: "headergridcell_blue1",cellClassName:"gridcolumn-cells blacktxt",headerAlign:"center" },
   { field: 'password', headerName: '連番', width:70,sortable:false,align:"center",
   renderCell: (params:any) => {
     if (params?.row?.member && params?.row?.member?.password) {
       return params.row?.member?.password;
     }
     return null;
   }, headerClassName: "headergridcell_blue1",cellClassName:"gridcolumn-cells blacktxt" ,headerAlign:"center"},
   { field: 'sex', headerName: 'ISBN', width:60, headerClassName: "headergridcell_blue1" ,cellClassName:"gridcolumn-cells blacktxt",headerAlign:"center",sortable:false,
    renderCell: (params:any) => {
     const sexValue = params?.row?.member?.sex === 1 ? 'Male' : 'Female';
     return <span>{sexValue}</span>;
   },},
   {
     field: 'dob', headerName: 'タイトル',sortable:false,
     renderCell: (params:any) => {
      if (params?.row?.member?.dob) {
        return formatDateArray1(params?.row?.member?.dob)
      }
      else{
        return null
      }
     },
     width:80, headerClassName: "headergridcell_blue1",cellClassName:"gridcolumn-cells blacktxt",headerAlign:"center"
   },
   { field: 'job_additional', headerName: '著作名', width:70,sortable:false,
   renderCell: (params:any) => {
     if (params?.row?.member && params?.row?.member?.job_additional) {
      return(
      <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', textAlign: 'center' }}>
      { params?.row?.member?.job_additional}
    </div>
      );
      
     }
     return null;
   }, headerClassName: "headergridcell_blue1" ,cellClassName:"gridcolumn-cells blacktxt",headerAlign:"center"},
   {
     field: 'joinDate', headerName: '編集・監修',sortable:false,
     renderCell: (params:any) => {
      if (params?.row?.member?.joinDate) {
        return formatDateArray1(params?.row?.member?.joinDate)
      }
      else{
        return null
      }
     },
     width:80, headerClassName: "headergridcell_blue1",cellClassName:"gridcolumn-cells blacktxt",headerAlign:"center"
   },
   { field: 'email_pc', headerName: '発売元', flex:1,sortable:false,align:"center",
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
   }, headerClassName: "headergridcell_blue1",cellClassName:"gridcolumn-cells blacktxt",headerAlign:"center" },
   { field: 'deletedReason', headerName: '編集',width:100,align:"center",
   renderCell: (params) => (
    <CellRenderer rowData={params.row} />
  ),
  headerClassName: "headergridcell_blue1",cellClassName:"gridcolumn-cells blacktxt" ,headerAlign:"center",sortable:false,},
 
   
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
    
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanBBS/>
        </Grid>
        <Grid item xs={7} ref={gridRef}>
        <Grid className="content-row">
        <Grid className="p2red_bg_left"></Grid>
                    <Grid className="p2red_bg_midle">
                        <Grid className="top-header">
                            <span className="text_verdhana">B-4.貸出内容の編集（貸出・返却・修正）</span>
                            <span className="text_verdhana">図書室管理</span>
                        </Grid>
                    </Grid>
                    <Grid className="p2red_bg_right"></Grid>
                </Grid>
           <Grid className='hr'/>
          
          <>
          <span className='text_verdhana'>【貸出者】</span>
          <Edit_LoanLendercompo/>
           <Grid xs={12}  padding={1} spacing={1} className="data-grid-container">
           <span className='text_verdhana'>【貸出書籍】</span>
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
           
            <Grid className='griddwnbtn'><Button className='padding_top'><img width={97} height={27} src={savebtn} /></Button>
            </Grid>
            </>
        </Grid>
        
      </Grid>
        

    </Box>
  );
};

export default Edit_Loancontent;
