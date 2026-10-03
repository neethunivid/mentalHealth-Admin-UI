import React, { useState, useEffect,useRef } from "react";
import { DataGrid, GridColDef, GridPagination } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../Redux/actions";
import "../../BBS/MemberData/member.scss";
import "../../BBS/Mail Magazine Management/Mail Magazine Components/mail_magazine.scss";
import { Grid,Button } from "@mui/material";
import LeftPanBBS from "../../Common/LeftPanBBS";
import MailMagazineMemberlistHeader from "./Mail Magazine Components/MailMagazineMemberlistHeader";
import arrowTop from "../../../assets/images/6th_arrow_top.gif";
import arrowBottom from "../../../assets/images/6th_arrow_bottom.gif";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
import arrowForward from "../../../assets/images/6th_btn_next.gif";
import finalButton from "../../../assets/images/btn.gif";
import uparrow from '../../../assets/images/6th_arrow_top.gif';
import downarrow from '../../../assets/images/6th_arrow_bottom.gif';
import ApiClient from "../../../API/API-client";
//function for sorting
export function SortedAscendingIcon() {
  return <img src={uparrow} width="10" height="10" />;
}
//fuction for sorting
export function SortedDescendingIcon() {
  return <img src={downarrow} width="10" height="10" />;
}

const MailMagazineMemberList = () => {
  const navigate = useNavigate();
  let req: any;
  let type:any;
  const [page, setPage] = useState<any>(0);
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [sortField, setSortField] = useState()
  const [sortOrder, setSortOrder] = useState()
  const gridRef = useRef(null);
  const dispatch = useDispatch();
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.mailmemberlist_bbs;
  });
  //function for list api
  const fetchMember = async (pagesize: any, pageNumber: number = 1, sortField: any, sortOrder: any, type: "email_pc" | "email_mob") => {
    setIsLoading(true);
      pageNumber -= 1;
    try {
      req = {
        type:type,
        pageNumber: pageNumber,
        pageSize: pagesize,
        ...(sortField && { sortField: sortField }),
        ...(sortOrder && { sortOrder: sortOrder }),

      };
      dispatch(fetchData("mailmemberlist_bbs", "api/mailmag/listbbs", req));
      setIsLoading(false);
      if (!data || !Array.isArray(data)) {
        return null;
      } else if (!data) {
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  //cals the listingapi in the loading of the page
  useEffect(() => {
    fetchMember(10,1,"","","email_pc");
  }, []);
  //defines the column of a datagrid
  const columns: GridColDef[] = [
    
    {
      field: "date",
      headerName: "登録日",
      sortable: false,
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",cellClassName:"gridcolumn-cells blacktxt",
      align:'center',headerAlign:"center",
      renderCell: (params: any) => {
        if (params.row?.date && params.row?.date?.length >= 3) {
        const year = params.row?.date[0];
        const month = String(params.row?.date[1]).padStart(2, "0");
        const day = String(params.row?.date[2]).padStart(2, "0");
        const formattedDate = `${year}.${month}.${day}`;
        return formattedDate;
      }
      return null;
    },
      flex:1
    },
    {
      field: "email",
      headerName: "E-Mail",
      flex:2,
      sortable: false,
      headerClassName: "td_ninteen_1 mail_member_header_background",cellClassName:"gridcolumn-cells blacktxt",
      align:'center',headerAlign:"center",
      renderCell: (params:any) => {
        if (isPcClicked && params.row?.email) {
          return params.row?.email;
        }
        else{
          return params.row?.emailMob;
        }
      
      },
    },
    {
      field: "name",
      headerName: "名前",
      flex:1,
      sortable: false,
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",cellClassName:"gridcolumn-cells blacktxt",
      align:'center',headerAlign:"center",
      renderCell: (params: any) => {
        if (params.row?.memberName!=null || params.row?.memberName2!=null) {
        const fullName = `${params.row?.memberName!=null?params.row?.memberName:""} ${params.row?.memberName2!=null?params.row?.memberName2:""}`;
        return fullName;
        }
        return null;
      },
    },
    {
      field: "id",
      headerName: "ID",
      flex:1,
      sortable: false,
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",align:'center',headerAlign:"center",cellClassName:"gridcolumn-cells blacktxt",
      renderCell: (params:any) => {
        if (params.row?.memberId) {
          return params.row?.memberId;
        }
        // Return a fallback value if the property is not available
        return null;
    },
  }
  ];
//to render data according to pc and mobile click
  const [isPcClicked, setIsPcClicked] = useState(true);
  const [isMobileClicked, setIsMobileClicked] = useState(false);
 //function called in the pc click
  const handlePcClick = () => {
    setIsPcClicked(true);
    setIsMobileClicked(false);
   fetchMember(10, 1,sortField??"",sortOrder??"", "email_pc");
   setpagesizevalue(0);
   setSelectedValue(10);
   setCurrentPage(1);
  };

//function called in the mobile click
  const handleMobileClick = () => {
    setIsPcClicked(false);
    setIsMobileClicked(true);
   
    fetchMember(10, 1,sortField??"",sortOrder??"", "email_mob");
    setpagesizevalue(0);
    setSelectedValue(10);
    setCurrentPage(1);
  };
  //download the files
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
//function to covert date array in the yyyy-mm-dd format
function formatDate(date: any) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
//doawnload the bbsmemberlist

const downloadbbsList= async ()=>{
  const dataRequest = {
       type:isPcClicked?"PC":"MOB" ,
       listType:"BBS"
  
}
try {
   const apiData = await ApiClient.post('api/export/mailmagUserDownload', dataRequest);
   const date = new Date();
   const formattedDate = formatDate(date);
   if (apiData) {
       downloadFile(apiData.data, `mailmemberBBS_List_${formattedDate}`, 'text/csv')
   }

} catch (error: any) {
   if (error.response && error.response.status === 403) {

       console.error("403 error occurred");
   } else {

       console.error("Error occurred:", error);
   }
}

}
const handleDownload=()=>{
  downloadbbsList();
}
//pagination
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchMember(selectedValue, pageNumber, sortField??"", sortOrder??"",isPcClicked ? type="email_pc" :type= "email_mob");
}

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


  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const [pagesizevalue, setpagesizevalue] = useState<any>(10);
  const [selectedValue, setSelectedValue] = useState<any>(10);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(event.target.value);
    setpagesizevalue(event.target.value);
    setSelectedValue(event.target.value);
    setCurrentPage(1);
    // navigate('/memberlist', { state: { pagesize: event.target.value } });
    fetchMember(event.target.value,1,sortField,sortOrder,isPcClicked ? type= "email_pc" : type="email_mob");
  };
  //sort button click handling
  const handleSortClick = (field: any, sortorder: any) => {
    setSortField(field);
    setSortOrder(sortorder)
    fetchMember(selectedValue ? selectedValue : 10, currentPage ? currentPage : 1, field, sortorder,isPcClicked ? type="email_pc" :type= "email_mob")
  }
  //bg colour change for odd and even rows
  const getRowClassName = (params: any) => {
    return params.indexRelativeToCurrentPage % 2 === 0
      ? "mbr-list-bg1"
      : "mbr-list-bg2";
  };

  const hidePaginationStyles = {
    display: "none",
  };

  
//taking json data for pagination
  const jsonData = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "75", label: "75" },
    { value: "100", label: "100" },
  ];
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  //giving customised style for header of datagrid
  const CustomHeader = (column: any) => {
    return (<Grid>
      <Grid container xs={12} display={"flex"} flexDirection={"row"}>
        <span>{column.column.colDef.headerName}</span>
        {column.column.field != "name" && column.column.field != "id" ?
          <div className='sorticonarrow'>
            <img src={uparrow} className="sortarrow" onClick={() => { handleSortClick(column.column.field, "ASC") }} />
            <img src={downarrow} className="sortarrow" onClick={() => { handleSortClick(column.column.field, "DESC") }} />
          </div>
          : null}
      </Grid>
    </Grid>
    );
  }
  return (
    <>
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanBBS />
        </Grid>
        <Grid item xs={9} ref={gridRef}>
          <MailMagazineMemberlistHeader
            title1="A.メルマガ会員一覧"
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
                <span className="black">ソート降順</span>
              </Grid>
              <Grid>
                <img src={arrowBottom} alt="arrow-bottom" />
                <span className="black">ソート昇順</span>
              </Grid>
            </Grid>
          </Grid>
          {!isLoading && data && data.data ?
          <Grid>
        
            <Grid
              xs={10} >
              <DataGrid
               sx={{
                '.MuiDataGrid-iconButtonContainer': {
                  visibility: 'visible',
                },
                '.MuiDataGrid-sortIcon': {
                  opacity: 'inherit !important',
                },
              }}
              // columns={columns}
              columns={columns.map((col) => ({
                ...col,
                renderHeader: (params: any) => <CustomHeader column={params} />,
              }))}
                rows={data?.data ?? []}
                getRowClassName={getRowClassName}
             
                disableColumnMenu={true}
                autoHeight
                hideFooter
                hideFooterSelectedRowCount
                rowHeight={38} 
               columnHeaderHeight={38}
              />
            </Grid>
            <Grid className='hr'></Grid>
              <Grid className="content-row">
                <Grid className="p6red_bg_left size"></Grid>
            <Grid xs={10} container className=" p6red_bg_midle">
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
              <Grid className="p6red_bg_right"></Grid>
            
            </Grid>
          
          </Grid>:<div></div>}
          <Grid className="hr"></Grid>
          <Grid xs={12} className=" mail_magazine_list_header">
            <Grid xs={8}></Grid>
            <Grid xs={4}>
              <Button onClick={()=>handleDownload()}> <img src={finalButton}></img></Button>
             
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default MailMagazineMemberList;
