import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../Redux/actions";
import { useLocation, useNavigate } from "react-router-dom";
import LeftPanChecksheet from "../LeftPanChecksheet";
import "../../Check Sheet Mail/check.scss";

import arrowForward from "../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
import apiClient from "../../../API/API-client";
import { Link } from 'react-router-dom';
import { formatDateTimeArray } from "../../Common/Date_conversion";
const Reservation_List = () => {
  const navigate = useNavigate();
  let req: any;
  
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
//handles rows according to pagesize
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(event.target.value);
    setpagesizevalue(event.target.value);
    setSelectedValue(event.target.value);
    setCurrentPage(1);
    diagnosismail_Listing(event.target.value, 1);
  };
  //defines column of datagrid
  const columns: GridColDef[] = [
   
    {
      field: "ID",
      headerName: "ID",
      width: 30,
      headerClassName: "td_ninteen_1 mail_member_header_background",align:'center',headerAlign:'center',
      cellClassName: "gridcolumn-cells blacktxt",
      sortable: false,
      renderCell: (params:any) => {
        if (params.row?.id) {
         return params.row?.id;
        
          
        }
        return null;
      },
    },
    {
      field: "checksheetname",
      headerName: "チエックシート名",
      headerClassName: "td_ninteen_1 mail_member_header_background",align:'center',headerAlign:'center',
      cellClassName: "gridcolumn-cells blacktxt",
      sortable: false,width:100,
      renderCell: (params) => {
        if (params.row?.checksheetname) {
          return(
            <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', textAlign: 'center' }}>
            {params.row?.checksheetname}
          </div>
            );
        
      }
      return null;
     
    },
  },
    {
      field: "device",
      headerName: "デバイス",
      flex:1,
      cellClassName: "gridcolumn-cells blacktxt",align:'center',headerAlign:'center',
      sortable: false,  headerClassName: "td_ninteen_1 mail_member_header_background",
      renderCell: (params) => {
        if (params.row?.device) { 
        return params.row?.device;
        }
    return null;
    },
  },
    {
      field: "reservationdatetime",
      headerName: "送信＆予約日時 ",
      width:150,
      headerAlign: "center",
      headerClassName: "td_ninteen_1 mail_member_header_background",align:'center',
      cellClassName: "gridcolumn-cells blacktxt",
      sortable: false,
      renderCell: (params:any) => {
        if (params.row?.sentTime) { 
          return formatDateTimeArray(params.row?.sentTime);
          }
      return null;
        },
      
    },
    {
      field: "emailreciepient",
      headerName: "送信先  ",
      width:200,
      headerClassName: "td_ninteen_1 mail_member_header_background",align:'center',headerAlign:'center',
      cellClassName: "gridcolumn-cells blacktxt",
      sortable: false,
      renderCell: (params) => {
        const dcCheckIDList = params.row.dcCheckID.split(', '); // Split dcCheckID into an array
        const userEmailList = params.row.userEmail.split(', '); // Split userEmail into an array
        const fetchDataById = async (usermail:any,dcCheckID:any) => {
          try {
            let Datarequest={
              userEmail:usermail
            }
              const apiData = await apiClient.put('api/checksheetmail/emailedit/' +dcCheckID,Datarequest,{});
            
              if (apiData) {
                diagnosismail_Listing(10, 1);  
              }
      
          } catch (error) {
              console.error('Error fetching users:', error);
          }
      }
        const handleEditClick = (index:any) => {
          const userInput = window.prompt('Correct email address:', userEmailList[index]);
  
          if (userInput !== null) {
            // User clicked OK and entered a new email address
            // Call fetchDataById with the Id and the new email address
            fetchDataById(userInput,dcCheckIDList[index]);
          }
          
     };
     return (
      <div className="checkemail_div">
        {userEmailList.map((userEmail:any, index:any) => (
          <div key={index}>
            <span>{userEmail}</span>
            <span onClick={() => handleEditClick(index)} className="text-underline" style={{ cursor: 'pointer' }}>[編集]</span>
          </div>
        ))}
      </div>
    );
     }
     
    },
    {
      field: "situation",
      headerName: "状況",
      width:100,
      headerClassName: "td_ninteen_1 mail_member_header_background",align:'center',headerAlign:'center',
      cellClassName: "gridcolumn-cells blacktxt",
      sortable: false,
      renderCell: (params:any) => {
        if (params.row?.sendStatus==0) { 
          return '予約';
          }
          else{
            return '送信済み'
          }
      return null;
        },
    },
    {
      field: "detailed",
      headerName: "詳細",
      width:130,
      headerClassName: "td_ninteen_1 mail_member_header_background",align:'center',headerAlign:'center',
      cellClassName: "gridcolumn-cells",
      sortable: false,
      renderCell: (params) => (
        //navigate to details page
        <button
          className="createbutton"
          onClick={() => navigate("/reservationdetaillist", { state: { data: params?.row?.typeId,Id:params?.row?.id,checkId:params?.row?.dcCheckID} })}
        >
         詳細
        </button>
      ),
    },
    {
      field: "editcontents",
      headerName: "内容編集",
      width:150,
      headerClassName: "td_ninteen_1 mail_member_header_background",align:'center',headerAlign:'center',
      cellClassName: "gridcolumn-cells",
      sortable: false,
      renderCell: (params) => {
        //delete api
        const deleteMail = async () => {
          let ID = params.row.id;
          const confirmed = window.confirm("削除してもよろしいですか？");
          if (confirmed) {
            try {
              const apiData = await apiClient.delete(
                "api/checksheetmail/deletemail/" +ID,
                {}
              );
              if (apiData) {
                window.location.reload();
              }
            } catch (error:any) {
              if (error.response && error.response.status === 403) {
                console.error("403 error occurred");
              } else {
                console.error("Error occurred:", error);
              }
            }
          }
        };
       return(
        <Grid container className="button_grid row-content-padding">
            <Grid>
        <button
          
          className="createbutton"
          onClick={deleteMail}
        >
         削除
        </button></Grid>
        <Grid>
         <button
           className="createbutton"
           onClick={() => navigate("/Reservemailreply",{ state: { data: params?.row} })}
         >
           編集
         </button></Grid></Grid>
       );
       },
    },
    
  ];

  
  
  
  const jsonData = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "75", label: "75" },
    { value: "100", label: "100" },
  ];
  const [pagesizevalue, setpagesizevalue] = useState<any>(10);
  
  const dispatch = useDispatch();
  //data from redux sore assigned to variable data
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.diagnosismail_list;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any>(10);
//styling for alternative classes
  const getRowClassName = (params: any) => {
    return params.indexRelativeToCurrentPage % 2 === 0
      ? "mbr-list-bg1"
      : "mbr-list-bg2";
  };
  useEffect(() => {
    diagnosismail_Listing(10, 1);
  }, []);
//listing api
  const diagnosismail_Listing = async (
    pagesize: any,
    pageNumber: number = 1,
  ) => {
    setIsLoading(true);
    //pageNumber -= 1;
    try {
      req = {
        pageNumber: pageNumber,
        pageSize: pagesize,
      
      };
     

      dispatch(fetchData("diagnosismail_list", "api/checksheetmail/diagnosis-mailing-list", req));
      // window.location.reload();
      setIsLoading(false);
      if (!data || !Array.isArray(data)) {
        return null; // Return null or a fallback component if the data is not available or is not an array
      } else if (!data) {
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  //pagination
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    diagnosismail_Listing(selectedValue, pageNumber);
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
  //customised design for datagrid header
  const CustomHeader = (column: any) => {
    return (
      <>
        <Grid container xs={12} className="checkemail_div">
          <span>{column.column.colDef.headerName}</span>
        </Grid>
      </>
    );
  };
  return (
    <Box>
      <Grid container xs={12} spacing={1} padding={1}>
        <Grid item xs={3} spacing={1}>
          <LeftPanChecksheet />
        </Grid>
        <Grid item xs={9}>
          
          <Grid className="content-row">
        <Grid className="p2red_bg_left size"></Grid>
        <Grid className="p2red_bg_midle">
          <Grid className="top-header">
            <span className="verdana_big">F. メール送信後と予約一覧 </span>
          </Grid>
        </Grid>
        <Grid className="p2red_bg_right size"></Grid>
      </Grid>
      <Grid className="hr"></Grid>
          <Grid>
            <Grid>
              <DataGrid
                sx={{
                  ".MuiDataGrid-iconButtonContainer": {
                    visibility: "visible",
                  },
                  ".MuiDataGrid-sortIcon": {
                    opacity: "inherit !important",
                  },
                }}
                columns={columns.map((col) => ({
                  ...col,
                  renderHeader: (params: any) => (
                    <CustomHeader column={params} />
                  ),
                }))}
                rows={data?.data ?? []}
                getRowClassName={getRowClassName}
                getRowHeight={() => "auto"}
                disableColumnMenu={true}
                autoHeight
                hideFooter
                hideFooterSelectedRowCount
               // rowHeight={36} // Set your desired row height here (default is 52)
                columnHeaderHeight={36}
               
              />
            </Grid>
            <Grid className="hr"></Grid>
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
        </Grid>
      </Grid>
    </Box>
  );
};
export default Reservation_List;
