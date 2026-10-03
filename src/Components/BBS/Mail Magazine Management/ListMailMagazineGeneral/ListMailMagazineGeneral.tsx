import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../../../Redux/actions";
import "../../../BBS/MemberData/member.scss";
import "../../../BBS/Mail Magazine Management/Mail Magazine Components/mail_magazine.scss";
import { Grid, Button } from "@mui/material";
import LeftPanBBS from "../../../Common/LeftPanBBS";
import deletebtn from '../../../../assets/images/btn_delete_new.gif'
import editbtn from '../../../../assets/images/btn_edit2_new.gif'
import apiClient from "../../../../API/API-client";
import { formatDateTimeArray } from "../../../Common/Date_conversion";
import arrowForward from "../../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../../assets/images/6th_btn_previous.gif";

const ListMailMagazineGeneral = () => {
    const navigate = useNavigate();
    let req: any;
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

        //remove the mailcontentgeneral from sessionstorage
        sessionStorage.removeItem("mailcontentgeneral");
        ListmailGeneralMember(10,1);
    }, []);
    const dispatch = useDispatch();

    //the useSelector hook to extract the listmail_membergeneral data from the Redux state
    const data = useSelector((state: any) => {
        return state?.reducer1.data?.listmail_membergeneral;
    });

    //method to list mail magazine general 
    const ListmailGeneralMember = async (pagesize:any,pageNumber: number = 1) => {
        pageNumber -= 1;
        try {
            req = {
                non: 1,
                pageSize:pagesize,
                pageNumber:pageNumber
            };
            dispatch(fetchData("listmail_membergeneral", "api/mailmag/list", req));
            if (!data || !Array.isArray(data)) {
                return null;
            } else if (!data) {
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    //column definition for datagrid
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
                    navigate('/sendmailtogeneral', {
                        state: {
                            data: params?.row?.id, title: params?.row?.title,
                            sendtime: params?.row?.sendtime
                        }
                    })

                };

                return (
                    <div onClick={handleClick} className="text-underline" style={{ cursor: 'pointer' }}>
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
                const handleUpdateButtonClick = () => {
                    navigate('/mailcorrectiongeneral', { state: { data: params?.row } });
                };
             
                const handleDeleteButtonClick = () => {
                    deleteGeneralMember(params?.row?.id)
                };

                return (
                    <Grid spacing={2} className="text_grid">
                        <Button onClick={handleDeleteButtonClick}> <img src={deletebtn} /></Button>
                        <Button onClick={handleUpdateButtonClick}><img src={editbtn} /></Button>
                    </Grid>
                );
            },
        },
    ];
    //function to delete email of  mail magazine user
    const deleteGeneralMember = async (id: any) => {
        const confirmed = window.confirm('削除してもよろしいですか？');
        if (confirmed) {
            try {
                const apiData = await apiClient.delete('api/mailmag/deletemailmaguser/' + id, {});
                if (apiData) {
                    window.location.reload();
                }

            }
            catch (error: any) {
                console.error("Error", error);
            }
        }

    }
    //function to provide alternative colour to datagrid rows
    const getRowClassName = (params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0
            ? "mbr-list-bg1"
            : "mbr-list-bg2";
    };

    //hnadle pagesize selected by the user
    const handleChangeRowsPerPage = ( event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(event.target.value);
        setpagesizevalue(event.target.value);
        setSelectedValue(event.target.value);
        setCurrentPage(1);
        ListmailGeneralMember(event.target.value, 1);
    };
  
    //pagination
    const goToPage = (pageNumber: number) => {
      setCurrentPage(pageNumber);
      ListmailGeneralMember(selectedValue, pageNumber);
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
                                <span className="verdana_big">H.メルマガ一覧(一般)</span>
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
                        getRowHeight={() => "auto"}
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
                </Grid>
            </Grid>
        </>
    );
};

export default ListMailMagazineGeneral;
