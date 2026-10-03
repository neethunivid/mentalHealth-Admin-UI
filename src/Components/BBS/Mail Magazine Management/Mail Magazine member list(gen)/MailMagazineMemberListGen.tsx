import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridPagination } from "@mui/x-data-grid";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../../../BBS/Mail Magazine Management/Mail Magazine Components/mail_magazine.scss";

import { Grid ,Button} from "@mui/material";
import arrowTop from "../../../../assets/images/6th_arrow_top.gif";
import arrowBottom from "../../../../assets/images/6th_arrow_bottom.gif";
import arrowBack from "../../../../assets/images/6th_btn_previous.gif";
import arrowForward from "../../../../assets/images/6th_btn_next.gif";
import finalButton from "../../../../assets/images/btn.gif";
import MailMagazineMemberlistHeader from "../Mail Magazine Components/MailMagazineMemberlistHeader";
import LeftPanBBS from "../../../Common/LeftPanBBS";
import { fetchData } from "../../../../Redux/actions";
import ApiClient from "../../../../API/API-client";
const MailMagazineMemberListGen = () => {
  const navigate = useNavigate();
  let req: any;
  let searchrequest: any;
  let searchflag: any;
  let pagesize: any;
  const [page, setPage] = useState<any>(0);
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("");
  const [sortField, setSortField] = useState()
  const [sortOrder, setSortOrder] = useState()
  useEffect(() => {
    fetchMember(10, 1,"","","email_pc");
    setType("email_pc")
  }, []);
  const dispatch = useDispatch();
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.member_list_general;
  });

  const fetchMember = async (pagesize: any, pageNumber: number = 1, sortField: any, sortOrder: any,emailType:any) => {
    setIsLoading(true);
    pageNumber -= 1;
    try {
    
        req = {
          pageNumber: pageNumber,
          pageSize: pagesize,
          type:emailType,
          ...(sortField && { sortField: sortField }),
          ...(sortOrder && { sortOrder: sortOrder }),
        };
      dispatch(fetchData("member_list_general", "api/mailmag/listgeneral", req));
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

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "登録日",
      cellClassName: "gridcolumn-cells blacktxt",
      headerAlign: "center",
      flex:1,sortable:false,
      align: "center",
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      renderCell: (params: any) => {
        if(params.row.date){
          const year = params.row.date[0];
          const month = String(params.row.date[1]).padStart(2, "0");
          const day = String(params.row.date[2]).padStart(2, "0");
          const formattedDate = `${year}.${month}.${day}`;
          return formattedDate;
        }
     
      },
    },
    {
      field: "email",
      headerName: "Email",
      cellClassName: "gridcolumn-cells blacktxt",
      align: "center", flex:1,sortable:false,
      headerAlign: "center",
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      renderCell: (params) => {
        if(type=="email_pc"){
          return(
          <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row.email}</div>
          )
        }
        else{
          return(
            <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row.emailMob}</div>
            )
        }
      },
    },
    {
      field: "name",
      headerName: "名前",
      cellClassName: "gridcolumn-cells blacktxt",
      align: "center", flex:1,sortable:false,
      headerAlign: "center",

      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      renderCell: (params: any) => {
        if(params.row.name){
      return params.row.name
        }
      },
    },
  ];

  const [isPcClicked, setIsPcClicked] = useState(true);
  const [isMobileClicked, setIsMobileClicked] = useState(false);

  const handlePcClick = () => {
    setIsPcClicked(true);
    setIsMobileClicked(false);
    setType("email_pc")
    fetchMember(10, 1,sortField??"",sortOrder??"","email_pc")
    setSelectedValue(10);
    setpagesizevalue(0);
    setCurrentPage(1)
  };

  const handleMobileClick = () => {
    setIsMobileClicked(true);
    setIsPcClicked(false)
    setType("email_mob")
    fetchMember(10, 1,sortField??"",sortOrder??"","email_mob")
    setSelectedValue(10);
    setpagesizevalue(0);
    setCurrentPage(1)
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchMember(selectedValue, pageNumber,sortField, sortOrder,type);
  };

  const getPageInfo = (data: any) => {
    let page: any = currentPage ? currentPage : 1;
    let offset: any = (page - 1) * selectedValue + 1;
    let count: any = page * selectedValue;
    let totalRows: any = data && data["count"] ? data["count"] : 0;
    let totalPages: number = Math.ceil(totalRows / selectedValue);
    if(count>totalRows){
      count=totalRows;
    }
    return (<>
      <span className='padding'>
        <span className='black'>{data?.count + "件中"}</span>
        <span className='black'>{offset}〜{count}件 </span>
    {page > 1 && <img onClick={() => { goToPage(currentPage - 1) }} src={arrowBack}></img>}
    {totalPages > page && <img onClick={() => { goToPage(currentPage + 1) }} src={arrowForward}></img>}
    </span>
    </>)
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const [pagesizevalue, setpagesizevalue] = useState<any>(10);
  const [selectedValue, setSelectedValue] = useState<any>(10);
  const handleChangeRowsPerPage = (
    // event: React.ChangeEvent<HTMLInputElement>
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(event.target.value);
    setpagesizevalue(event.target.value);
    setSelectedValue(event.target.value);
    setCurrentPage(1);
   fetchMember(event.target.value,1,sortField,sortOrder,type);
  };
  const getRowClassName = (params: any) => {
    return params.indexRelativeToCurrentPage % 2 === 0
      ? "mbr-list-bg1"
      : "mbr-list-bg2";
  };

  const hidePaginationStyles = {
    display: "none",
  };

  const CustomPagination = () => {
    return <GridPagination style={hidePaginationStyles} />;
  };

  const jsonData = [
    { value: "10", label: "10" },
    { value: "50", label: "50" },
    { value: "100", label: "100" },
    { value: "200", label: "200" },
    { value: "500", label: "500" },
    { value: "1000", label: "1000" },
    { value: "1500", label: "1500" },
  ];
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const CustomHeader = (column: any) => {
    return (<Grid>
      <Grid container xs={12} display={"flex"} flexDirection={"row"}>
        <span>{column.column.colDef.headerName}</span>
        {column.column.field != "name" ?
          <div className='sort-arrow-container'>
            <img src={arrowTop} className="sortarrow" onClick={() => { handleSortClick(column.column.field, "ASC") }} />
            <img src={arrowBottom} className="sortarrow" onClick={() => { handleSortClick(column.column.field, "DESC") }} />
          </div>
          : null}
      </Grid>
    </Grid>
    );
  }
  const handleDownload=()=>{
    DownloadGeneralList()

  }
  function formatDate(date: any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
  const DownloadGeneralList= async()=>{
   const  dataRequest={
    type:isPcClicked?"PC":"MOB",
    listType:"GENERAL"
    }
    try {
     const  apiData = await ApiClient.post('api/export/mailmagUserDownload', dataRequest, {});
      if (apiData) {
        const date = new Date();
        const formattedDate = formatDate(date);
          downloadFile(apiData.data, `mailmemberGenerallist${formattedDate}`, 'text/csv')
      }
  } catch (error: any) {
      if (error.response && error.response.status === 403) {
          console.log("403 error occurred");
      } else {
          console.log("Error occurred:", error);
      }
  }
  }
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
  const handleSortClick = (field: any, sortOrder: any) => {
    setSortField(field);
    setSortOrder(sortOrder)
    fetchMember(selectedValue ? selectedValue : 10, currentPage ? currentPage : 1, field, sortOrder,type)
  }
  return (
    <div>
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanBBS />
        </Grid>
        <Grid item xs={9}>
          <MailMagazineMemberlistHeader
            title1="B.メルマガ会員一覧 (一般)"
            title2="メルマガ管理"
          />
          <Grid className="hr"></Grid>
          <Grid xs={12} className="mail_magazine_list_header">
          <Grid xs={10}>
              {" "}
              <button className={isPcClicked?'Active_btnmailmag':'Inactive_btnmailmag'}
                onClick={handlePcClick} 
              >
                PC
              </button>
              {" | "}
              <button
                onClick={handleMobileClick} className={isMobileClicked?'Active_btnmailmag':'Inactive_btnmailmag'}
              >
                携帯
              </button>
            </Grid>
            <Grid xs={2} className="mglft">
              <Grid>
                <img src={arrowTop} alt="arrow-top" />
                <span>ソート降順</span>
              </Grid>
              <Grid>
                <img src={arrowBottom} alt="arrow-bottom" />
                <span>ソート昇順</span>
              </Grid>
            </Grid>
          </Grid>
          {!isLoading && data && data.data  ?
          <>
          <div>
           
            <Grid
              xs={10}
            >
              <DataGrid
                rows={data?.data ?? []}
                getRowClassName={getRowClassName}
                disableColumnMenu={true}
                autoHeight
                hideFooter
                hideFooterSelectedRowCount
                columns={columns.map((col) => ({
                  ...col,
                  renderHeader: (params: any) => <CustomHeader column={params} />,
                }))}
                //   hideFooterPagination
              />
            </Grid>
            <Grid className='hr'></Grid>
              <Grid  className="content-row">
                <Grid className="p6red_bg_left"></Grid>
                <Grid xs={10} container className="p6red_bg_midle">
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
                  <Grid xs={3}>
                    {!isLoading && getPageInfo(data)}
                  </Grid>
                </Grid>
                <Grid className="p6red_bg_right size"></Grid>
              </Grid>

            {/* <TablePagination
          component="div"
          count={data?.data?.length ?? 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ backgroundColor: "blue", color: "white" }}
        /> */}
          </div>
          <Grid className="hr"></Grid>
          <Grid xs={12} className=" mail_magazine_list_header">
            <Grid xs={8}></Grid>
            <Grid xs={4}>
              <Button onClick={()=>handleDownload()}><img src={finalButton}></img></Button>
            </Grid>
          </Grid></>:<div></div>}
        </Grid>
      </Grid>
    </div>
  );
};

export default MailMagazineMemberListGen;
