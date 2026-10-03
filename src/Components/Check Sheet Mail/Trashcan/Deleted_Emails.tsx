import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Grid, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../Redux/actions";
import { useLocation, useNavigate } from "react-router-dom";
import LeftPanChecksheet from "../../Check Sheet Mail/LeftPanChecksheet";
import arrowForward from "../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
import apiClient from "../../../API/API-client";
import { formatDateArray } from "../../Common/Date_conversion";

const DeletedEmails = () => {
  const navigate = useNavigate();
  let req: any;
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
  
//handles pagination
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(event.target.value);
    setpagesizevalue(event.target.value);
    setSelectedValue(event.target.value);
    setCurrentPage(1);
    deletedEmailList(event.target.value,1);
  };

  
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState<any[]>([]);
//to handle checkboxchange
  const handleCheckboxAllChange = (e: any) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      const allIds = data?.data.map((row: any) => row.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };
//to handle single checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectAll) {
      setSelectAll(false);
      const id = event.target.value;
      const isChecked = event.target.checked;
      setSelectedIds((prevIds: any) => {
        if (isChecked) {
          return [...prevIds, id];
        } else {
          return prevIds.filter((selectedId: any) => selectedId !== id);
        }
      });
    } else {
      const id = event.target.value;
      const isChecked = event.target.checked;
      setSelectedIds((prevIds: any) => {
        if (isChecked) {
          return [...prevIds, id];
        } else {
          return prevIds.filter((selectedId: any) => selectedId !== id);
        }
      });
    }
  };
  //emailedit apical
  const handleSubmitClick=async()=>{
    try {
      const dataRequest={
           "checkIds":selectedIds,
        }
       const apiData = await apiClient.post("api/checksheetmail/setRestoreEmail",dataRequest,{});
       if (apiData) {
        deletedEmailList(10,1);
       }
 
     } catch (error: any) {
       // Handle errors if necessary
       console.error("API Error:", error);
     }
}

 //defining columns of datagrid 

  const columns: GridColDef[] = [
    {
      field: "select",
      headerName: "Select",
      headerClassName: "td_ninteen_1 mail_member_header_background",
      headerAlign:'center',
      align:'center',
      sortable: false,
      cellClassName: "dgridcolumn-cell",
      width: 7,
      renderHeader: () => (
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleCheckboxAllChange}
        />
      ),
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={selectAll || params.row.selected}
          value={params.row.id}
          onChange={(e) => {
            handleCheckboxChange(e);
            // Handle individual row selection here
          }}
        />
      ),
    },
    {
      field: "id",
      headerName: "No",
      width: 10,
      headerAlign:'center',
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        return params?.row?.id;
      },
    },
    {
      field: "reception",
      headerName: "受付",
      headerAlign:'center',
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        const formatteDate = formatDateArray(params?.row?.receivedDate);
        return formatteDate;
      },
      width: 90,
    },
    {
      field: "name",
      headerName: "名前",
      width: 80,
      headerAlign:'center',
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        const fullName = `${params?.row?.userName} `; // Combine name and name2 fields
        return (
          <Tooltip title={fullName}>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{fullName}</div>
          </Tooltip>
         );

        
      },
      headerClassName: "td_ninteen_1 mail_member_header_background",
    },
    {
      field: "email_pc",
      headerName: "Email",
      width: 100,
      headerAlign:'center',
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params:any) => {
        if (params?.row?.userEmail) {
         return(
           <Tooltip title={params?.row?.userEmail}>
               <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                 {params?.row?.userEmail}
               </div>
             </Tooltip>
         );
        }
        return null;
      }, 
    },
    
    {
      field: "deleteddate",
      headerName: "削除日",
      width: 90,
      headerAlign:'center',
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell(params) {
        if(params.row.deletedDate!=null){
          const formatteDate = formatDateArray(params?.row?.deletedDate);
          return formatteDate;
        }else{
         return <Grid></Grid>
        }
        
      },
    },
    {
        field: "checksheetname",
        headerName: "チエックシート名",
        flex:1,
        headerAlign:'center',
        headerClassName: "td_ninteen_1 mail_member_header_background",
        cellClassName: "dgridcolumn-cell",
        sortable: false,
        renderCell(params) {
          if(params?.row?.checkSheetType?.title!=null){
        return params?.row?.checkSheetType?.title;
            
          }else{
           return <Grid></Grid>
          }
          
        },
      },
    {
      field: "deviceName",
      headerName: "デバイス名",
      width:170,
      headerAlign:'center',
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,

      renderCell: (params) => {
        const lines = params.row.deviceInfo
          .split("<br/>")
          .filter((line: any) => line.trim() !== "");
        const formattedInfo = lines
          .map((line: any) => {
            const [label, value] = line.split(":");
            return `<div>${label.trim()}: ${value.trim()}</div>`;
          })
          .join("");

        return <div dangerouslySetInnerHTML={{ __html: formattedInfo }} />;
      },
    },
    {
      field: "diagnosisResult",
      headerName: "診断結果",
      width: 180,
      headerAlign:'center',
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell:(params)=>{
        const lines=params.row.diagonoseResult.split("\n").filter((line: any) => line.trim() !== "");
        const formattedInfo = lines
        .map((line: any) => {
          // const [label, value] = line.split(":");
          return `<div>${line.trim()}</div>`;
        })
        .join("");
        return <div dangerouslySetInnerHTML={{ __html: formattedInfo }} />;
      }
    },
    {
      field: "consultationContent",
      headerName: "相談内容",
      width: 170,
      headerAlign:'center',
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell:(params)=>{
        const lines=params.row.checkSheetContent.split("<br/>")
        .filter((line: any) => line.trim() !== "");
        const formattedInfo = lines
        .map((line: any) => {
          // const [label, value] = line.split(":");
          return `<div>${line.trim()}</div>`;
        })
        .join("");
        return <div dangerouslySetInnerHTML={{ __html: formattedInfo }} />;
      }
    },
  ];

  
 
  //jsondata for pagination
  const jsonData = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "75", label: "75" },
    { value: "100", label: "100" },
  
  ];
  const [pagesizevalue, setpagesizevalue] = useState<any>(10);
 
  const dispatch = useDispatch();
  //to get data from redux store
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.checksheetdeletedemail;
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any>(10);
//giving styles for alternative rows
  const getRowClassName = (params: any) => {
    return params.indexRelativeToCurrentPage % 2 === 0
      ? "row_table_list_c1"
      : "row_table_list_c2";
  };
  useEffect(() => {
    deletedEmailList(10,1);
  }, []);
//calling list of deleted emails
  const deletedEmailList = async (pagesize: any, pageNumber: number = 1
    
  ) => {
    setIsLoading(true);
    
  
    try {
     
      req = {
        
          pageSize:pagesize,
          pageNumber:pageNumber
        
       
      };
  

      dispatch(fetchData("checksheetdeletedemail", "api/checksheetmail/showDeletedMail",req));
      setIsLoading(false);
      if (!data || !Array.isArray(data)) {
        return null; // Return null or a fallback component if the data is not available or is not an array
      } else if (!data) {
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  //for pagination
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    deletedEmailList(selectedValue, pageNumber);
  };
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
  
  return (
    <Box>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={3}>
          <LeftPanChecksheet />
        </Grid>
        <Grid item xs={9}>
          <Grid container>
            <Box className="p2red_bg_left"></Box>
            <Box className="p2red_bg_midle">
              <Grid justifyContent={"space-between"}>
                <span className="verdana_big">J. 削除済みメール一覧</span>
              </Grid>
            </Box>
            <Box className="p2red_bg_right"></Box>
          </Grid>
          <Grid>
            <Grid>
              <br />
              <br />
              <DataGrid
                columns={columns}
                rows={data?.data ?? []}
                getRowHeight={() => "auto"}
                getRowClassName={getRowClassName}
                disableColumnMenu={true}
                autoHeight
                hideFooter
                hideFooterSelectedRowCount
                checkboxSelection={false}

              
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
              <Grid container spacing={1}>
                <Grid item>
                  <button type="button" className="emailReceptionButton" onClick={()=>handleSubmitClick()}>戻す</button>
                </Grid>
                
              </Grid>
              <Grid className="hr"/>
            
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DeletedEmails;

