import React, { useEffect, useRef, useState, useMemo } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import '../../../assets/css/health.css';
import { Box,  Grid ,Button} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, setMemberReg } from '../../../Redux/actions';
import {  useLocation } from 'react-router-dom';
import LeftPanBBS from '../../Common/LeftPanBBS';
import uparrow from '../../../assets/images/6th_arrow_top.gif'
import downarrow from '../../../assets/images/6th_arrow_bottom.gif'
import { useNavigate } from 'react-router-dom';
import arrowForward from "../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
import apiClient from '../../../API/API-client';
import { formatDateArray1 } from '../../Common/Date_conversion';

const MemberSearchList = () => {
    const navigate = useNavigate();
    let req: any;
    let searchrequest: any
    let searchflag: any
    const [rowsPerPage, setRowsPerPage] = useState<any>(10);
    const [sortModel, setSortModel] = useState<any>([]);
    const [isLoaded,setLoaded]=useState(false)

    //handle the pagesize selected by the user
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(event.target.value);
        setpagesizevalue(event.target.value);
        setSelectedValue(event.target.value);
        setCurrentPage(1);
        fetchMember(event.target.value, 1, sortField, sortOrder);
    };

    //column definition for datagrid
    const columns: GridColDef[] = [
        {
            field: 'memberno', headerName: '会員番号', width: 100, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom", cellClassName: "dgridcolumn-cell", sortable: false,
        },
        {
            field: 'joinDate', headerName: '入会日',
            headerClassName: "sixth_bdr_left_bottom", cellClassName: "dgridcolumn-cell", sortable: false,
            headerAlign: "center",
            renderCell: (params) => {
                if (params.row.joinDate) {
                    return formatDateArray1(params?.row?.joinDate)
                  }
                  else{
                    return null
                  }

            },
            width: 100
        },
        {
            field: 'name', headerName: '名前', width: 160, headerAlign: "center",
            cellClassName: "dgridcolumn-cell", sortable: false,
            renderCell: (params) => {
                const fullName = `${params.row.name} ${params.row.name2}`; // Combine name and name2 fields

                return (
                    fullName
                );
            }, headerClassName: "sixth_bdr_left_bottom"
        },
        {
            field: 'memberid', headerName: 'ID', width: 120, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom", cellClassName: "dgridcolumn-cell", sortable: false
        },
        {
            field: 'password', headerName: 'パスワード', width: 120, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom", cellClassName: "dgridcolumn-cell", sortable: false
        },
        {
            field: 'email_pc', headerName: 'eメール', flex: 1, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom", cellClassName: "dgridcolumn-cell", sortable: false,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{params.value}</div>
            ),
        },

        {
            field: 'edit',
            headerName: '編集',
            width: 100, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom hide-sort-icon",
            cellClassName: "dgridcolumn-cell",
            align:"center",
            hideable: false,
            sortable: false,
            renderCell: (params) => {
                const handleEditButtonClick = () => {
                    dispatch(setMemberReg("Memberdata_by_id", ""));
                    navigate('/memberedit', { state: { data: params?.row?.id } });
                };

                return (

                    <Button onClick={handleEditButtonClick} className="sixth_right_btn cursor_pointer">
                        <span className='black_link'> 編集</span>
                    </Button>

                );
            },
        },
        {
            field: 'NG',
            headerName: 'NG',
            width: 100, headerAlign: "center",
            headerClassName: "sixth_bdr_left_bottom hide-sort-icon",
            cellClassName: "dgridcolumn-cell",
            hideable: false,
            sortable: false,
            align:"center",
            renderCell: (params) => {
                const handleToNGButtonClick = () => {
                    ToNgMember(params.id);

                };
                const handleToNGReleaseButtonClick = () => {
                    ToNgReleaseMember(params.id);

                };
                const { ngMember } = params.row;
                const RenderNGButton = ngMember == 0;
                return (
                    RenderNGButton ? (
                        <Button onClick={handleToNGButtonClick} className="sixth_right_btn cursor_pointer">
                            <span className='black' >NG</span>
                        </Button>) : <Button onClick={handleToNGReleaseButtonClick} className="sixth_right_btn cursor_pointer">
                        <span className='black' >NG解除 </span>
                    </Button>
                );
            },
        },
    ];

    //handle sort action for selcted column field 
    const handleSortClick = (field: any, sortOrder: any) => {
        setSortField(field);
        setSortOrder(sortOrder)
        fetchMember(selectedValue ? selectedValue : 10, currentPage ? currentPage : 1, field, sortOrder)
    }

    //to block a member
    const ToNgMember = async (id: any) => {
        try {
            const apiData = await apiClient.get('api/members/blockMember/' + id);
            if (apiData) {
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating ngMember status:', error);
        }
    };

    //to unblock the member
    const ToNgReleaseMember = async (id: any) => {
        try {
            const apiData = await apiClient.get('api/members/unBlockMember/' + id);
            if (apiData) {
                window.location.reload();
            }
        } catch (error) {
            console.error('Error updating ngMember status:', error);
        }
    };
    const location = useLocation();
    if (location && location.state && location.state.flag) {
        searchrequest = location.state.data
        searchflag = location.state.flag;
    }
    const pagesizeOption = [
        { value: '10', label: '10' },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
        { value: '75', label: '75' },
        { value: '100', label: '100' },
       
    ];
    const [pagesizevalue, setpagesizevalue] = useState<any>(10);
    const [sortField, setSortField] = useState()
    const [sortOrder, setSortOrder] = useState()
    const dispatch = useDispatch();

    const data = useSelector((state: any) => {
        return state?.reducer1.data?.member_list
    });
    const gridRef = useRef(null);

    const [selectedValue, setSelectedValue] = useState<any>(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const handleSelectChange = (event: any) => {
        setpagesizevalue(event.target.value)
        setSelectedValue(event.target.value)
        fetchMember(event.target.value, 1, "", "");
    };
    const getRowClassName = (params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0
            ? 'mbr-list-blue-bg' : '';
    };
    useEffect(() => {
        fetchMember(10, 1, "", "");
    }, []);

    //fetch member based on search request
    const fetchMember = async (pagesize: any, pageNumber: number = 1, sortField: any, sortOrder: any) => {
        
        pageNumber -= 1;
        try {
            if (searchflag == 1) {
                req = {
                    pageNumber: pageNumber,
                    pageSize: pagesize,
                    withdrawList: false,
                    status: 1,
                    ...(sortField && { sortField: sortField }),
                    ...(sortOrder && { sortDirection: sortOrder }),

                    ...(searchrequest.email_pc && { email_pc: searchrequest.email_pc }),
                    ...(searchrequest.memberno && { memberno: searchrequest.memberno }),
                    ...(searchrequest.memberid && { memberid: searchrequest.memberid }),
                    ...(searchrequest.name && { name: searchrequest.name }),

                }

            }
            dispatch(fetchData("member_list", "api/members/memberlistsearch", req));
            setLoaded(true)
            if (!data || !Array.isArray(data)) {
                return null;
            } else if (!data) {
            }
        } catch (error) {
            setLoaded(true)
            console.error("Error fetching users:", error);
        }
    };

    //go to desired page based on pagenumber and pagesize
    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        fetchMember(selectedValue, pageNumber, sortField, sortOrder);
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

    //customize the header with sort arrow for particular column field 
    const CustomHeader = (column: any) => {
        return (<Grid>
            <Grid container xs={12} display={"flex"} flexDirection={"row"}>
                <span>{column.column.colDef.headerName}</span>
                {column.column.field != "edit" && column.column.field != "NG" ?
                    <div className='sort-arrow-container'>
                        <img src={uparrow} className='sortarrow' onClick={() => { handleSortClick(column.column.field, "ASC") }} />
                        <img src={downarrow} className='sortarrow' onClick={() => { handleSortClick(column.column.field, "DESC") }} />
                    </div>
                    : null}
            </Grid>
        </Grid>
        );
    }
    return (
        <Box >

            <Grid container xs={12} padding={1} spacing={1}>
                <Grid item xs={3} spacing={2}>
                    <LeftPanBBS />
                </Grid>
                <Grid item xs={9} ref={gridRef}>
                    <Grid className="content-row">
                        <Grid className="p2red_bg_left size"></Grid>
                        <Grid className="p2red_bg_midle">
                            <Grid className="top-header">
                                <span className="verdana_big">A.会員データの一覧</span>
                                <span className="verdana_big">会員DB管理</span>
                            </Grid>
                        </Grid>
                        <Grid className="p2red_bg_right size"></Grid>
                    </Grid>
                    <Grid className='hr' />
                    <Grid container item xs={12} display={'flex'} alignItems={'flex-end'} flexDirection={'column'}>
                        <Grid >
                            <img src={uparrow} width="10" height="10" />
                            <span className='black'>ソート降順</span>
                        </Grid>
                        <Grid>
                            <img src={downarrow} width="10" height="10" />
                            <span className='black'>ソート昇順</span>
                        </Grid>

                    </Grid>
                    <Grid className='hr' />
                    {isLoaded &&data?.data &&
                    
                        <Grid>
                            <Grid xs={12}>
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
                                    getRowHeight={() => "auto"}
                                    localeText={{ noRowsLabel: "結果はありません。" }}
                                    hideFooter
                                    hideFooterSelectedRowCount

                                />
                            </Grid>
                            <Grid className='hr'></Grid>
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
                        </Grid>} 
                </Grid>
            </Grid>
        </Box>
    );
};

export default MemberSearchList;
