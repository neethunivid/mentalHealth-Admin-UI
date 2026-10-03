import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../Redux/actions";
import { useLocation, useNavigate } from "react-router-dom";
import LeftPanChecksheet from "../../Check Sheet Mail/LeftPanChecksheet";
import arrowForward from "../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
import apiClient from "../../../API/API-client";
import { formatDateArray } from "../../Common/Date_conversion";

const Detailed_List = () => {
  const navigate = useNavigate();
  let req: any;
  let checksheetType: any;
  let checksheetID :any;
  let dcCheckId:any
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
//pagination
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(event.target.value);
    setpagesizevalue(event.target.value);
    setSelectedValue(event.target.value);
    setCurrentPage(1);
    fetchList(event.target.value, 1);
  };
//to get checkbox checked by default when coming from 
  useEffect(() => {
    if (dcCheckId) {
      const resultArray = dcCheckId.split(",").map(Number);
      setSelectedIds(resultArray);
    }
    fetchList(10, 1);
    
  }, [dcCheckId]);
  const [selectedIds, setSelectedIds] = useState<any[]>([]);
//handle all checkbox
  const handleCheckboxAllChange=(e:any)=>{
    const isChecked = e.target.checked;
    if (isChecked) {
        const allIds = data?.data.map((row: any) => row?.id);
        setSelectedIds(allIds);
      } else {
        setSelectedIds([]);
      }

}
//handle singleselection checkbox
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>,id:any) => {
    const isChecked = event.target.checked;
    setSelectedIds((prevIds: any) => {
        // if is checked select box which will store the state that id
        if (isChecked) {
            return [...prevIds, id];
        } else {
            return prevIds.filter((selectedId: any) => selectedId !== id);
        }
    });
};
 //function call on next button click changing sendstimeztatus to 0 
  const handleSubmitClick=async()=>{
    try {
      const dataRequest={
           "checkIds":selectedIds,
        }
       const apiData = await apiClient.put("api/checksheetmail/edituserssenddate/"+checksheetID,dataRequest,{});
       if (apiData) {
        navigate("/diagnosismailing_list");
       }
 
     } catch (error: any) {
       // Handle errors if necessary
       console.error("API Error:", error);
     }
}
const handleCancel =()=>{
 navigate("/diagnosismailing_list");
}
  
//defining datagrid
  const columns: GridColDef[] = [
    {
      field: "select",
      headerName: "Select",
      headerClassName: "td_ninteen_1 mail_member_header_background",
      headerAlign:'center',
      align:'center',
      sortable: false,
      cellClassName: "dgridcolumn-cell",
      width: 10,
      renderHeader: () => (
        <input
          type="checkbox"
          checked={selectedIds?.length > 1}
          onChange={(e) => {handleCheckboxAllChange(e)}}
        />
      ),
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={selectedIds?.includes(params?.row?.id)}
          value={params?.row?.id} 
          onChange={(e) => {
              handleCheckboxChange(e, params?.row?.id)
              // Handle individual row selection here
          }}
        />
      ),
    },
    {
      field: "id",
      headerName: "No",
      flex:1,
      headerAlign:'center',
      align:'center',
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        return params.row.id;
      },
    },
    {
      field: "joinDate",
      headerName: "受付",
      headerAlign:'center',
      align:'center',
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        const formatteDate = formatDateArray(params.row.receivedDate);
        return formatteDate;
      },
      width: 100,
    },
    {
      field: "name",
      headerName: "名前",
      width: 140,
      headerAlign:'center',
      align:'center',
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        const fullName = `${params.row.userName} `; // Combine name and name2 fields

        return fullName;
      },
      headerClassName: "td_ninteen_1 mail_member_header_background",
    },
    {
      field: "email_pc",
      headerName: "Email",
      width: 130,
      headerAlign:'center',
      align:'center',
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => (
        <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {params.row.userEmail}
        </div>
      ),
    },
    
    {
      field: "sendDate",
      headerName: "返信日付",
      width: 100,
      headerAlign:'center',
      align:'center',
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell(params) {
        if(params.row.mailSendDate!=null){
          const formatteDate = formatDateArray(params.row.mailSendDate);
          return formatteDate;
        }else{
         return <Grid></Grid>
        }
        
      },
    },
    {
      field: "deviceName",
      headerName: "デバイス名",
      width:200,
      headerAlign:'center',
      align:'center',
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
      align:'center',
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
      align:'center',
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
//to get passed params while navigating
  const location = useLocation();
  if (location && location.state&& location.state.data) {
  checksheetType = location.state.data
  }
  if (location && location.state&& location.state.Id) {
    checksheetID = location.state.Id
    }
    if (location && location.state&& location.state.checkId) {
      dcCheckId = location.state.checkId
      }
  //pagination jsondata
  const jsonData = [
    { value: "10", label: "10" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
    { value: "200", label: "200" },
    { value: "500", label: "500" },
    { value: "1000", label: "1000" },
    { value: "1500", label: "1500" },
  ];
  const [pagesizevalue, setpagesizevalue] = useState<any>(10);
 
  const dispatch = useDispatch();
  //to get data from redux store
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.checksheetdetail;
  });
  const [rowId, setRowId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any>(10);
//to get styling for alternative rows
  const getRowClassName = (params: any) => {
    return params.indexRelativeToCurrentPage % 2 === 0
      ? "row_table_list_c1"
      : "row_table_list_c2";
  };
 
//api call toget the list api 
  const fetchList = async (
    pagesize: any,
    pageNumber: number = 1,
    
  ) => {
    setIsLoading(true);
    // pageNumber -= 1;
  
    try {
     
      req = {
        pageNumber: pageNumber,
        pageSize: pagesize,
        checkSheetType: checksheetType,
       
      };
      

      dispatch(fetchData("checksheetdetail", "api/checksheetmail/listbytype", req));
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
    fetchList(selectedValue, pageNumber);
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
                <span className="verdana_big">A. 森田神経質</span>
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

                // checkboxSelection={true}
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
                <Grid xs={4}>{!isLoading && getPageInfo(data)}</Grid>
              </Grid>
              <Grid className="p6red_bg_right size"></Grid>
            </Grid>
              <Grid container spacing={1}>
                <Grid item>
                  <button type="button" className="next_button" onClick={()=>handleSubmitClick()}>Next</button>
                </Grid>
                <Grid item>
                <button type="button" className="next_button"  onClick={() =>handleCancel()}>Cancel</button>
                </Grid>
              </Grid>
              <Grid className="hr"/>
            
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Detailed_List;

