import React, { useEffect, useRef, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import '../../../assets/css/health.css';
import { Box, Grid, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, setMemberReg } from '../../../Redux/actions';
import { useNavigate } from 'react-router-dom';
import arrowForward from "../../../assets/images/6th_btn_next.gif";
import arrowBack from "../../../assets/images/6th_btn_previous.gif";
import apiClient from '../../../API/API-client';
import { formatDateArray } from '../../Common/Date_conversion';
import '../../Check Sheet Mail/check.scss'
import LeftPanChecksheet from '../LeftPanChecksheet';
import viewEditbutton from '../../../assets/images/viewedit.png'

const DiagramList = () => {
    const navigate = useNavigate();
    let apiData: any

    const [rowsPerPage, setRowsPerPage] = useState<any>(10);
    const [datas, setData] = useState<any>();

    // Handle page size change
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(event.target.value);
        setpagesizevalue(event.target.value);
        setSelectedValue(event.target.value);
        setCurrentPage(1);
        fetchData(event.target.value, 1);
    };

    const pagesizeOption = [
        { value: '10', label: '10' },
        { value: '25', label: '25' },
        { value: '50', label: '50' },
        { value: '75', label: '75' },
        { value: '100', label: '100' },

    ];
    //pagination
    const goToPage = (page: number) => {
        setCurrentPage(page);
        fetchData(selectedValue, page)

    };

    const getPageInfo = (datas: any) => {
        let page: any = currentPage ? currentPage : 1;
        let offset: any = (page - 1) * selectedValue + 1;
        let count: any = page * selectedValue;

        let totalRows: any = datas && datas["count"] ? datas["count"] : 0;
        let totalPages: number = Math.ceil(totalRows / selectedValue);
        if (count > totalRows) {
            count = totalRows;
        }

        return (
            <>
                <span className="padding">
                    <span className="black">{datas?.count + "件中"}</span>
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

    //column definition for datagrid
    const columns: GridColDef[] = [
        {
            field: "id",
            width: 60,
            headerName: "No",
            sortable: false,
            headerClassName: "td_ninteen_1 remarksconfirmHeader",
            cellClassName: "gridcolumn-cell blac_ktxt",
            headerAlign: "center",
            align: "center",
            renderCell: (params: any) => {
                if (params.row?.id) {
                    return params.row?.id;
                }
                return null;
            },
        },
        {
            field: "date",
            width: 90,
            headerName: "受付日",
            sortable: false,
            headerClassName: "td_ninteen_1 remarksconfirmHeader",
            cellClassName: "gridcolumn-cells blacktxt",
            headerAlign: "center",
            align: "center",
            renderCell: (params: any) => {
                if (params.row?.date != null) {
                    const date = formatDateArray(params.row?.date);
                    return date;

                }
                return null;
            },
        },
        {
            field: "counsellor",
            headerName: "相談員",
            width: 92,
            sortable: false,
            headerClassName: "td_ninteen_1 remarksconfirmHeader",
            cellClassName: "gridcolumn-cells blacktxt",
            headerAlign: "center",
            align: "center",
            renderCell: (params: any) => {
                if (params.row?.counsellor != null) {
                    return params.row?.counsellor;
                }
                return null;
            },
        },
        {
            field: "userType",
            headerName: "名前 匿名",
            width: 90,
            sortable: false,
            headerClassName: "td_ninteen_1 remarksconfirmHeader",
            cellClassName: "gridcolumn-cells blacktxt",
            headerAlign: "center",
            align: "center",
            renderCell: (params: any) => {
                if (params.row?.name != null) {
                    return params.row?.name;
                }
                return null;
            },
        },

        {
            field: "gender",
            headerName: "性別",
            width: 70,
            sortable: false,
            headerClassName: "td_ninteen_1 remarksconfirmHeader",
            headerAlign: "center",
            align: "center",
            cellClassName: "gridcolumn-cells blacktxt",
            renderCell: (params: any) => {
                if (params.row?.gender) {
                    return params.row?.gender;
                }
                return null;
            },
        },
        {
            field: "age",
            headerName: "年代",
            width: 60,
            sortable: false,
            headerClassName: "td_ninteen_1 remarksconfirmHeader",
            headerAlign: "center",
            align: "center",
            cellClassName: "gridcolumn-cells blacktxt",
            renderCell: (params: any) => {
                if (params.row?.age) {
                    return params.row?.age;
                }
                return null;
            },
        },
        {
            field: "job",
            headerName: "職業",
            width: 90,
            sortable: false,
            headerClassName: "td_ninteen_1 remarksconfirmHeader",
            headerAlign: "center",
            align: "center",
            cellClassName: "gridcolumn-cells blacktxt",
            renderCell: (params: any) => {
                if (params.row?.job) {
                    return params.row?.job;
                }
                return null;
            },
        },
        {
            field: "mainIssues",
            headerName: "主訴",
            width: 200,
            sortable: false,
            headerClassName: "td_ninteen_1 remarksconfirmHeader",
            headerAlign: "center",
            align: "center",
            cellClassName: "gridcolumn-cells blacktxt",
            renderCell: (params: any) => {
                if (params.row?.mainIssues) {
                    return params.row?.mainIssues;
                }
                return null;
            },
        },
        {
            field: "sessions",
            headerName: "回数",
            width: 80,
            sortable: false,
            headerClassName: "td_ninteen_1 remarksconfirmHeader",
            headerAlign: "center",
            align: "center",
            cellClassName: "gridcolumn-cells blacktxt",
            renderCell: (params: any) => {
                if (params.row?.sessions) {
                    return params.row?.sessions;
                }
                return null;
            },
        },

        {
            field: "route",
            headerName: "認知経路",
            width: 100,
            sortable: false,
            headerClassName: "td_ninteen_1 remarksconfirmHeader",
            headerAlign: "center",
            align: "center",
            cellClassName: "gridcolumn-cells blacktxt",
            renderCell: (params: any) => {
                if (params.row?.route) {
                    return params.row?.route;
                }
                return null;
            },
        },

        {
            field: 'edit',
            headerName: '閲覧編集',
            width: 100,
            headerClassName: "td_ninteen_1 remarksconfirmHeader",
            headerAlign: "center",
            cellClassName: "gridcolumn-cells blacktxt",
            hideable: false,
            sortable: false,
            align: "center",
            renderCell: (params) => {
                //function to navigate to telcounselling edit screen
                const handleEditButtonClick = () => {
                    dispatch(setMemberReg("Memberdata_by_id", ""));
                    navigate('/telephoneconsultationview', { state: { data: params?.row?.id } });
                };
                return (
                    <Button type='button' onClick={handleEditButtonClick} className="button-size">
                        <img src={viewEditbutton}
                        className='viewedit-button'/>
                    </Button>

                );
            },
        },

    ];

    const pageCount = Math.ceil((datas?.count ?? 0) / rowsPerPage);
    const [pagesizevalue, setpagesizevalue] = useState<any>(10);
    const dispatch = useDispatch();
    const data = useSelector((state: any) => {
        return state?.reducer1.data?.member_list
    });
    const gridRef = useRef(null);
    const [selectedValue, setSelectedValue] = useState<any>(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData(10, 1);
    }, []);

    //fetch datas
    const fetchData = async (size: any, page: number = 1) => {
        setIsLoading(true);

        try {
            const req = { pageNumber: page, pageSize: size };

            apiData = await apiClient.post("/api/telcounselling/all", req);

            if (apiData) {
                setData(apiData?.data);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Function to handle row click
    const handleRowClick = (params: any) => {
        const rowId = params.row?.id;
        if (rowId) {
            navigate('/telephoneconsultationview', { state: { data: rowId } });  // Navigate to view page with row ID
        }
    };

    //giving styles for alternative rows
    const getRowClassName = (params: any) => {
        return params.indexRelativeToCurrentPage % 2 === 0
            ? "Reservation-Tablebody-background"
            : "Reservation-Tablebody-background";
    };

    return (
        <Box >

            <Grid container xs={12} padding={1} spacing={1}>
                <Grid item xs={3} spacing={2}>
                    <LeftPanChecksheet />
                </Grid>
                <Grid item xs={9} ref={gridRef}>
                    <Grid className="content-row">
                        <Grid className="p2red_bg_left size"></Grid>
                        <Grid className="p2red_bg_midle">
                            <Grid className="top-header">
                                <span className="verdana_big">B.電話相談表一覧</span>
                            </Grid>
                        </Grid>
                        <Grid className="p2red_bg_right size"></Grid>
                    </Grid>
                    <Grid className='hr' />

                    <Grid className='hr' />

                    <Grid>
                        <Grid xs={12}>
                            <DataGrid
                                columns={columns}
                                rows={datas?.data || []}
                                disableColumnMenu={true}
                                autoHeight
                                getRowClassName={getRowClassName}
                                getRowHeight={() => "auto"}
                                hideFooter
                                hideFooterSelectedRowCount
                                className="custom-data-grid"
                                rowHeight={30}
                                columnHeaderHeight={30}


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
                                    {datas?.data && getPageInfo(datas)}
                                </Grid>
                            </Grid>
                            <Grid className="p6red_bg_right size"></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DiagramList;