import { Button, Grid } from "@mui/material";
import React, { useState,useEffect } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LeftPanBBS from "../../../Common/LeftPanBBS";
import ApiClient from "../../../../API/API-client";
import editbtn from "../../../../assets/images/btn_edit_new.gif"
import submit1 from '../../../../assets/images/pg_26_btn_left.gif'
import refresh from '../../../../assets/images/pg_26_btn_right.gif'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { fetchData } from "../../../../Redux/actions";
import apiClient from "../../../../API/API-client";
import arrowBack from "../../../../assets/images/6th_btn_previous.gif";
import arrowForward from "../../../../assets/images/6th_btn_next.gif";
import { useForm } from 'react-hook-form';
import { formatDateTimeArray } from "../../../Common/Date_conversion";

const SendMailView_BBS = () => {
    const { register, handleSubmit, setValue} = useForm();
    let req:any;
    const [selectedOption, setSelectedOption] = useState("");
    const [bbsData, setBBSData] = useState<any>({})
    const [isLoaded,setLoaded]=useState<boolean>(false)
    const [selectedIds, setSelectedIds] = useState<any[]>([]);
     const[SelectedTime,setSelectedTime] =useState<any>([]);
     const [rowsPerPage, setRowsPerPage] = useState<any>(10);
     const [selectedValue, setSelectedValue] = useState<any>(10);
     const [pagesizevalue, setpagesizevalue] = useState<any>(10);
     const [currentPage, setCurrentPage] = useState(1); 

    const navigate = useNavigate();
    const dispatch = useDispatch();
    //extract data from redux store
    const data = useSelector((state: any) => {
        return state?.reducer1.data?.sendmail_listbbs;
    });
    let id:any;
   //getting data passed from otherscreen
const location = useLocation();
if (location && location.state&& location.state.data) {
  id = location.state.data
}
useEffect(() => {
    fetchmailbbsMemberById()
    SendmailListBBSMember(10,1)
    SendmailmaguserSelected()

  }, []);
  const onSubmit = (data: any) => {}
//resets all the checkboxes
  const handleReset = () => {
    setSelectedIds([]);
    setValue("checkboxall",false)

}
//getting th details of a single member by id
const fetchmailbbsMemberById = async () => {
    try {
         const apiData = await ApiClient.get('api/mailmag/' + id);
         setBBSData(apiData.data.data)
         if (apiData) {
            setLoaded(true)
             setBBSData(apiData?.data?.data)
             setSelectedOption(apiData?.data?.data.type === 1?"PC":"SP");
             
           
            }
     } catch (error) {
        setLoaded(true)
         console.error('Error fetching users:', error);

     }
   }
   //handle the single checkbox change
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
//list api call
    const SendmailListBBSMember = async (pagesize: any,
        pageNumber: number = 1,) => {
            pageNumber -= 1;
        try {
         const request={
            pageNumber:pageNumber,
            pageSize:pagesize,
            "mailmagId":id
           };
            dispatch(fetchData("sendmail_listbbs", "api/mailmag/maguserlist", request));
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
             const apiData = await apiClient.post("api/mailmag/maguserSelected",req);
             if (apiData) {
                setSelectedTime(apiData?.data)
             }
       
           } catch (error: any) {
             // Handle errors if necessary
             console.error("API Error:", error);
           }
    };
//pagination
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
      //pagination
      const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        SendmailListBBSMember(selectedValue,pageNumber)
      
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
      //defining columns of the datagrid
    const columns: GridColDef[] = [
        {
            field: "select",
            headerName: "解除",
            headerClassName: "sixth_bdr_left_bottom mail_member_header_background white_headertext", cellClassName: "gridcolumn-cells",
            headerAlign: 'center', align: 'center', sortable: false,
            renderCell: (params: any) => (
                <input
                    type="checkbox"
                    name="checkboxall"
                    value={params?.row?.id}
                    checked={selectedIds?.includes(params?.row?.id)} 
                    onChange={(e) => {
                        handleCheckboxChange(e,params?.row.id)   
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
                        {params?.row?.email}
                    </div>
                );
            },
            width: 500,
            align: 'center'
        },
        {
            field: "sendtime",
            headerName: "予約日時",
            flex:1,
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
    ];
    //fuction call at edit button
    const handleEditClick = () => {
        const dataRequest = {
    
            title: bbsData?.title,
            text: bbsData?.text?bbsData?.text:bbsData?.textMob,
            id:id ,
            type:selectedOption=="PC"?1:2
          }
       navigate('/emailbbsedit',{ state: { data:dataRequest}})
    }
    //function call at submit/save button
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
             window.location.reload();
           }
     
         } catch (error: any) {
           // Handle errors if necessary
           console.error("API Error:", error);
         }
   }
   //styling the alternative rows
    const getRowClassName = (params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0
            ? "mbr-list-bg1"
            : "mbr-list-bg2";
    };
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
                    <form name="sendmailtobbs" onSubmit={handleSubmit(onSubmit)}>
                    <Grid >
                       {isLoaded && bbsData?.id?
                        <>
                        <Grid xs={12} container className="margintop">
                            <Grid xs={2}></Grid>
                            <Grid xs={9}>
                                <span className="black">	★タイトル</span>
                                <Grid className="black">{bbsData?.title}</Grid>
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
                                <Grid className="black"> <span style={{ whiteSpace: 'pre-wrap' }} >{selectedOption == "PC" ?bbsData?.text:""}</span>
                                  
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={12} container className="margintop">
                            <Grid xs={2}></Grid>
                            <Grid xs={6}>
                                <span className="black">{"★メール内容(携帯）"}</span>
                                <Grid className="black"> <span style={{ whiteSpace: 'pre-wrap' }} >{selectedOption == "SP"? bbsData?.textMob:""}</span>
                                  
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
                        </Grid></>:<></>}

                        <Grid className="hr" />
                        <Grid>
                        <DataGrid
                            key="myUniqueKey"
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
                                <Button type="button" onClick={()=>handleSubmitClick()}>
                                    <img src={submit1} />
                                </Button>
                                <Button type="reset" onClick={handleReset}>
                                    <img src={refresh} />
                                </Button>
                            </Grid>
                        </Grid></form>
                </Grid>

            </Grid>
        </div>
    )
}
export default SendMailView_BBS;