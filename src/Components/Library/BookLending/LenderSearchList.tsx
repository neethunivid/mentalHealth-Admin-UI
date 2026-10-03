import React, { useState, useEffect } from 'react';
import '../../../assets/css/health.css';
import { Button, Grid } from '@mui/material';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import "../../../assets/css/health.css";
import LibraryHeader from '../Common/LibraryHeader';
import '../Common/library.scss'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../Redux/actions';
import submitbtn from '../../../assets/images/lib_lending_s.png'
import lenderviewbtn from '../../../assets/images/lib_return_s.png'
import LeftPanLibrary from '../Common/LeftPanLibrary';
import backbtn from '../../../assets/images/7nth_page_btn_1.gif'
import pref from '../Common/pref';
import arrowForward from "../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
const LenderSearchList = () => {
    let searchrequest:any;
    const navigate = useNavigate();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch();
    //the useSelector hook to extract the lender_searchlist data from the Redux state
    const data = useSelector((state: any) => {
        return state?.reducer1.data?.lender_searchlist
    });
    const location = useLocation();
    if (location && location.state) {
        searchrequest = location.state.data
    }
    useEffect(() => {
        fetchList(10, 1);

    }, []);
    const pagesizeOptions = [
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
    const handleBackButton=()=>{
        navigate('/searchbooklender')
    }
    
    //column definition for datagrid
    const columns: GridColDef[] = [
        
        {
            field: 'name', headerName: '貸出者氏名', width:80, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params:any) => {
                if (params.row?.name) {
                   return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params?.row?.name}</div>
                }
          
                return null;
            },

        },
        {
            field: 'phonetic', headerName: 'ふりがな', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params:any) => {
                if (params.row?.phonetic1||params.row?.phonetic2) {
                    const phonetic = `${params.row?.phonetic1} ${params.row?.phonetic2}`;
                    return phonetic
                }
                
                return null;
            },
        },
        {
            field: 'prefecture', headerName: '都道府県', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params:any) => {
                if (params.row?.state) {
                    if (params.row?.state) {
                        const prefecture = pref.find((pref:any) => pref.id === params.row?.state);
                        return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{prefecture?.name}</div>
                        //<div className='wordprewrap'>{params.value}</div>;
                    }
                }
               
                return null;
            },
        },
        {
            field: 'address', headerName: '市町村', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params:any) => {
                if (params.row?.address1) {
                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.address1}</div>
                }
          
                return null;
            },
        },
        {
            field: 'email', headerName: 'E-mail', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,
            renderCell: (params:any) => {
                if (params.row?.email) {
                    return <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.row?.email}</div>
                }
                
                return null;
            },
        },
        {
            field: 'action', headerName: '編集', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom booklist_header_background white_headertext",
            cellClassName: "gridcolumn-cells blacktxt", sortable: false,align:"center",
            renderCell: (params) => {
                const handleLendButtonClick = () => {
                  navigate('/rentalbooksearch', { state: { data: params.row} });
                };
             
                const handleLenderButtonClick = () => {
                    
                    navigate('/editloancontents', { state: { data: {memberLibrary:params.row}} });
                };
              return (
                <Grid spacing={2} className="text_grid ">
                      
                <Button ><img className='padding_top' src={submitbtn} onClick={() => handleLendButtonClick()} /></Button>
                <Button ><img className='padding_top' src={lenderviewbtn} onClick={() => handleLenderButtonClick()} /></Button>
             </Grid>
              );
          },
        },
       
    ];

    //style for alternative row of datagrid
    const getRowClassName = (params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0
            ? "book-list-bg1"
            : "book-list-bg2";
    };

    //get the lender details  based on search input
    const fetchList = async (pagesize: any, pageNumber: number = 1) => {
        try {
         const  req = {
                "pageSize":pagesize,
                "pageNumber":pageNumber,
                ...(searchrequest.name && { name: searchrequest.name }),
                ...(searchrequest.phoneticCom1 && { phoneticCom1: searchrequest.phoneticCom1 }),
                ...(searchrequest.phone && { phone: searchrequest.phone }),
                ...(searchrequest.email && { email: searchrequest.email }),
                ...(searchrequest.regNo && { regNo: searchrequest.regNo }),

            }
       
            dispatch(fetchData("lender_searchlist", "library/books/searchlender", req));

            if (!data || !Array.isArray(data)) {
                return null;
            } else if (!data) {
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleChangeRowsPerPage = (
        // event: React.ChangeEvent<HTMLInputElement>
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setRowsPerPage(event.target.value);
        setpagesizevalue(event.target.value);
        setSelectedValue(event.target.value);
        setCurrentPage(1);
        fetchList(event.target.value, 1);
    };
  
    const goToPage = (pageNumber: number) => {
      setCurrentPage(pageNumber);
      fetchList(selectedValue, pageNumber);
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
        <Grid container xs={12} padding={1} spacing={1}>
            <Grid item xs={3} spacing={2}>
                <LeftPanLibrary />
            </Grid>
            <Grid item xs={9}>
           
                <LibraryHeader
                    label1=" B-4"
                    label2=".貸出・返却の登録"
                    label3="図書室管理"
                />

                <Grid className="hr"></Grid>
                <Grid className="hr"></Grid>
                <span className='black'>★貸出者を選択して編集ボタンをクリックして下さい。</span>
                <Grid className="hr"></Grid>
                <DataGrid
                    columns={columns}
                    rows={data?.data ?? []}
                    getRowClassName={getRowClassName}
                    autoHeight
                    rowCount={data?.data?.length ?? 0}
                    disableColumnMenu={true}
                    hideFooter
                    hideFooterSelectedRowCount
                    columnHeaderHeight={30}
                    getRowHeight={() => "auto"}
                    localeText={{ noRowsLabel: "結果はありません。" }}
                    components={{
                        NoRowsOverlay: () => (
                          <div className="row_table_list_c1 registration_lending_return_no_row">
                            結果はありません。
                          </div>
                        ),
                      }}
                />

                <Grid className="hr"></Grid>
                <Grid className="hr"></Grid>
               
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
                                    defaultValue={pagesizeOptions[0].label}
                                    {pagesizeOptions.map((option) => (
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

              <Grid display={'flex'}justifyContent={'center'}>
                <Button>
                <img className='padding_top' src={backbtn} onClick={() => handleBackButton()} />
                </Button>
              </Grid>
            </Grid>
        </Grid >


    );
}

export default LenderSearchList;
