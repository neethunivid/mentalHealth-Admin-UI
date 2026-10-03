import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef,GridPagination } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../Redux/actions";
import "../../BBS/Mail Magazine Management/Mail Magazine Components/mail_magazine.scss";
import "../../BBS/MemberData/member.scss";
import LeftPanBBS from "../../Common/LeftPanBBS";
import MailMagazineMemberlistHeader from "./Mail Magazine Components/MailMagazineMemberlistHeader";
import '../../../assets/css/health.css';
import searchbtn from "../../../assets/images/pg_20_btn_top_blue.gif";
import resetbtn from "../../../assets/images/pg_20_btn_right.gif";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
import arrowForward from "../../../assets/images/6th_btn_next.gif";
import { Button, Grid } from "@mui/material";
import { useForm} from "react-hook-form";
import ApiClient from "../../../API/API-client";

const SearchDeleteMailmembersgeneral = () => {
  const navigate = useNavigate();
  let req: any;
  const [page, setPage] = useState<any>(0);
  const [rowsPerPage, setRowsPerPage] = useState<any>(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [type, setType] = useState("");
  const [searchData, setSearchData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchMember(10, 1,"email_pc","");
    setType("email_pc")
  }, []);
  const dispatch = useDispatch();

    //the useSelector hook to extract the member_list_general data  from the Redux state 
  const data = useSelector((state: any) => {
    return state?.reducer1.data?.member_list_general;
  });

  //get mailmagazine general member
  const fetchMember = async (pagesize: any, pageNumber: number = 1,emailType:any,searchData:any) => {
    setIsLoading(true);
    pageNumber -= 1;
    try {
    if(searchData){
      req={
        pageNumber: pageNumber,
        pageSize: pagesize,
        type:emailType,
        ...(searchData.email&& { email:searchData.email }),
      ...( searchData.name&& { name: searchData.name }),
      }
    }else{
        req = {
          pageNumber: pageNumber,
          pageSize: pagesize,
          type:emailType,
        };
      }
      dispatch(fetchData("member_list_general", "api/mailmag/listgeneral", req));
      setIsLoading(false);
      if (!data || !Array.isArray(data)) {
        return null; 
      } else if (!data) {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //column definition for datagrid
  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "登録日",
      cellClassName: "tb_bdr_pg_ninteen",
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
      cellClassName: "tb_bdr_pg_ninteen",
      align: "center", flex:1,sortable:false,
      headerAlign: "center",
      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
         renderCell: (params: any) => {
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
      }
    },
    {
      field: "name",
      headerName: "ID",
      cellClassName: "tb_bdr_pg_ninteen",
      align: "center", flex:1,sortable:false,
      headerAlign: "center",

      headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
      renderCell: (params: any) => {
        if(params.row.name){
      return params.row.name
        }
      },
    },
    {
        field: "",
        headerName: "",
        flex:1,
        headerClassName: "sxth_bdr_left_bottom mail_member_sidebar_background",cellClassName: "gridcolumn-cells last-column",
        renderCell: (params) => {
              const handleEditButtonClick = () => {
                navigate('/editmailmembergeneral', { state: { data: params.row} });
              };
           
              const handleDeleteButtonClick = () => {
                deleteMember(params.row.id)
              };
            return (
              <Grid spacing={2} className="text_grid ">
                    
              <Button onClick={handleEditButtonClick}  className="sixth_right_btn member_add_thanks_text_span">
                <span className="black_link">編集</span></Button>
              <Button onClick={handleDeleteButtonClick} className='sixth_right_btn member_add_thanks_text_span mg_lftrgt'>
                <span className="black_link">削除</span></Button>
           </Grid>
            );
        },
    }
  ];
  

  const [isPcClicked, setIsPcClicked] = useState(true);
  const [isMobileClicked, setIsMobileClicked] = useState(false);
  const [pagesizevalue, setpagesizevalue] = useState<any>(10);
  const [selectedValue, setSelectedValue] = useState<any>(10);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  //handle pagesize selected by the user
  const handleChangeRowsPerPage = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(event.target.value);
    setpagesizevalue(event.target.value)
    setSelectedValue(event.target.value)
    fetchMember(event.target.value,1,type,searchData??"");
    setCurrentPage(1)
  };

  //handle pc click
  const handlePcClick = () => {
    setIsPcClicked(true);
    setIsMobileClicked(false);
    setType("email_pc")
    fetchMember(10, 1,"email_pc","")
    setSelectedValue(10);
    setpagesizevalue(0);
    setCurrentPage(1)
  };

  //handle mobile click
  const handleMobileClick = () => {
    setIsMobileClicked(true);
    setIsPcClicked(false)
    setType("email_mob")
    fetchMember(10, 1,"email_mob","")
    setSelectedValue(10);
    setpagesizevalue(0);
    setCurrentPage(1)
  };

  //styling for alternative datagrid row
  const getRowClassName = (params: any) => {

    return params.indexRelativeToCurrentPage % 2 === 0
      ? "mbr-list-bg1"
      : "mbr-list-bg2";
  };
 

  const pagesizeOption = [
    { value: '10', label: '10' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
    { value: '75', label: '75' },
    { value: '100', label: '100' },
   
];
  
//pagination
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchMember(selectedValue, pageNumber,type,searchData??"");
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

  //handle submit action
  const onSubmit = async (data: any) => {
    fetchMember(10, 1,type,data)
    setSearchData(data)
  }

  //delete the member using its id
 const deleteMember=async(id :any)=>{
  try {
    const confirmed = window.confirm('削除してもよろしいですか？');
    if(confirmed){
      const  apiData = await ApiClient.delete('api/mailmag/delete/'+id, {});
      if(apiData){
         window.location.reload()
      }
    }
  } catch (error: any) {
    console.error("Error:",error)
}

 }

 //reset the form field 
 const handleReset = async (data: any) => {
  reset();
  setSearchData(''); 
};
  return (
    <>
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanBBS />
        </Grid>
        <Grid item xs={9}>
        <MailMagazineMemberlistHeader
            title1="D.メルマガ会員の検索・修正・削除(一般）"
            title2="メルマガ管理"
          />
          <Grid className="hr"></Grid>
          
          <Grid className='mgtp_bt checkpad '><span className='blacktxt'>★会員を検索して、修正したいユーザーにチエックを入れて編集して下さい。</span></Grid>
           
            <Grid className="hr"></Grid>
            <form name="membersearch"
            id="membersearch"
            onSubmit={handleSubmit(onSubmit)} >
            <Grid xs={12} className="text_grid">
                <Grid xs={3}>
                    <span className='blacktxt checkpad mgrgt'>E-Mail</span>
                    <input  type="text"  {...register("email")}className="bdr_textw"/>
                </Grid>
                <Grid xs={3}>
                    <span className='blacktxt mgrgt'>名前</span>
                    <input type="text" {...register("name")} className="bdr_textw"/>
                </Grid>
                <Grid className='mail_magazine_list_header mg_lftrgt' xs={2}>
                <Button type="submit"><img src={searchbtn} width={64} height={18}/></Button>
                <Button type="reset"onClick={handleReset}><img src={resetbtn} width={64} height={18}/></Button>
                </Grid>
          
                <Grid className='checkpad' xs={4}>
                <button className={isPcClicked?'Active_btnmailmag':'Inactive_btnmailmag'}
                onClick={handlePcClick} 
              >
                PC
              </button>
              {" | "}
              <button
                onClick={handleMobileClick} 
                className={isMobileClicked?'Active_btnmailmag':'Inactive_btnmailmag'}
              >
                携帯
              </button>
              </Grid>
            </Grid>
            </form>
            <Grid className="tpspc"></Grid>
          {data && data.data?
          <Grid>
          <Grid container className='text_grid' xs={12}>
              <Grid xs={10}>
              <DataGrid
                rows={data?.data ?? []}
                getRowClassName={getRowClassName}
                disableColumnMenu={true}
                autoHeight
                hideFooter
                hideFooterSelectedRowCount
                columns={columns}
                className="custom-data-grid"
                columnHeaderHeight={30}
                getRowHeight={() => "auto"}
              /></Grid>
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
                        defaultValue={pagesizeOption[0].label}
                        {pagesizeOption.map((option) => (
                          <option key={option.value} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <Grid></Grid>
                    </Grid>
                  </Grid>
                  <Grid xs={4}>
                    {!isLoading && getPageInfo(data)}
                  </Grid>
                </Grid>
                <Grid className="p6red_bg_right size"></Grid>
              </Grid>
        </Grid>:<div></div>}
        </Grid>
      </Grid>
    </>
  );
};

export default SearchDeleteMailmembersgeneral;
