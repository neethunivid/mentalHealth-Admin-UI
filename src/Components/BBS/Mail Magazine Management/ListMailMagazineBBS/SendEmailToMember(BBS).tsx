import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../../Redux/actions";
import { useNavigate, useLocation } from 'react-router-dom';
import submit from '../../../../assets/images/pg_26_btn_left.gif'
import refresh from '../../../../assets/images/pg_26_btn_right.gif'
import "../../../BBS/MemberData/member.scss";
import "../../../BBS/Mail Magazine Management/Mail Magazine Components/mail_magazine.scss";
import { Grid ,Button} from "@mui/material";
import LeftPanBBS from "../../../Common/LeftPanBBS";
import timeOptionsData from "../ListMailMagazineGeneral/TimeData";
import { useForm, Controller } from 'react-hook-form';
import ApiClient from "../../../../API/API-client";
import arrowBack from "../../../../assets/images/6th_btn_previous.gif";
import arrowForward from "../../../../assets/images/6th_btn_next.gif";
import { checkDate, formatDateString, formatDateTimeArray } from "../../../Common/Date_conversion";
const ListMailMagazineBBS = () => {
  const { register, handleSubmit, watch, control, setValue, getValues, reset } = useForm();
    const navigate = useNavigate();
    let req: any;
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const[SelectedTime,setSelectedTime] =useState<any>([])
    const [selectAll, setSelectAll] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState<any>(10);
  const [selectedValue, setSelectedValue] = useState<any>(10);
  const [pagesizevalue, setpagesizevalue] = useState<any>(10);
  const [currentPage, setCurrentPage] = useState(1); 
  // Perform validation based on the value of 'sendTime' and 'sendnow'
    const sendnow = watch('sendnow');
    const sendTime = watch('sendTime');
    useEffect(() => {
     SendmailmaguserSelected();
      SendmailListBBSMember(10,1);
    }, []);
    //extract data from redux store
    const dispatch = useDispatch();
    const data = useSelector((state: any) => {
        return state?.reducer1.data?.sendmail_listbbs;
    });
    //onsubmit of reacthookform 
    const onSubmit = (data: any) => {
        if(!sendnow&&!sendTime){
            alert("ダウンロード方法を選択し、ダウンロードボタンを押して下さい。")
            return;
        }
        else if(sendTime&&(!data.year&&!data.date&&!data.month)){
            alert(" 発信日時を指定して送信する")
            return;
        }else if(selectedIds.length==0){
            alert("メールIDを選択してください")
            return
        }else  if(sendTime&&(!checkDate(`${data.Year}-${data.month}-${data.date}`))){
            alert("正しい日付形式を入力してください")
        }
        else{
            SendEmailToMember(data)
        }
  };
  let id:any;
  let title:any;
  let sendtime:any;
const location = useLocation();
//data passed from other screen is called here
if (location && location.state&& location.state.data) {
  id = location.state.data;
  title=location.state.title;
  sendtime=location.state.sendtime;
}
//fuction to reset all the inputs 
  const handleReset = () => {
      reset();
      setSelectedIds([]);
      setValue("checkboxall",false);
      setSelectAll(false);
   }

  
  const SendEmailToMember=async(data:any)=>{
    
    const Date =formatDateString(`${data.Year}-${data.month}-${data.date}`)
    const formattedDateTime = `${Date}T${data.selectedTime}:00`;
     try {
        if(sendnow==false){
            req={
                "magId":id,
                "userIds":selectedIds,
                "sendNow":0,
                "sendTime":formattedDateTime
             }
        }else{
            req={
                "magId":id,
                "userIds":selectedIds,
                "sendNow":1,
                "sendTime":""
             }
        }
         const apiData = await ApiClient.post("api/mailmag/sendMag",req,{});
         if (apiData) {
           navigate('/listmailmagazinebbs')
         }
   
       } catch (error: any) {
         // Handle errors if necessary
         console.error("API Error:", error);
       }

}

    const SendmailListBBSMember = async (pagesize: any,
        pageNumber: number = 1,) => {
            pageNumber -= 1;
        try {
           req={
            "mailmagId":id,
            pageNumber:pageNumber,
            pageSize:pagesize
           };
            dispatch(fetchData("sendmail_listbbs", "api/mailmag/maguserlist", req));
            if (!data || !Array.isArray(data)) {
                return null; 
            } else if (!data) {
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    const SendmailmaguserSelected = async () => {
        try {
            req={
                "mailmagId":id
               };
             const apiData = await ApiClient.post("api/mailmag/maguserSelected",req);
             if (apiData) {
                setSelectedTime(apiData?.data)
             }
       
           } catch (error: any) {
             // Handle errors if necessary
             console.error("API Error:", error);
           }
    };
    //handling send now checkbox
    const handleCheckboxAChange = (value: any) => {
      setValue('sendnow', value);
      if (value) {
          setValue('sendTime', false);

      }
  };
   //handling the checkbox with specific time and date
  const handleCheckboxBChange = (value: any) => {
    setValue('sendTime', value);
    if (value) {
        setValue('sendnow', false);
    }

};
//setting the checkbox to be checked on loading the page
const SetCheckboxChecked=()=>{
    const allIds = data?.data.map((row: any) => row.id);
    setSelectedIds(allIds);
}
//handling indivindual checkboxe
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
//handling all checkbox change 
const handleCheckboxAllChange=(e:any)=>{
    const isChecked = e.target.checked;
    if (isChecked) {
        const allIds = data?.data.map((row: any) => row?.id);
        setSelectedIds(allIds);
      } else {
        setSelectedIds([]);
      }

}
//handles pagination
const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(event.target.value);
    setpagesizevalue(event.target.value);
    setSelectedValue(event.target.value);
    setCurrentPage(1);
    SendmailListBBSMember(event.target.value,1);
  
  };
  
  const jsonData = [
    { value: "10", label: "10" },
    { value: "25", label: "25" },
    { value: "50", label: "50" },
    { value: "75", label: "75" },
    { value: "100", label: "100" }
  ];
  //handles pagination
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    SendmailListBBSMember(selectedValue,pageNumber)
  
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
  //defining columns of datagrid
    const columns: GridColDef[] = [
      {
        field: "select",
        headerName: "処理 ",
        headerClassName: "sixth_bdr_left_bottom mail_member_header_background white_headertext", cellClassName: "gridcolumn-cells",
        headerAlign:'center',align:'center',sortable:false,
        renderHeader: () => (
          <>
          <div className="mgrgt">処理 </div>
            <input
                type="checkbox"
                name="checkboxall"
                checked={selectedIds?.length==data?.data.length}
                onChange={(e) => {handleCheckboxAllChange(e)}}
            /></>
        ),
        renderCell: (params) => (
            <input
                type="checkbox"
                name="singlecheckboxselection"
                checked={selectedIds?.includes(params?.row?.id)}
                value={params?.row?.id} 
                onChange={(e) => {
                    handleCheckboxChange(e, params?.row?.id)
                    // Handle individual row selection here
                }}
            />
        ),
        width: 160,
    },
        {
            field: "email",
            headerName: "E-Mail",
            headerClassName: "sixth_bdr_left_bottom mail_member_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", headerAlign: "center", sortable: false,
            renderCell: (params: any) => {
                return(
                    <div>
                    {params?.row?.email}
                  </div>
                );
            },
            width: 400,
            align: 'center'
        },
        {
            field: "timevalue",
            headerName: "予約日時",
            width: 200,
            align: 'center', sortable: false,
            headerClassName: "sixth_bdr_left_bottom mail_member_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", headerAlign: "center",
            renderCell: (params: any) => {
                const matchingData:any = SelectedTime?.data?.find((item:any )=> item.mailmagazineUser === params?.row?.id);
               if(matchingData&&matchingData?.sendtime&&matchingData?.status!==1){
                   return formatDateTimeArray(matchingData?.sendtime)
               }if(matchingData&&matchingData?.status==1){
                return "送信済み";
               }
           },
        },
        {
            field: "title",
            headerName: "タイトル",
            flex: 1,
            align: 'center', sortable: false,
            headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
            cellClassName: "gridcolumn-cells", headerAlign: "center",
            renderCell: (params) => {
                const handleClick = () => {
                    navigate('/emailbbsview', { state: { data:id, email: params?.row?.email,
                       sendtime: params?.row?.sendtime } })
                }
                return (
                    <div onClick={handleClick} className="text-underline" style={{cursor:'pointer'}}>{title??title}</div>
                );
            },
        },
    ];

    //providing alternative color to datagrid rows
    const getRowClassName = (params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0
            ? "mbr-list-bg1"
            : "mbr-list-bg2";
    };
    return (
        <>
            <Grid container xs={12} padding={1} spacing={1}>
                <Grid item xs={3} spacing={2}>
                    <LeftPanBBS />
                </Grid>
                <Grid item xs={9}>
                    <Grid className="content-row">
                        <Grid className="p2red_bg_left size"></Grid>
                        <Grid className="p2red_bg_midle">
                            <Grid className="top-header">
                                <span className="verdana_big">メルマガ会員へのメール送信（BBS) </span>
                                <span className="verdana_big">メルマガ管理</span>
                            </Grid>
                        </Grid>
                        <Grid className="p2red_bg_right size"></Grid>
                    </Grid>
                    <Grid className="hr"></Grid>
                    <Grid item xs={12}>
                    <Grid className="hr"></Grid>
                    <span className="black"  >
                        ★ダウンロード方法を選択し、ダウンロードボタンを押して下さい。
                    </span>
                    <Grid className="hr"></Grid>
                </Grid>
                <form name="sendmailbbs" onSubmit={handleSubmit(onSubmit)}>
                <Grid item xs={12} className="history_page">
                <Grid item xs={12} className="table_seven" padding={3}>
                <Grid item xs={12} container padding={0.5}>
                                <Controller
                                    name="sendnow"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={(e) => handleCheckboxAChange(e.target.checked)}
                                        />
                                    )}
                                />
                                <span className="black"> 今すぐ送信する</span>
                            </Grid>

                            <Grid item xs={12} container padding={0.5} display={"flex"} flexDirection={"row"}>
                            <Grid item xs={3}>
                                    <Controller
                                        name="sendTime"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={(e) => handleCheckboxBChange(e.target.checked)}
                                            />
                                        )}
                                    />
                                    <span className="black">  発信日時を指定して送信する</span>
                                </Grid>
                                <Grid item xs={5}>
                                    <input type="text" className='bdr_text_medium'  {...register('Year')} />
                                    <label className='black'>年</label>
                                    <input type="text" className="bdr_text_medium"  {...register('month')} />
                                    <label className='black'> 月</label>
                                    <input type="text" className="bdr_text_medium"  {...register('date')} />
                                    <label className='black'> 日</label>
                                </Grid>

                                <Grid item xs={4}>
                                <Controller
                                    name="selectedTime" // The name of the field in the form data object
                                    control={control} // Control instance from useForm
                                    defaultValue={timeOptionsData[0]?.label} // Default value for the select input // Validation rules (optional)
                                    render={({ field }) => (
                                    <select {...field}>
                                    {timeOptionsData.map((option) => (
                                    <option key={option.value} value={option.label}>
                                    {option.label}
                                    </option>
                                     ))}
                                    </select>
                                        )}
                                   />
                              
                                </Grid>
                                </Grid>
                                <Grid className="hr"/>
                                <Grid className="hr"/>
                                <Grid xs={12} className="text_grid"><Grid xs={3}></Grid><span className="black content_center" >	（日時を入力して下さい。　例：2008年01月01日　19:00）</span></Grid>
                                <Grid className="hr"/>
                                <Grid>
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
          </Grid>
                        


                </Grid>
                <Grid item xs={12}>
                            <Grid container display={"flex"} justifyContent={"center"}>
                                <Button type="submit">
                                    <img src={submit} />
                                </Button>
                                <Button type="button" onClick={() => handleReset()}>
                                    <img src={refresh} />
                                </Button>
                            </Grid>
                        </Grid>
                </Grid>
                </form>
                
                    <Grid className="hr"></Grid>
                   
                    


                </Grid>
            </Grid>
        </>
    );
};

export default ListMailMagazineBBS;
