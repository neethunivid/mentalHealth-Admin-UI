import { Box, Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import back from "../../../../assets/images/btn_back_new.gif";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMemberReg } from "../../../../Redux/actions";
import LeftPanBBS from "../../../Common/LeftPanBBS";
import ApiClient from "../../../../API/API-client";
import editbtn from "../../../../assets/images/btn_edit_new.gif"
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fetchData } from "../../../../Redux/actions";
import submit from '../../../../assets/images/pg_26_btn_left.gif'
import refresh from '../../../../assets/images/pg_26_btn_right.gif'
import apiClient from "../../../../API/API-client";
import { useForm} from 'react-hook-form';
import { formatDateTimeArray } from "../../../Common/Date_conversion";
import arrowForward from "../../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../../assets/images/6th_btn_previous.gif";
const SendMailViewGeneral = () => {
    let req:any;
    const [selectedOption, setSelectedOption] = useState("SP");
    const [generalData, setGeneralData] = useState<any>({})
    const [isLoaded, setLoaded] = useState<boolean>(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, control, setValue, getValues, reset } = useForm();
    const [selectedIds, setSelectedIds] = useState<any[]>([]);
    const[SelectedTime,setSelectedTime] =useState<any>([])

    //the useSelector hook to extract the sendmail_listgeneral data from the Redux state
    const data = useSelector((state: any) => {
        return state?.reducer1.data?.sendmail_listgeneral;
    });
    let id: any;
    const location = useLocation();
    if (location && location.state && location.state.data) {
        id = location.state.data
    }
    const pagesizeOption = [
        { value: '10', label: '10' },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
        { value: '75', label: '75' },
        { value: '100', label: '100' },
       
    ];
    const [selectedValue, setSelectedValue] = useState<any>(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState<any>(10);
    const [pagesizevalue, setpagesizevalue] = useState<any>(10);
    useEffect(() => {
        
        fetchmailgeneralMemberById()
        SendmailListGeneralMember(10,1)
        SendmailmaguserSelected()
    }, []);

    //get the mail content by using id
    const fetchmailgeneralMemberById = async () => {
        try {
            const apiData = await ApiClient.get('api/mailmag/' + id);
            setGeneralData(apiData.data.data)
            if (apiData) {
                setLoaded(true)
                setGeneralData(apiData?.data?.data)
                setSelectedOption(apiData?.data?.data.type === 1 ? "PC" : "SP");

            }
        } catch (error) {
            setLoaded(true)
            console.error('Error fetching users:', error);

        }
    }
    const onSubmit=()=>{}

    //resetting the checkbox and selected id array which stores the id of selected user 
    const handleReset=()=>{
        setSelectedIds([])
        setValue("checkboxall",false);
    }

    //handle the checkbox
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>,id: any) => {
        const isChecked = event.target.checked;
        setSelectedIds((prevIds) => {
          // if is checked select box which will store the state that id
          if (isChecked) {
            return [...prevIds, id];
          } else {
            //when unselected already selected checkbox unselect using filter
            return prevIds.filter((selectedId) => selectedId !== id);
          }
        });
      };

    //to get the list of mail magazine user
    const SendmailListGeneralMember = async (pageSize:any,pageNumber: number = 1) => {
        pageNumber -= 1;
        try {
           req={
            pageSize:pageSize,
            pageNumber:pageNumber,
            "mailmagId":id
           };
            dispatch(fetchData("sendmail_listgeneral", "api/mailmag/maguserlist", req));
            if (!data || !Array.isArray(data)) {
                return null; 
            } else if (!data) {
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    //to get the selected mail magazine user
    const SendmailmaguserSelected = async () => {
        try {
            req={
                "mailmagId":id
               };
             const apiData = await apiClient.post("api/mailmag/maguserSelected",req);
             if (apiData) {
                setSelectedTime(apiData?.data)
             }
       
           } catch (error: any) {
             // Handle errors if necessary
             console.error("API Error:", error);
           }
    };
    
    //column definition for datagrid
    const columns: GridColDef[] = [
        {
            field: "select",
            headerName: "解除 ",
            headerClassName: "sixth_bdr_left_bottom mail_member_header_background white_headertext", cellClassName: "gridcolumn-cells",
            headerAlign: 'center', align: 'center', sortable: false,
            renderCell: (params: any) => (
                <input
                    type="checkbox"
                    value={params.row.id}
                    name="checkboxall"
                    checked={selectedIds?.includes(params.row.id)} 
                    onChange={(e) => {
                        handleCheckboxChange(e, params.row.id);  
                    }}
                />
            ),
            width: 170,
        },
        {
            field: "email",
            headerName: "E-Mail",
            headerClassName: "sixth_bdr_left_bottom mail_member_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", headerAlign: "center", sortable: false,
            renderCell: (params: any) => {
                return (
                    <div>
                        {params.row.email}
                    </div>
                );
            },
            width: 500,
            align: 'center'
        },
        {
            field: "sendtime",
            headerName: "予約日時",
            flex: 1,
            align: 'center', sortable: false,
            headerClassName: "sixth_bdr_left_bottom mail_member_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", headerAlign: "center",
            renderCell: (params: any) => {
                const matchingData:any = SelectedTime?.data?.find((item:any )=> item.mailmagazineUser === params.row.id);
               if(matchingData&&matchingData?.sendtime&& (matchingData&&matchingData?.status!=1)){
                   return formatDateTimeArray(matchingData?.sendtime)
               }
               if(matchingData&&matchingData?.status==1)
                {return "送信済み"};
           },
        },
    ];

    //setting the data and passs it to mail content edit page
    const handleEditClick = () => {
        const dataRequest = {
            title: generalData?.title,
            text: generalData?.text?generalData?.text:generalData?.textMob,
            id:id ,
            type:selectedOption=="PC"?1:2
          }
       // sessionStorage.removeItem("mailcontentgeneral")
        navigate('/mailcorrectiongeneral', { state: { data: dataRequest } });

    }

    //send the email to  selected mail magazine user 
    const handleSubmitClick=async()=>{
         try {
           const dataRequest={
                "magId":id,
                "userIds":selectedIds,
                "sendNow":1,
                "sendTime":""
             }
            const apiData = await apiClient.post("api/mailmag/sendMag",dataRequest,{});
            if (apiData) {
             // navigate('/listmailmagazinegeneral')
             window.location.reload()
            }
      
          } catch (error: any) {
            // Handle errors if necessary
            console.error("API Error:", error);
          }
    }

    //style for datagrid rows
    const getRowClassName = (params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0
            ? "mbr-list-bg1"
            : "mbr-list-bg2";
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement> ) => {
        setRowsPerPage(event.target.value);
        setpagesizevalue(event.target.value);
        setSelectedValue(event.target.value);
        setCurrentPage(1);
        SendmailListGeneralMember(event.target.value, 1);
    };
  
    const goToPage = (pageNumber: number) => {
      setCurrentPage(pageNumber);
      SendmailListGeneralMember(selectedValue, pageNumber);
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
    return (
        <div>
            <Grid container xs={12} padding={1} spacing={1}>
                <Grid item xs={3} spacing={2}>
                    <LeftPanBBS />
                </Grid>
                <Grid item xs={9}>
                    <Grid className="content-row">
                        <Grid className="p2red_bg_left size"></Grid>
                        <Grid className="p2red_bg_midle">
                            <Grid className="top-header">
                                <span className="verdana_big">D. メールを送信する（View）</span>
                                <span className="verdana_big">メルマガ管理</span>
                            </Grid>
                        </Grid>
                        <Grid className="p2red_bg_right size"></Grid>
                    </Grid>
                    <Grid className="hr"></Grid>
                    <form name="sendmailviewgeneral" onSubmit={handleSubmit(onSubmit)}>
                    <Grid >
                        {isLoaded && generalData?.id ?
                            <>
                                <Grid xs={12} container className="margintop">
                                    <Grid xs={2}></Grid>
                                    <Grid xs={9}>
                                        <span className="black">	★タイトル</span>
                                        <Grid className="black">{generalData?.title}</Grid>
                                    </Grid>
                                    <Grid xs={1} container spacing={1}>
                                        <Grid item className={selectedOption == "PC" ? "Active_btnmailmag" : "Inactive_btnmailmag"}
                                        >
                                            PC
                                        </Grid>
                                        <Grid item className={selectedOption == "SP" ? "Active_btnmailmag" : "Inactive_btnmailmag"}
                                        >
                                            携帯
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid xs={12} container className="margintop">
                                    <Grid xs={2}></Grid>
                                    <Grid xs={6}>
                                        <span className="black">{"★メール内容(PC)"}</span>
                                        <Grid className="black"> <span style={{ whiteSpace: 'pre-wrap' }} >{generalData?.text}</span>
                                            {/* <span className="black">{mailcontent?.text}</span> */}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid xs={12} container className="margintop">
                                    <Grid xs={2}></Grid>
                                    <Grid xs={6}>
                                        <span className="black">{"★メール内容(携帯）"}</span>
                                        <Grid className="black"> <span style={{ whiteSpace: 'pre-wrap' }} >{generalData?.textMob}</span>
                                            {/* <span className="black">{mailcontent?.text}</span> */}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} container>
                                    <Grid xs={7}></Grid>
                                    <Grid xs={5}>
                                        <Button type="button" onClick={() => handleEditClick()}>
                                            <img src={editbtn} />
                                        </Button>
                                    </Grid>
                                </Grid></> : <></>}

                        <Grid className="hr" />
                        <DataGrid
                            columns={columns}
                            rows={data?.data ?? []}
                            getRowClassName={getRowClassName}
                            autoHeight
                            rowCount={data?.data?.length ?? 0}
                            disableColumnMenu={true}
                            hideFooter
                            hideFooterSelectedRowCount
                            checkboxSelection={false}
                            rowHeight={30}
                            columnHeaderHeight={30}
                        />
                    </Grid>
                    <Grid className="content-row">
                    <Grid className="p6red_bg_left size"></Grid>
                    <Grid xs={12} container className="p6red_bg_midle">
                        <Grid xs={4} className="black"></Grid>
                        <Grid xs={4} className="black">
                            <Grid
                                container
                                flexDirection={"row"}
                                justifyContent={"flex-end"}
                                alignSelf={"center"}
                                padding={1}
                            >
                                <span className="black">行の表示 </span>
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
                        {data?.data && getPageInfo(data)}
                        </Grid>
                    </Grid>
                    <Grid className="p6red_bg_right size"></Grid>
                </Grid>
                    <Grid item xs={12}>
                            <Grid container display={"flex"} justifyContent={"center"}>
                                <Button type="button"onClick={()=>handleSubmitClick()}>
                                    <img src={submit} />
                                </Button>
                                <Button type="reset" onClick={handleReset} >
                                    <img src={refresh} />
                                </Button>
                            </Grid>
                    </Grid>
                    </form>
                </Grid>

            </Grid>
        </div>
    )
}
export default SendMailViewGeneral;