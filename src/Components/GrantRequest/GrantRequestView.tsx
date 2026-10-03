import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellCheckboxRenderer, gridClasses, GridRowSelectionModel } from '@mui/x-data-grid';
import { alpha } from '@mui/material/styles';
import { Box, Button, Checkbox, Grid, TableRow, } from '@mui/material';
import { join } from 'path';
import apiClient from '../../API/API-client';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../Redux/actions';
import { headers } from '../../API/header';
import LeftPanGrant from '../Common/LeftPanGrant';
import { darken, lighten, styled } from '@mui/material/styles';
import { parseCommandLine } from 'typescript';
import { Link } from 'react-router-dom';
import { CheckBox } from '@mui/icons-material';
import '../GrantRequest/styles.scss';
import { useNavigate } from 'react-router-dom';

const ODD_OPACITY = 0.2;
const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: 'rgb(173, 216, 230)',
    },
    [`& .${gridClasses.row}.odd`]: {

        backgroundColor: "#ffd8a7",
    },
}));



const GrantRequestView = () => {
    const [rowSelectionModel, setRowSelectionModel] =
        React.useState<GridRowSelectionModel>([]);
    const [selectedRows, setSelectedRowId] = useState<any>([]);
    const dispatch = useDispatch();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const data = useSelector((state: any) => {
        return state?.reducer1.data?.grant_request
    });
    // const data:any=useSelector((state:any)=>state.reducer);
    const navigate = useNavigate();
    const columns: GridColDef[] = [
        {
            field: '', headerName: '', width: 20,
            renderCell: (params) => {
                const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                    const id = params.id;
                    const isChecked = event.target.checked;
                    setSelectedIds((prevIds: any) => {
                        if (isChecked) {
                            return [...prevIds, id];
                        } else {
                            return prevIds.filter((selectedId: any) => selectedId !== id);
                        }
                    });
                };
                return <Checkbox onChange={handleCheckboxChange} />;
            }
        },
        {

            field: 'id',
            headerName: 'NO受付日付',
            width: 100,
            renderCell: (params) => {
                const year = params.row.dateCreated[0];
                const month = String(params.row.dateCreated[1]).padStart(2, '0');
                const day = String(params.row.dateCreated[2]).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                return (
                    <Grid container className='Grid-root'>
                        <Grid xs={12} className='Grid-root-border-top'>
                            {params.row.id}
                        </Grid>
                        <Grid xs={12}>
                            {formattedDate}
                        </Grid>
                        <Grid xs={12}>
                            &nbsp;
                        </Grid>
                    </Grid>
                );
            },
        },
        {
            field: 'category',
            headerName: '新規・継続区分',
            width: 100,
            renderCell: (params) => {
                return (

                    <Grid container>
                        <Grid xs={12} >
                            {params.row.newCont}
                        </Grid>
                        <Grid xs={12} >

                        </Grid>
                        <Grid xs={12}>

                        </Grid>
                    </Grid>
                );
            },

        },
        {
            field: 'researchactivity',
            headerName: '研究活動 区分',
            width: 100,
            renderCell: (params) => {
                return (

                    <Grid container>
                        <Grid xs={12}>
                            {params.row.classification}
                        </Grid>
                        <Grid xs={12}>

                        </Grid>
                        <Grid xs={12}>
                            {params.row.remark}
                        </Grid>
                    </Grid>
                );
            },

        },
        {

            field: 'name',
            headerName: '申請者',
            width: 100,
            renderCell: (params) => {
                return (

                    <Grid container>
                        <Grid xs={12}>
                            {params.row.institution}
                        </Grid>
                        <Grid xs={12}>
                            {params.row.dept}
                        </Grid>
                        <Grid xs={12}>
                            {params.row.representative}
                        </Grid>
                    </Grid>
                );
            },

        },
        {
            field: 'age',
            headerName: '年齢',

            width: 100,
            renderCell: (params) => {
                return (

                    <Grid container>
                        <Grid xs={12}>
                            {params.row.age}
                        </Grid>
                        <Grid xs={12}>

                        </Grid>
                        <Grid xs={12}>

                        </Grid>
                    </Grid>
                );
            },


        },
        {
            field: 'email',
            headerName: 'E-mail',
            width: 100,
            renderCell: (params) => {
                return (

                    <Grid container>
                        <Grid xs={12}>
                            {params.row.email2 ? params.row.email2 : params.row.repEmail}
                        </Grid>
                        <Grid xs={12}>

                        </Grid>
                        <Grid xs={12}>

                        </Grid>
                    </Grid>
                );
            },


        },
        {
            field: 'recommender',
            headerName: '推薦者',

            width: 100,
            renderCell: (params) => {
                return (

                    <Grid container>
                        <Grid xs={12}>
                            {params.row.recomdPernInst}
                        </Grid>
                        <Grid xs={12}>
                            {params.row.recomdPernJob}
                        </Grid>
                        <Grid xs={12}>
                            {params.row.recomdPernFullname}
                        </Grid>
                    </Grid>
                );
            },


        }, {
            field: 'application_title',
            headerName: '申請課題名',

            width: 100,
            renderCell: (params) => {
                return (

                    <Grid container>
                        <Grid xs={12}>
                            {params.row.researchName}
                        </Grid>
                        <Grid xs={12}>

                        </Grid>
                        <Grid xs={12}>

                        </Grid>
                    </Grid>
                );
            },


        },
        {
            field: 'totamt',
            headerName: '研究総額（万円',

            width: 100,
            renderCell: (params) => {
                return (

                    <Grid container>
                        <Grid xs={12}>
                            {params.row.expTotal}
                        </Grid>
                        <Grid xs={12}>

                        </Grid>
                        <Grid xs={12}>

                        </Grid>
                    </Grid>
                );
            },


        }, {
            field: 'applicationamt',
            headerName: '申請金額（万円',

            width: 100,
            renderCell: (params) => {
                return (

                    <Grid container>
                        <Grid xs={12}>
                            {params.row.subTotal}
                        </Grid>
                        <Grid xs={12}>

                        </Grid>
                        <Grid xs={12}>

                        </Grid>
                    </Grid>
                );
            },


        }

    ];
    useEffect(() => {
        fetchList();
    }, []);


    const handleClick = () => {
        if (selectedIds.length > 0) {
            navigate('/grantpreview', { state: selectedIds });
        }
        else {
            alert("本を選択し、チェックボックスにチェックをいれてください。")
        }
    }
    const fetchList = async () => {
        try {
            const req = {
            };
            dispatch(fetchData("grant_request", "api/grant-requests/list", req));
            if (!data || !Array.isArray(data)) {
                return null; // Return null or a fallback component if the data is not available or is not an array
            }

        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    return (
        <Box >

            <Grid container xs={12}>
                <Grid item xs={2}>
                    <LeftPanGrant />
                </Grid>
                <Grid item xs={10}>

                    <Grid container flexDirection={"row"}>
                        <Box className="p2red_bg_left"></Box>
                        <Box className="p2red_bg_midle">
                            <span className="black">A.申請内容の受付・閲覧・印刷</span>
                        </Box>
                        <Box className="p2red_bg_right"></Box>
                    </Grid>
                    <Grid container>
                        <Grid item xs={10} ></Grid>
                        <Grid item xs={2} >
                            <button className="rmbtn" onClick={handleClick} name='view'>
                                閲覧・印刷
                            </button>
                        </Grid>
                    </Grid>

                    {/* <Button className='rmbtn' onClick={() => handleClick()}>閲覧・印刷</Button> */}
                    {data ?
                        <StripedDataGrid
                            rows={data.data}
                            columns={columns}
                            // checkboxSelection
                            getRowHeight={() => 'auto'}
                            hideFooterPagination={true}
                            getRowClassName={(params) =>
                                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                            }
                            disableColumnFilter
                            disableColumnMenu
                        // onRowSelectionModelChange={(newRowSelectionModel) => {
                        //     setRowSelectionModel(newRowSelectionModel);
                        // }}

                        />
                        : <div>No record</div>}
                </Grid>
            </Grid>


        </Box>
    );
};

export default GrantRequestView;
