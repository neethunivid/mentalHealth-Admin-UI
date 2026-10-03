import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../Redux/actions";
import { useLocation, useNavigate } from "react-router-dom";
import LeftPanChecksheet from "../../Check Sheet Mail/LeftPanChecksheet";
import arrowForward from "../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
import CheckSheetHeader from "../Common/CheckSheetHeader";
import { formatDateArray1, getCurrentDateTimevalue } from "../../Common/Date_conversion";
import ApiClient from "../../../API/API-client";

const PastHistory = () => {
  const navigate = useNavigate();
  let req: any;
  let countvalue:any;
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
  const [isLoaded,setLoaded]=useState<any>(false)
  const [count,setCount]=useState<any>(0)

  //handle the pagesize selected by user
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(event.target.value);
    setpagesizevalue(event.target.value);
    setSelectedValue(event.target.value);
    setCurrentPage(1);
    countvalue=1;
    fetchList(event.target.value, 1,finYear);
  };

  //column definition for datagrid
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "No",
      width:5,
      headerAlign: "center",
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
    },
    {
      field: "receivedDate",
      headerName: "受付",
      headerAlign: "center",
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
       
        if (params.row.receivedDate) {
          return formatDateArray1(params?.row?.receivedDate)
        }
        else{
          return null
        }
      },
      width: 80,
    },
    {
      field: "userName",
      headerName: "名前",
      headerAlign: "center",
      width: 90,
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      renderCell: (params) => {
       
        if (params?.row?.userName) {
          return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params?.row?.userName}</div>
        }
        else{
          return null
        }
      },
    },
    {
      field: "userEmail",
      headerName: "Email",
      headerAlign: "center",
      width: 135,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
       
        if (params?.row?.userEmail) {
          return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params?.row?.userEmail}</div>
        }
        else{
          return null
        }
      },
    },
    {
      field: "mailSendDate",
      headerName: "返信日付",
      headerAlign: "center",
      width:80,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
       
        if (params.row.mailSendDate) {
          return formatDateArray1(params?.row?.mailSendDate)
        }
        else{
          return null
        }
      }
    },
    {
      field: "title",
      headerName: "チェックシート名 ",
      headerAlign: "center",
      width: 120,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
       
        if (params?.row?.checkSheetType?.title) {
          return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params?.row?.checkSheetType?.title}</div>
        }
        else{
          return null
        }
      }
    },
    {
      field: "deviceInfo",
      headerName: "デバイス名",
      headerAlign: "center",
      width:120,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        if (params?.row?.deviceInfo) {
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
        }
        else{
          return null
        }
      }
    },
    {
      field: "diagnosisResult",
      headerName: "診断結果 ",
      headerAlign: "center",
    width:120,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        if (params?.row?.diagonoseResult) {
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
        }
        else{
          return null
        }
      }
    },
    {
      field: "consultationContent",
      headerName: "相談内容",
      headerAlign: "center",
      width: 120,
      headerClassName: "td_ninteen_1 mail_member_header_background",
      cellClassName: "dgridcolumn-cell",
      sortable: false,
      renderCell: (params) => {
        if (params?.row?.checkSheetContent) {
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
        }
        else{
          return null
        }
      }
    },
  ];

  const pageSizeOption = [
    { value: "10", label: "10" },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
    { value: '75', label: '75' },
    { value: '100', label: '100' },
  ];
  const [pagesizevalue, setpagesizevalue] = useState<any>(10);
  const dispatch = useDispatch();
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.member_list;
  });
  const [rowId, setRowId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState<any>(10);
  const [finYear,setfinYear]=useState<any>()

  //style for datagrid rows
  const getRowClassName = (params: any) => {
    return params.indexRelativeToCurrentPage % 2 === 0
      ? "checkCell-list-bg1"
      : "checkCell-list-bg2";
  };
  useEffect(() => {
    fetchList(10,1,"")
   
  }, []);

  //function to get archive record list depending upon the finanacial year
  const fetchList = async ( pagesize: any,pageNumber: number = 1,finYear:any) => {
    try {
      req = {
        pageNumber: pageNumber,
        pageSize: pagesize,
        ...(finYear && {  finYear: finYear})
      };

      dispatch(fetchData("member_list", "api/checksheetmail/archiverecordlist", req));
      setLoaded(true)
      setSelectedValue(pagesize)
      if(countvalue==1){
        setCurrentPage(1);
      }
      if (!data || !Array.isArray(data)) {
        return null; // Return null or a fallback component if the data is not available or is not an array
      } else if (!data) {
      }
    } catch (error) {
      setLoaded(true)
      console.error("Error :", error);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchList(selectedValue, pageNumber,finYear);
  };
  //pagination
  const getPageInfo = (data: any) => {
    let page: any = currentPage ? currentPage : 1;
    let offset: any = ((page - 1) * selectedValue) + 1
    let count: any = page * selectedValue;
    let totalRows: any = data && data['count'] ? data['count'] : 0;
    let totalPages: number = Math.ceil(totalRows / selectedValue);
    if (count > totalRows) {
      count = totalRows;
    }
    return (<>
      <span className='padding'>
        <span className='black'>{data?.count + "件中"}</span>
        <span className='black'>{offset}〜{count}件 </span>
        {page > 1 && <img onClick={() => { goToPage(currentPage - 1) }} src={arrowBack}></img>}
        {totalPages > page && <img onClick={() => { goToPage(currentPage + 1) }} src={arrowForward}></img>}
      </span>
    </>
    );
  }

  //handle the selected year
  const handleyearClick=(finyear:any)=>{
    setfinYear(finyear)
    countvalue=1;
    fetchList(10, 1, finyear,)
  }

  //csv download
  const handleCSVDownload=async(finYear:any)=>{
    const dataRequest={
      finYear:finYear
    }
   const  currentDate=getCurrentDateTimevalue()
    try {
    const  apiData = await ApiClient.post('api/export/checkSheetdownload', dataRequest, {});
      if (apiData) {
          downloadFile(apiData.data,`Report${currentDate}`, 'text/csv')
      }
  } catch (error: any) {
     console.error("Error:",error)
  }
  }
  //converting the api data to csv file format
  const downloadFile = (data: any, fileName: any, fileType: any) => {
    const blob = new Blob(["\ufeff" + data], { type: "text/csv;charset=UTF-8" })
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
}
  return (
    <Box>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={3}>
          <LeftPanChecksheet />
        </Grid>
        <Grid item xs={9}>
          <CheckSheetHeader label="H.過去の履歴" />
          <Grid className="hr"> </Grid>
          <Grid className="table_seven past_border_padding">
            <Grid className="content-row">
            
              {data?.data?.finYear.map((year:any) => (
                  <Grid className="content-row">
                    <span key={year} onClick={() => handleyearClick(year)} className="custom-date-text mgleft" >
                      {`${year}年          `}
                    </span>
                   <span key={year} onClick={() => handleCSVDownload(year)} className="custom-date-text mgleft">
                      ( ダウンロード)	
                    </span>
                  </Grid>
              ))}
            </Grid>
           
            <Grid>
              <Grid className="hr"></Grid>
              <label>クリニックで履歴を表示</label>
              <Grid>
                <br />
                <br />

                <DataGrid
                  columns={columns}
                  rows={data?.data.diagnoseCheck ?? []}
                  getRowHeight={() => "auto"}
                  getRowClassName={getRowClassName}
                  disableColumnMenu={true}
                  autoHeight
                  hideFooter
                  hideFooterSelectedRowCount
                  columnHeaderHeight={30}
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
                        defaultValue={pageSizeOption[0].label}
                        {pageSizeOption.map((option) => (
                          <option key={option.value} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <Grid></Grid>
                    </Grid>
                  </Grid>
                  <Grid xs={4}>{isLoaded && getPageInfo(data)}</Grid>
                </Grid>
                <Grid className="p6red_bg_right size"></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default PastHistory;
