import React, { useState, useEffect,useRef } from "react";
import { DataGrid, GridColDef,GridPagination } from "@mui/x-data-grid";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../Redux/actions";
import "../../BBS/Mail Magazine Management/Mail Magazine Components/mail_magazine.scss";
import "../../BBS/MemberData/member.scss";
import { Grid,Box,Button } from "@mui/material";
import LeftPanBBS from "../../Common/LeftPanBBS";
import MailMagazineMemberlistHeader from "./Mail Magazine Components/MailMagazineMemberlistHeader";
import '../../../assets/css/health.css';
import { useForm, Controller } from "react-hook-form";
import searchbtn from "../../../assets/images/pg_20_btn_top_blue.gif";
import resetbtn from "../../../assets/images/pg_20_btn_right.gif";
import arrowTop from "../../../assets/images/6th_arrow_top.gif";
import arrowBottom from "../../../assets/images/6th_arrow_bottom.gif";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
import arrowForward from "../../../assets/images/6th_btn_next.gif";
import ApiClient from "../../../API/API-client";

const SearchDeleteMailmembersbbs = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  let req: any;
  const [page, setPage] = useState<any>(0);
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchData, setSearchData] = useState<any>("")
  const [sortOrder, setSortOrder] = useState()
  const gridRef = useRef(null);
  //get data from redux store
  const dispatch = useDispatch();
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.mailmemberlist_bbs;
  });
  useEffect(() => {
    fetchMember(10,1,"email_pc","");
  }, []);
  
//listapi call to get the datas in datagrid
  const fetchMember = async (pagesize: any, pageNumber: number = 1, type: "email_pc" | "email_mob",searchData:any) => {
    setIsLoading(true);
      pageNumber -= 1;
  
    try {
      if(searchData){
        req={
          pageNumber: pageNumber,
          pageSize: pagesize,
          type:type,
          ...(searchData?.email&& { email:searchData?.email }),
        ...( searchData?.name&& { name: searchData?.name }),
        }
      }else{
      
      req = {
        type:type,
        pageNumber: pageNumber,
        pageSize: pagesize,

      };
    }
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
  //defing the datagrid columns
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
      flex:3,
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
      field: "memberId",
      headerName: "ID",
      flex:1,
      sortable: false,
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",cellClassName:"gridcolumn-cells blacktxt",
      align:'center',headerAlign:"center",
      renderCell: (params: any) => {
        if (params?.row?.memberId) {
          return params?.row?.memberId;
        }
        return null;
      },
    },
    {
      field: "member",
      headerName: "会員番号",
      flex:1,
      sortable: false,
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",align:'center',headerAlign:"center",cellClassName:"gridcolumn-cells blacktxt",
      renderCell: (params:any) => {
        if (params.row?.member) {
          return params.row?.member;
        }
        // Return a fallback value if the property is not available
        return null;
    },
  },
    {
        field: "",
        headerName: "",
        width: 200,
        sortable: false,
       // flex:1,
        headerClassName: "sxth_bdr_left_bottom",cellClassName: "gridcolumn-cells last-column",align:'center',
        renderCell: (params) => {
          const handleEditButtonClick = () => {
            navigate('/memberedit', { state: { data: params.row?.member } });
          };
            const deleteBBSMember = async () => {
               let memberId=params.row?.id;
              const confirmed = window.confirm('削除してもよろしいですか？');
              if (confirmed) {
                try {
                  const apiData = await ApiClient.delete('api/mailmag/delete/' +memberId , {});
                  if (apiData) {
                    window.location.reload();
                  }
                  
                } 
               catch (error: any) {
                  if (error.response && error.response.status === 403) {
                      console.error("403 error occurred");
                  } else {
                      console.error("Error occurred:", error);
                  }
              }
              }
              }
          
    
            return (
                <Grid spacing={2} className="text_grid ">
                    
                   <Button onClick={handleEditButtonClick}  className="sixth_right_btn member_add_thanks_text_span"><span className="black_link">編集</span></Button>
                   <Button onClick={deleteBBSMember} className='sixth_right_btn member_add_thanks_text_span mg_lftrgt'><span className="black_link">削除</span></Button>

                   
                </Grid>
            );
        },
    }
  ];
  //search fuction according to the data entered in the forminput
  const onsubmit = async (data: any) => {

   fetchMember(10,1,isPcClicked ? "email_pc" : "email_mob",data);
   setSearchData(data)
  
  };

  const [isPcClicked, setIsPcClicked] = useState(true);
  const [isMobileClicked, setIsMobileClicked] = useState(false);
//function for reset
  const handleReset = async (data: any) => {
  reset();
  setSearchData(''); 
};
//handles the pc click 
  const handlePcClick = () => {
    setIsPcClicked(true);
    setIsMobileClicked(false);
   fetchMember(10, 1, "email_pc","");
   setpagesizevalue(0);
   setSelectedValue(10);
   setCurrentPage(1);
  };

//handles the mobileclick
  const handleMobileClick = () => {
    setIsPcClicked(false);
    setIsMobileClicked(true);
   
    fetchMember(10, 1, "email_mob","");
    setpagesizevalue(0);
    setSelectedValue(10);
    setCurrentPage(1);
  };

//pagination
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchMember(selectedValue, pageNumber,isPcClicked ? "email_pc" : "email_mob",searchData??"");
}
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


  const [pagesizevalue, setpagesizevalue] = useState<any>(10);
  const [selectedValue, setSelectedValue] = useState<any>(10);
  //pagination
  const handleChangeRowsPerPage = (
    // event: React.ChangeEvent<HTMLInputElement>
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(event.target.value);
    setpagesizevalue(event.target.value);
    setSelectedValue(event.target.value);
    setCurrentPage(1);
    // navigate('/memberlist', { state: { pagesize: event.target.value } });
    fetchMember(event.target.value,1,isPcClicked ? "email_pc" : "email_mob",searchData??"");
  };
  //styling for alternative rows
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
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "75", label: "75" },
    { value: "100", label: "100" },
  ];
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  
  return (
    <>
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanBBS />
        </Grid>
        <Grid item xs={9} ref={gridRef}>
        <MailMagazineMemberlistHeader
            title1="C.メルマガ会員の検索・修正・削除（BBS)"
            title2="メルマガ管理"
          />
          <Grid className="hr"></Grid>
          
          <Grid className='mgtp_bt checkpad '><span className='blacktxt'>★会員を検索して、修正したいユーザーにチエックを入れて編集して下さい。</span></Grid>
           
            <Grid className="hr"></Grid>
            <form name="mailmember_BBSsearch_form" onSubmit={handleSubmit(onsubmit)}>
            <Grid xs={12} className="text_grid">
                <Grid xs={3}>
                    <span className='blacktxt checkpad mgrgt'>E-Mail</span>
                    <input type="text" className="bdr_textw" {...register("email")}/>
                </Grid>
                <Grid xs={3}>
                    <span className='blacktxt mgrgt'>名前</span>
                    <input type="text" className="bdr_textw" {...register("name")}/>
                </Grid>
                <Grid className='mail_magazine_list_header mg_lftrgt' xs={2}>
                                <Button type="submit"><img src={searchbtn} width={64} height={18}/></Button>
                                <Button type="reset" onClick={handleReset}><img src={resetbtn} width={64} height={18}/></Button></Grid>
                                <Grid className='checkpad' xs={4}>
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
              </button></Grid>
            </Grid>
            </form>
            <Grid className="tpspc"></Grid>
            {data && data.data?
          <Grid xs={12}>
          <Grid xs={10}>
          <DataGrid
            columns={columns}
            rows={data?.data ?? []}
            getRowClassName={getRowClassName}
          
          
            disableColumnMenu={true}
            autoHeight
            hideFooter
            hideFooterSelectedRowCount
           className="custom-data-grid"
           rowHeight={38} 
           columnHeaderHeight={38}
          />
         
          </Grid>
          <Grid className='hr'></Grid>
              <Grid container className="content-row">
                <Grid className="p6red_bg_left"></Grid>
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
          
          </Grid>
        </Grid>
      
    </>
  );
};

export default SearchDeleteMailmembersbbs;
