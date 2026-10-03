import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, setMemberReg } from "../../../Redux/actions";
import { useLocation, useNavigate } from "react-router-dom";
import LeftPanChecksheet from "../../Check Sheet Mail/LeftPanChecksheet";
// import "../../Check Sheet Mail/Social phobia/check.scss";
import "../../Check Sheet Mail/check.scss";
import leftbtn from "../../../assets/images/diagnosis_mail_button1.gif";
import rightbtn from "../../../assets/images/diagnosis_mail_button2.gif";
import arrowForward from "../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
import apiClient from "../../../API/API-client";
import { formatDateArray } from "../../Common/Date_conversion";

const Social_phobia = () => {
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


  const [selectedIds, setSelectedIds] = useState<any[]>([]);

  //to select all the checkbox and unselect all the checkbox
  const handleCheckboxAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      //redux stored list of id save to the state
      const allIds = data?.data.map((row: any) => row.id);
      const allItem=data?.data.map((row:any)=>row);
      dispatch(setMemberReg("allCheckedItems",allItem));
      setSelectedIds(allIds);
    } else {
      dispatch(setMemberReg('allCheckedItems',[]));
      setSelectedIds([]);
    }

  };

  //handling checkbox of each in the list select and unselect
  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: any
  ) => {
    const isChecked = event.target.checked;
    setSelectedIds((prevIds) => {
      const updatedIds = isChecked
        ? [...prevIds, id] // Add the ID if it's checked
        : prevIds.filter((selectedId) => selectedId !== id); // Remove the ID if it's unchecked
    
      // Map the updated IDs back to the corresponding data items
      const updatedItems = data?.data.filter((item:any) => updatedIds.includes(item.id));
    
      // Dispatch the updated items to Redux
      dispatch(setMemberReg('allCheckedItems', updatedItems));
    
      return updatedIds;
    });
   
  };

    //when create button click store id of that row
  const handleButtonClick = (id: any) => {
    setSelectedIds((prevIds) => {
      let updatedIds:any;
        // If the ID is not selected, add it
        updatedIds = [...prevIds, id];
      // Map the updated IDs back to the corresponding data items
      const updatedItems = data?.data.filter((item:any) => updatedIds.includes(item.id));
      // Dispatch the updated items to Redux
      dispatch(setMemberReg('allCheckedItems', updatedItems));

      return updatedIds;
    });
  };


  //to keep all the list of item
  const archeiveChecksheet = async () => {

    // http://localhost:9090/api/checksheetmail/setArchived
    try {
      const dataRequest = {
        checkIds: selectedIds,
      };
      const apiData = await apiClient.post(
        "api/checksheetmail/setArchived",
        dataRequest
      );
      if (apiData) {
        //after api success reflect changes to ui
        fetchMember(selectedValue ?? 10, currentPage ?? 1, "", "");
      }
    } catch (error) {
      alert(error);
    }
  };

  //delete checksheet api list
  const deleteChecksheet = async () => {
    try {
      const dataRequest = {
        checkIds: selectedIds,
      };
      const apiData = await apiClient.post(
        "api/checksheetmail/isdeleted",
        dataRequest
      );
      if (apiData) {
        //after api success reflect changes to ui
        fetchMember(selectedValue ?? 10, currentPage ?? 1, "", "");
      }
    } catch (error) {
      alert(error);
    }
  };

  //each of columns of data grid it's header and each cell handles here
  const columns: GridColDef[] = [
    {
      field: "select",
      // headerName: "Select",
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      headerAlign: "center",
      align: "center",
      sortable: false,
      cellClassName: "dgridcolumn-cell",
      width: 10,
      renderHeader: () => (
        <input
          type="checkbox"
          checked={selectedIds.length ==data?.data.length}
          onChange={handleCheckboxAllChange}
        />
      ),
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(params.row.id)}
          value={params.row.id}
          onChange={(e) => {
            handleCheckboxChange(e, params.row.id);
            // Handle individual row selection here
          }}
        />
      ),
    },
    {
      field: "id",
      headerName: "No",
      width: 10,
      headerAlign: "center",
      align: "center",
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        return params.row.id;
      },
    },
    {
      field: "joinDate",
      headerName: "受付",
      headerAlign: "center",
      align: "center",
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        const formatteDate =params.row.receivedDate&& formatDateArray(params.row.receivedDate);
        return formatteDate;
      },
      width: 90,
    },
    {
      field: "name",
      headerName: "名前",
      width: 130,
      headerAlign: "center",
      align: "center",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        const fullName = `${params.row.userName} `; // Combine name and name2 fields

        return fullName;
      },
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
    },
    {
      field: "email_pc",
      headerName: "Email",
      width: 120,
      headerAlign: "center",
      align: "center",
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => (
        <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {params.row.userEmail}
        </div>
      ),
    },
    {
      field: "emailReply",
      headerName: "メール返信",
      width: 90,
      headerAlign: "center",
      align: "center",
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        if (params.row.mailSendStatus == 0) {
          return (
            <Button
              variant="contained"
              className="createbutton"
              onClick={() => {
                // dispatch(setMemberReg("iDActive4", params.row.id));
                handleButtonClick(params.row.id);
                navigate("/checksheet-create", { state: params.row });
              }}
            >
             作成
            </Button>
          );
        } else {
          return <div></div>;
        }
      },
    },
    {
      field: "sendDate",
      headerName: "返信日付",
      width: 90,
      headerAlign: "center",
      align: "center",
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell(params) {
        if (params.row.mailSendDate != null) {
          const formatteDate =params.row.mailSendDate&& formatDateArray(params.row.mailSendDate);
          return formatteDate;
        } else {
          return <Grid></Grid>;
        }
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
      headerAlign: "center",
      align: "center",
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        const lines = params.row.diagonoseResult
          .split("\n")
          .filter((line: any) => line.trim() !== "");
        const formattedInfo = lines
          .map((line: any) => {
            // const [label, value] = line.split(":");
            return `<div>${line.trim()}</div>`;
          })
          .join("");
        return <div dangerouslySetInnerHTML={{ __html: formattedInfo }} />;
      },
    },
    {
      field: "consultationContent",
      headerName: "相談内容",
      width: 170,
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
            // const [label, value] = line.split(":");
            return `<div>${line.trim()}</div>`;
          })
          .join("");
        return <div dangerouslySetInnerHTML={{ __html: formattedInfo }} />;
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
    return state?.reducer1.data?.checksheet2;
  });
  const [rowId, setRowId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedValue, setSelectedValue] = useState<any>(10);

  //each row className
  const getRowClassName = (params: any) => {
    return params.indexRelativeToCurrentPage % 2 === 0
      ? "row_table_list_c1"
      : "row_table_list_c2";
  };
  useEffect(() => {
    sessionStorage.removeItem("emailcontent");
    fetchMember(10, 1, "", "");
  }, []);

  const dataId: any = useSelector((state: any) => state.memberData?.iDActive4);
  const dataIds:any=useSelector((state:any)=>state.memberData?.allCheckedItems);
  const fetchMember = async (
    pagesize: any,
    pageNumber: number = 1,
    sortField: any,
    sortOrder: any
  ) => {
    setIsLoading(true);

    try {
      req = {
        pageNumber: pageNumber,
        pageSize: pagesize,
        checkSheetType: 2,
      };

      dispatch(fetchData("checksheet2", "api/checksheetmail/listbytype", req));
      // window.location.reload();
      setIsLoading(false);

      if (!data || !Array.isArray(data)) {
        setSelectedIds([]);
        // if(!selectedIds.includes(dataId)){
        //   setSelectedIds((prevId)=>[...prevId,dataId]);
        // }
        if (dataIds && !selectedIds.includes(dataIds)) {
          setSelectedIds((prevIds) => [
            ...prevIds,
            ...dataIds.map((item:any) => item.id)
          ]);
        }
        return null; // Return null or a fallback component if the data is not available or is not an array
      } else if (!data) {
      }
    } catch (error) {
     
    }
  };

  //selecting the pageSize is here
  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1 || (data?.count === 0 && pageNumber > 1)) return;   //does not allow negative number
    setCurrentPage(pageNumber);
    fetchMember(selectedValue, pageNumber, sortField, sortOrder);
  };

  //Shows pageInfo current page and total count
  const getPageInfo = (data: any) => {
    let page: any = currentPage ? currentPage : 1;
    let offset: any = (page - 1) * selectedValue + 1;
    let count: any = page * selectedValue;
    let totalRows: any = data && data["count"] ? data["count"] : 0;
    let totalPages: number = Math.ceil(totalRows / selectedValue);
    if (count > totalRows) {
      count = totalRows;
    }
    if(offset>count){
      goToPage(currentPage - 1);
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
  return (
    <Box>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={3}>
          <LeftPanChecksheet />
        </Grid>
        <Grid item xs={9}>
          <Grid className="hr"></Grid>
          <Grid className="content-row">
            <Grid className="p2red_bg_left"></Grid>
            <Grid className="p2red_bg_midle">
              <span className="verdana_big">
                <span>
                  <b>B.</b> 対人恐怖症
                </span>
              </span>
            </Grid>
            <Grid className="p2red_bg_right"></Grid>
          </Grid>
          <Grid>
            <Grid>
              <br />
              <br />
              <DataGrid
                columns={columns}
                rows={data?.data ?? []}
                getRowClassName={getRowClassName}
                disableColumnMenu={true}
                getRowHeight={() => "auto"}
                autoHeight
                hideFooter
                hideFooterSelectedRowCount
                checkboxSelection={false}
                columnHeaderHeight={30}
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
                <Grid xs={4}>{data?.data && getPageInfo(data)}</Grid>
              </Grid>
              <Grid className="p6red_bg_right size"></Grid>
            </Grid>
            <Grid container>
              <Grid container spacing={1}>
                <Grid item>
                  <img
                    src={leftbtn}
                    className="btn"
                    onClick={() => archeiveChecksheet()}
                    alt="Left Button"
                  />
                </Grid>
                <Grid item>
                  <img
                    src={rightbtn}
                    onClick={() => deleteChecksheet()}
                    className="btn"
                    alt="Right Button"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Social_phobia;
