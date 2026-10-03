import { useEffect,useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../../Redux/actions";
import "../../../BBS/MemberData/member.scss";
import "../../../BBS/Mail Magazine Management/Mail Magazine Components/mail_magazine.scss";
import { Grid ,Button} from "@mui/material";
import LeftPanBBS from "../../../Common/LeftPanBBS";
import deletebtn from '../../../../assets/images/btn_delete_new.gif';
import editbtn from '../../../../assets/images/btn_edit2_new.gif';
import ApiClient from "../../../../API/API-client";
import { formatDateTimeArray } from "../../../Common/Date_conversion";
import arrowBack from "../../../../assets/images/6th_btn_previous.gif";
import arrowForward from "../../../../assets/images/6th_btn_next.gif";


const ListMailMagazineBBS = () => {
    const [rowsPerPage, setRowsPerPage] = useState<any>(10);
    const [selectedValue, setSelectedValue] = useState<any>(10);
    const [pagesizevalue, setpagesizevalue] = useState<any>(10);
    const [currentPage, setCurrentPage] = useState(1); 
    const navigate = useNavigate();
    let req: any;

    
    useEffect(() => {
      //to remove the previous value from localstorage
        sessionStorage.removeItem("bbsmailcontent");
        //to load the list in the onloading
        ListmailBBSMember(10,1);
    }, []);
    //extract data from redux store
    const dispatch = useDispatch();
    //to store values in redux
    const data = useSelector((state: any) => {
        return state?.reducer1.data?.listmail_memberbbs;
    });
   //method to list mail magazine bbs
    const ListmailBBSMember = async (pagesize: any,
        pageNumber: number = 1,) => {
            pageNumber -= 1;  
        try {
           req={
            pageNumber:pageNumber,
            pageSize:pagesize,
            non:0
           };
            
            dispatch(fetchData("listmail_memberbbs", "api/mailmag/list", req));
    
            if (!data || !Array.isArray(data)) {
                return null; 
            } else if (!data) {
            }
        } catch (error) {
            console.error("Error fetching users:", error);
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
        ListmailBBSMember(event.target.value,1);
      
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
        ListmailBBSMember(selectedValue,pageNumber)
      
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
    //defines an array of columns for rendering a grid or table.
    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 150,
            headerClassName: "td_ninteen_1 mail_member_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", headerAlign: "center",
            align: 'center', sortable: false
        },
        {
            field: "title",
            headerName: "タイトル",
            headerClassName: "sixth_bdr_left_bottom mail_member_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", headerAlign: "center", sortable: false,
            renderCell: (params: any) => {
                const handleClick = () => {
                     navigate('/sendmailtobbs', { state: { data: params?.row?.id, title: params?.row?.title,
                        sendtime: params?.row?.sendtime } })
                     
                };
        
                return(
                    <div onClick={handleClick} className="text-underline" style={{cursor:'pointer'}}>
                    {params?.row?.title}
                </div>
                );
            },
            width: 400,
            align: 'center'
        },
        {
            field: "sendtime",
            headerName: "予約日時",
            width: 200,
            align: 'center', sortable: false,
            headerClassName: "sixth_bdr_left_bottom mail_member_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", headerAlign: "center",
                renderCell: (params: any) => {
                    if(params?.row?.sendstatus==1){
                        return "送信済み";
                    }else{
    
                    if (params.row.sendtime) {
                        return formatDateTimeArray(params?.row?.sendtime)
                    }else{
                        return "0000-00-00 00:00:00";
                    }
                }
                    return null;
                },
            },
        
        {
            field: "edit",
            headerName: "",
            flex: 1,
            align: 'center', sortable: false,
            headerClassName: "sixth_bdr_left_bottom mail_member_header_background",
            cellClassName: "gridcolumn-cells", headerAlign: "center",
            renderCell: (params) => {
                // passing the id property of the params.row object as route state to the /emailbbsedit route.
                const handleEditButtonClick = () => {
                    navigate('/emailbbsedit', { state: { data: params?.row } });
                  };
                  //delete the bbsmailmaguser using The id
                  const deleteBBSMember = async () => {
                    let memberId=params.row?.id;
                   const confirmed = window.confirm('削除してもよろしいですか？');
                   if (confirmed) {
                     try {
                       const apiData = await ApiClient.delete('api/mailmag/deletemailmaguser/' +memberId , {});
                       if (apiData) {
                         window.location.reload();
                         //reloading the page
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
                    <Grid spacing={2} className="text_grid">
                       <Button onClick={deleteBBSMember} > <img src={deletebtn}/></Button>
                       <Button type="button" onClick={handleEditButtonClick}><img src={editbtn}/></Button> 
                    </Grid>
                );
            },
        },
    ];

//to get two diff colours for even and odd rows of datagrid
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
                                <span className="verdana_big">G.メルマガ一覧(BBS) </span>
                                <span className="verdana_big">メルマガ管理</span>
                            </Grid>
                        </Grid>
                        <Grid className="p2red_bg_right size"></Grid>
                    </Grid>
                    <Grid className="hr"></Grid>
                    <Grid>
                        <span className="black">
                            メルマガ一覧</span>
                    </Grid>
                    <Grid className="hr"></Grid>
                    <Grid>
                    <DataGrid
                        columns={columns}
                        rows={data?.data ?? []}
                        getRowClassName={getRowClassName}
                        autoHeight
                        style={{ border: '1px solid #729BCB', padding: 8 }}
                        rowCount={data?.data?.length ?? 0}
                        disableColumnMenu={true}
                        hideFooter
                        hideFooterSelectedRowCount
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
            </Grid>
        </>
    );
};

export default ListMailMagazineBBS;
