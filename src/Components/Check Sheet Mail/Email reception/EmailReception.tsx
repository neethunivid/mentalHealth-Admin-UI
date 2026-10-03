import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../Redux/actions";
import { useLocation, useNavigate } from "react-router-dom";
import LeftPanChecksheet from "../../Check Sheet Mail/LeftPanChecksheet";
// import "../../Check Sheet Mail/check.scss";
import leftbtn from "../../../assets/images/diagnosis_mail_button1.gif";
import rightbtn from "../../../assets/images/diagnosis_mail_button2.gif";
import arrowForward from "../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
import apiClient from "../../../API/API-client";
import CheckSheetHeader from "../Common/CheckSheetHeader";
import { formatDateArray, getCurrentDate } from "../../Common/Date_conversion";

const EmailReception = () => {
  const navigate = useNavigate();
  let req: any;
  let searchrequest: any;
  let searchflag: any;
  let pagesize: any;
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(event.target.value);
    setpagesizevalue(event.target.value);
    setSelectedValue(event.target.value);
    setCurrentPage(1);
    fetchMember(event.target.value, 1, sortField, sortOrder);
  };
  const columns: GridColDef[] = [
    // { field: 'checkbox', headerName: ' ', width: 10,headerClassName: "sixth_bdr_left_bottom", cellClassName: "dgridcolumn-cell",sortable: false, renderCell: () => <input type="checkbox"/> },
    {
      field: "no",
      headerName: "No",
      headerAlign: "center",
      align: "center",
      width: 20,
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        return <Grid className="black">{params.row.id}</Grid>;
      },
    },
    {
      field: "joinDate",
      headerName: "受付",
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const formateDate =params.row.receivedDate&& formatDateArray(params.row.receivedDate);
        return <Grid className="black">{formateDate}</Grid>;
      },
      width: 90,
    },
    {
      field: "name",
      headerName: "名前",
      width: 90,
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <Grid className="black">{params.row.userName}</Grid>;
      },
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
    },
    {
      field: "email_pc",
      headerName: "Email",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        return <Grid className="black">{params.row.userEmail}</Grid>;
      },
    },
    {
      field: "emailReply",
      headerName: "返信日付",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        const formateDate =params.row.mailSendDate&& formatDateArray(params.row.mailSendDate);
        return <Grid className="black">{formateDate}</Grid>;
      },
    },
    {
      field: "replyDate",
      headerName: "チェックシート名  ",
      width: 120,
      headerAlign: "center",
      align: "center",
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        return <Grid className="black">{params.row.checkSheetType.title}</Grid>;
      },
    },
    {
      field: "deviceName",
      headerName: "デバイス名",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        const lines = params.row.deviceInfo
          .split("<br/>")
          .filter((line: any) => line.trim() !== "");
        const formattedInfo = lines
          .map((line: any) => {
            const [label, value] = line.split(":");
            return `<div>${label.trim()}:${value.trim()}</div>`;
          })
          .join("");
        return (
          <div
            className="black"
            dangerouslySetInnerHTML={{ __html: formattedInfo }}
          ></div>
        );
      },
    },
    {
      field: "diagnosisResult",
      headerName: "診断結果 ",
      width: 180,
      headerAlign: "center",
      align: "center",
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        const lines = params.row.diagonoseResult
          .split("\n")
          .filter((line: any) => line.trim() !== "");
        const formatteInfo = lines
          .map((line: any) => {
            return `<div>${line.trim()}</div>`;
          })
          .join("");

        return (
          <div
            className="black"
            dangerouslySetInnerHTML={{ __html: formatteInfo }}
          ></div>
        );
      },
    },
    {
      field: "consultationContent",
      headerName: "相談内容",
      width: 140,
      headerAlign: "center",
      align: "center",
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        const lines = params.row.checkSheetContent
          .split("<br/>")
          .filter((line: any) => line.trim() !== "");
        const formattedInfo = lines
          .map((line: any) => {
            return `<div>${line.trim()}</div>`;
          })
          .join("");
        return (
          <div
            className="black"
            dangerouslySetInnerHTML={{ __html: formattedInfo }}
          ></div>
        );
      },
    },
  ];

  const location = useLocation();
  if (location && location.state && location.state.flag) {
    searchrequest = location.state.data;
    searchflag = location.state.flag;
  }
  if (location && location.state && location.state.pagesize) {
    pagesize = location.state.pagesize;

  }
  const jsonData = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "75", label: "75" },
    { value: "100", label: "100" },

  ];
  const [pagesizevalue, setpagesizevalue] = useState<any>(10);
  const [sortField, setSortField] = useState();
  const [sortOrder, setSortOrder] = useState();
  const [RowsData, setRowsData] = useState<any>([]);
  const dispatch = useDispatch();
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.one_year_list;
  });
  const [rowId, setRowId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any>(10);

  const getRowClassName = (params: any) => {
    return params.indexRelativeToCurrentPage % 2 === 0
      ? "daily_table_list_c1"
      : "row_table_list_c2";
  };
  useEffect(() => {
  
    fetchMember(10, 1, "", "");
  }, []);

  const fetchMember = async (
    pagesize: any,
    pageNumber: number = 1,
    sortField: any,
    sortOrder: any
  ) => {
    setIsLoading(true);
    // pageNumber -= 1;
   
    try {
     
      req = {
        pageNumber: pageNumber,
        pageSize: pagesize,
        // withdrawList: false,
        // ...(sortField && { sortField: sortField }),
        // ...(sortOrder && { sortDirection: sortOrder }),
      };
      // if (searchflag == 1) {
      //   req = {
      //     ...req,
      //     ...(searchrequest.email_pc && { email_pc: searchrequest.email_pc }),
      //     ...(searchrequest.memberno && { memberno: searchrequest.memberno }),
      //     ...(searchrequest.memberid && { memberid: searchrequest.memberid }),
      //     ...(searchrequest.name && { name: searchrequest.name }),
      //   };
      // }

      dispatch(
        fetchData("one_year_list", "api/checksheetmail/archiverecordlist", req)
      );
      // window.location.reload();
      setIsLoading(false);
    
      if (!data || !Array.isArray(data)) {
        return null; // Return null or a fallback component if the data is not available or is not an array
      } else if (!data) {
      }
    } catch (error) {
     alert(error)
    }
  };
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchMember(selectedValue, pageNumber, sortField, sortOrder);
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
  const token = sessionStorage.getItem("token");
  const CustomHeader = (column: any) => {
    return (
      <>
        <Grid container xs={12} display={"flex"} flexDirection={"row"}>
          <span>{column.column.colDef.headerName}</span>
        </Grid>
      </>
    );
  };

  const downloadList = async () => {
    const date = getCurrentDate();
    const year = date.split("-")[0];
  
    
    try {
      const dataRequest={
        finYear:year
      }
      const apiData=await apiClient.post('api/export/checkSheetdownload',dataRequest);
      if(apiData){
        downloadFile(apiData.data,`report${date}`,'text/csv');
      }
    } catch (error) {
      alert(error);
    }
  };

    // function helps to download file .csv format
    const downloadFile = (data: any, fileName: any, fileType: any) => {
      const blob = new Blob(["\ufeff" + data], {
        type: "text/csv;charset=UTF-8",
      });
      const a = document.createElement("a");
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      const clickEvt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      a.dispatchEvent(clickEvt);
      a.remove();
    };
  return (
    <Box>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={3}>
          <LeftPanChecksheet />
        </Grid>
        <Grid item xs={9}>
          <CheckSheetHeader label="G .メール受付・送信履歴（1年）" />
          <Grid>
            <Grid>
              <br />
              <br />
              <DataGrid
                // sx={{
                //   ".MuiDataGrid-iconButtonContainer": {
                //     visibility: "visible",
                //   },
                //   ".MuiDataGrid-sortIcon": {
                //     opacity: "inherit !important",
                //   },
                // }}
                columns={columns.map((col) => ({
                  ...col,
                  renderHeader: (params: any) => (
                    <CustomHeader column={params} />
                  ),
                }))}
                rows={data?.data?.diagnoseCheck ?? []}
                getRowClassName={getRowClassName}
                disableColumnMenu={true}
                getRowHeight={() => "auto"}
                autoHeight
                hideFooter
                hideFooterSelectedRowCount
                columnHeaderHeight={30}
                // checkboxSelection={true}
              />
              <Grid className="hr"></Grid>
              <input
                className="emailReceptionButton"
                type="button"
                name="btn-download-csv"
                value="ダウンロード"
                onClick={() => {
                  downloadList();
                }}
                // style={{
                //   backgroundColor: "#349ACF",
                //   borderRadius: "5px",
                //   borderColor: "#349ACF",
                //   color: "white",
                //   padding: "5px 25px",
                //   textAlign: "center",

                //   width: "120px",
                // }}
                //   onClick={handleButtonClick}
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
            {/* <Grid container>
              <Grid container spacing={1}>
                <Grid item>
                  <img src={leftbtn} className="btn" alt="Left Button" />
                </Grid>
                <Grid item>
                  <img src={rightbtn} className="btn" alt="Right Button" />
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default EmailReception;
