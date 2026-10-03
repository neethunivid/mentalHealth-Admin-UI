import React, { MouseEventHandler, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellCheckboxRenderer, gridClasses, GridRowModel, GridRenderCellParams } from '@mui/x-data-grid';
import '../../assets/css/health.css';
import { Box, Button, Checkbox, Grid, TableRow, TextField, Typography, } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { darken, lighten, styled } from '@mui/material/styles';
import { fetchData } from '../../Redux/actions';
import LeftPanGrant from '../Common/LeftPanGrant';
import { useForm, Controller } from 'react-hook-form';
import apiClient from '../../API/API-client';
import { useNavigate } from 'react-router-dom';
import "../GrantRequest/styles.scss";
import EditGrantHeaderComponent from '../Common/Gr-Edit-Header';

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: 'rgb(173, 216, 230)',
        color: '#000',
        marginBottom: '5px',

    },
    [`& .${gridClasses.row}.odd`]: {
        backgroundColor: "#ffd8a7",
        color: '#000',
        marginBottom: '5px',
    },
}));


const GrantRequestEdit = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        setError,
        formState: { errors },
        getValues,
    } = useForm();
    const data = useSelector((state: any) =>
        state?.data['grant_edit_list']?.data?.map((item: any, index: any) => ({
            ...item,
            index: index + 1,
        }))
    );
    const [isTextBoxEnabled, setIsTextBoxEnabled] = useState<boolean[]>(Array(20).fill(false));
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchGrantList();
    }, []);

    const handleSaveButtonClick = async (rowIndex: any, formData: any) => {
        const confirmed = window.confirm('このまま保存しますか？');
        if (confirmed) {
            await editButtonAction(rowIndex, formData);
        }
    };
    const onSubmit = (rowId: any) => {
        const formData = getValues(); // Get the form data using getValues()
        // console.log('Submitting row', rowId, 'with form data', formData);
        handleSaveButtonClick(rowId, formData);
    };
    //calling redux saga for fetching list data
    const fetchGrantList = async () => {
        try {

            dispatch(fetchData("grant_edit_list", "api/grant-requests/list", {}));


        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    const editButtonAction = async (index: any, formData: any) => {
        try {

            // Update values in the database using the new formData
            const newFormData: any = {
                "classification": formData[`classification_${index}`],
                "dateCreated": formData[`dateCreated_${index}`],
                "remark": formData[`remark_${index}`],
                "institution": formData[`institution_${index}`],
                "dept": formData[`dept_${index}`],
                "newCont": formData[`newCont_${index}`],
                "representative": formData[`representative_${index}`],
                "age": formData[`age_${index}`],
                "recomdPernInst": formData[`recomdPernInst_${index}`],
                "recomdPernJob": formData[`recomdPernJob_${index}`],
                "recomdPernFullname": formData[`recomdPernFullname_${index}`],
                "researchName": formData[`researchName_${index}`],
            };

            const apiData = await apiClient.put(`api/grant-requests/update/${index}`, newFormData, {});
            if (apiData) {
                if (apiData.data.data) {
                    setSelectedIds([]);
                    navigate('/grantedit');
                    window.location.reload();
                }
            }

        } catch (error) {
            console.error('Error updating data:', error);
        }
    };
    const columns: GridColDef[] = [
        {
            field: '削除', headerName: '削除', width: 20,
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

                return (
                    <Grid container >
                        <Grid item xs={12} >
                            <Checkbox onChange={handleCheckboxChange} />
                        </Grid>   
                    </Grid>
                );
            }
        },
        {
            field: '編集',
            headerName: 'Action',
            width: 90,
            headerAlign: 'center',
            headerClassName: "edit-grid-root-column-header",
            renderCell: (params: GridRenderCellParams) => {
                const rowIndex = params.row.index as any;
                // const rowIndex=params.rowIndex;
                const handleEditClick = (rowindex: number) => {
                    setIsTextBoxEnabled((prevState) => {
                        const newState = [...prevState]; // Create a copy of the state array
                        newState[rowindex] = true; // Set the specific element to true
                        return newState;
                    });
                };
                return (
                    <Grid container >
                        <Grid item xs={12} className='edit-grid-root' >
                            {isTextBoxEnabled[rowIndex] == false ?
                                <button onClick={() => handleEditClick(rowIndex)} className="edit-grid-root-input">
                                    編集
                                </button>
                                :
                                <button onClick={() => onSubmit(params.row.id)} className="edit-grid-root-input">
                                    保存
                                </button>
                            }
                        </Grid>
                        <Grid item xs={12} className='edit-grid-root'> &nbsp; </Grid>
                        <Grid item xs={12} className='edit-grid-root'>&nbsp;</Grid>
                    </Grid>
                );
            },
        },  
        {
            field: 'id',
            headerName: 'NO受付日付',
            width: 110,
            headerClassName: "edit-grid-root-column-header",
            renderCell: (params) => {
                const year = params.row.dateCreated[0];
                const month = String(params.row.dateCreated[1]).padStart(2, '0');
                const day = String(params.row.dateCreated[2]).padStart(2, '0');
                const formattedDate = `${year}-${month}-${day}`;
                return (
                    <Grid container >
                        <Grid item xs={12} className='edit-grid-root'>
                            {/* <input
                                type="text"
                                style={{ width: '100%' }}
                                defaultValue={params.row.id}
                                disabled
                                {...register('id')}
                            /> */}
                            <Controller
                                control={control}
                                name={`id_${params.id}`}
                                defaultValue={params.row.id}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                       //  className='edit-grid-root-input'
                                       className='edit-grid-root-input'
                                        {...field}
                                        disabled
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} className='edit-grid-root'>
                            <Controller
                                control={control}
                                name={`dateCreated_${params.id}`}
                                defaultValue={formattedDate}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                         className='edit-grid-root-input'
                                        {...field}
                                        disabled={!isTextBoxEnabled[params.row.index as any]}
                                    />
                                )}
                            />
                            {/* <input type="text" style={{ width: '100%' }} value={formattedDate} disabled={!isTextBoxEnabled}  {...register(`dateCreated_${params.id}`)} /> */}
                        </Grid>
                        <Grid item xs={12} className='edit-grid-root'>
                            &nbsp;
                        </Grid>
                    </Grid>
                );
            },
        },
        {
            field: 'newCont',
            headerName: '新規・継続区分',
            width: 120,
            headerClassName: "edit-grid-root-column-header",
            renderCell: (params) => {
                return (
                    <Grid container xs={12}>
                        <Grid item xs={12} className='edit-grid-root'>
                            <Controller
                                control={control}
                                name={`newCont_${params.id}`}
                                defaultValue={params.row.newCont}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                         className='edit-grid-root-input'
                                        {...field}
                                        disabled={!isTextBoxEnabled[params.row.index as any]}
                                    />
                                )}
                            />
                            {/* <input type="text" style={{ width: '100%' }} value={params.row.newCont} disabled={!isTextBoxEnabled} /> */}
                        </Grid>
                        <Grid xs={12} className='edit-grid-root' >
                            &nbsp;
                        </Grid>
                        <Grid xs={12} className='edit-grid-root'>
                            &nbsp;
                        </Grid>
                    </Grid>
                );
            },
        },
        {
            field: 'researchactivity',
            headerName: '研究活動 区分',
            width: 90,
            headerClassName: "edit-grid-root-column-header",
            renderCell: (params) => {
                return (
                    <Grid container>
                        <Grid xs={12} className='edit-grid-root'>
                            <Controller
                                control={control}
                                name={`classification_${params.id}`}
                                defaultValue={params.row.classification}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                         className='edit-grid-root-input'
                                        {...field}
                                        disabled={!isTextBoxEnabled[params.row.index as any]}
                                    />
                                )}
                            />

                            {/* <input type="text" style={{ width: '100%' }} value={params.row.classification} {...register(`classification_${params.id}`)} disabled={!isTextBoxEnabled} /> */}
                        </Grid>
                        <Grid xs={12} className='edit-grid-root'>
                            &nbsp;
                        </Grid>
                        <Grid xs={12} className='edit-grid-root'>
                            <Controller
                                control={control}
                                name={`remark_${params.id}`}
                                defaultValue={params.row.remark}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                         className='edit-grid-root-input'
                                        {...field}
                                        disabled={!isTextBoxEnabled[params.row.index as any]}
                                    />
                                )}
                            />
                            {/* <input type="text" style={{ width: '100%' }} value={params.row.remark}  {...register(`remark_${params.id}`)} disabled={!isTextBoxEnabled} /> */}
                        </Grid>
                    </Grid>
                );
            },
        },
        {
            field: 'name',
            headerName: '申請者',
            width: 120,
            headerClassName: "edit-grid-root-column-header",
            renderCell: (params) => {
                return (
                    <Grid container xs={12}>
                        <Grid xs={12} item className='edit-grid-root'>
                            <Controller
                                control={control}
                                name={`institution_${params.id}`}
                                defaultValue={params.row.institution}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                         className='edit-grid-root-input'
                                        {...field}
                                        disabled={!isTextBoxEnabled[params.row.index as any]}
                                    />
                                )}
                            />
                            {/* <input type="text" style={{ width: '100%' }} value={params.row.institution}  {...register('institution')} disabled={!isTextBoxEnabled} /> */}
                        </Grid>
                        <Grid xs={12} className='edit-grid-root'>
                            <Controller
                                control={control}
                                name={`dept_${params.id}`}
                                defaultValue={params.row.dept}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                         className='edit-grid-root-input'
                                        {...field}
                                        disabled={!isTextBoxEnabled[params.row.index as any]}
                                    />
                                )}
                            />
                            {/* <input type="text" style={{ width: '100%' }} value={params.row.dept} {...register('dept')} disabled={!isTextBoxEnabled} /> */}

                        </Grid>
                        <Grid xs={12} className='edit-grid-root'>
                            <Controller
                                control={control}
                                name={`representative_${params.id}`}
                                defaultValue={params.row.representative}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                         className='edit-grid-root-input'
                                        {...field}
                                        disabled={!isTextBoxEnabled[params.row.index as any]}
                                    />
                                )}
                            />
                            {/* <input type="text" style={{ width: '100%' }} value={params.row.representative} {...register('representative')} disabled={!isTextBoxEnabled} /> */}

                        </Grid>
                    </Grid>
                );
            },
        },
        {
            field: 'age',
            headerName: '年齢',
            width: 70,
            headerClassName: "edit-grid-root-column-header",
            renderCell: (params) => {
                return (

                    <Grid container >
                        <Grid item xs={12} className='edit-grid-root'>
                            <Controller
                                control={control}
                                name={`age_${params.id}`}
                                defaultValue={params.row.age}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                         className='edit-grid-root-input'
                                        {...field}
                                        disabled={!isTextBoxEnabled[params.row.index as any]}
                                    />
                                )}
                            />
                            {/* <input type="text" style={{ width: '100%' }} value={params.row.age} {...register('age')} disabled={!isTextBoxEnabled} /> */}
                        </Grid>
                        <Grid xs={12} className='edit-grid-root'>
                            &nbsp;
                        </Grid>
                        <Grid xs={12 } className='edit-grid-root'>
                            &nbsp;
                        </Grid>
                    </Grid>
                );
            },
        },
        {
            field: 'email',
            headerName: 'E-mail',
            width: 140,
            headerClassName: "edit-grid-root-column-header",
            renderCell: (params) => {
                return (
                    <Grid container xs={12}>
                        <Grid xs={12} item className='edit-grid-root'>

                            <Typography variant="caption" component="label" htmlFor="email">
                            {params.row.email2 ? params.row.email2 : params.row.repEmail}
                                </Typography>
                        </Grid>
                        <Grid xs={12} className='edit-grid-root'>
                            &nbsp;
                        </Grid>
                        <Grid xs={12} className='edit-grid-root'>
                            &nbsp;
                        </Grid>
                    </Grid>
                );
            },
        }, {
            field: 'recommender',
            headerName: '推薦者',
            width: 130,
             headerClassName: "edit-grid-root-column-header",
            renderCell: (params) => {
                return (
                    <Grid container >
                        <Grid item xs={12} className='edit-grid-root'>
                            <Controller
                                control={control}
                                name={`recomdPernInst_${params.id}`}
                                defaultValue={params.row.recomdPernInst}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                         className='edit-grid-root-input'
                                        {...field}
                                        disabled={!isTextBoxEnabled[params.row.index as any]}
                                    />
                                )}
                            />
                            {/* <input type="text" style={{ width: '100%' }} {...register('recomdPernInst')} disabled={!isTextBoxEnabled} value={params.row.recomdPernInst} /> */}
                        </Grid>
                        <Grid item xs={12} className='edit-grid-root'>
                            <Controller
                                control={control}
                                name={`recomdPernJob_${params.id}`}
                                defaultValue={params.row.recomdPernJob}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                         className='edit-grid-root-input'
                                        {...field}
                                        disabled={!isTextBoxEnabled[params.row.index as any]}
                                    />
                                )}
                            />
                            {/* <input type="text" style={{ width: '100%' }} {...register('recomdPernJob')} value={params.row.recomdPernJob} disabled={!isTextBoxEnabled} /> */}

                        </Grid>
                        <Grid xs={12} className='edit-grid-root'>
                            <Controller
                                control={control}
                                name={`recomdPernFullname_${params.id}`}
                                defaultValue={params.row.recomdPernFullname}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                         className='edit-grid-root-input'
                                        {...field}
                                        disabled={!isTextBoxEnabled[params.row.index as any]}
                                    />
                                )}
                            />
                            {/* <input type="text" style={{ width: '100%' }} {...register('recomdPernFullname')} value={params.row.recomdPernFullname} disabled={!isTextBoxEnabled} /> */}
                        </Grid>
                    </Grid>
                );
            },
        }, {
            field: 'application_title',
            headerName: '申請課題名',
            width: 130, 
            headerClassName: "edit-grid-root-column-header",
            renderCell: (params) => {
                return (

                    <Grid container>
                        <Grid xs={12} className='edit-grid-root'>
                            <Controller
                                control={control}
                                name={`researchName_${params.id}`}
                                defaultValue={params.row.researchName}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                         className='edit-grid-root-input'
                                        {...field}
                                        disabled={!isTextBoxEnabled[params.row.index as any]}
                                    />
                                )}
                            />
                            {/* <input type="text" style={{ width: '100%' }} {...register('researchName')} value={params.row.researchName} disabled={!isTextBoxEnabled} /> */}
                        </Grid>
                        <Grid xs={12} className='edit-grid-root'>
                            &nbsp;
                        </Grid>
                        <Grid xs={12} className='edit-grid-root'>
                            &nbsp;
                        </Grid>
                    </Grid>
                );
            },
        },
        {
            field: 'totamt',
            headerName: '研究総額（万円',
            width: 30,
            headerClassName: "edit-grid-root-column-header",
            renderCell: (params) => {
                return (

                    <Grid container>
                        <Grid xs={12} className='edit-grid-root'>
                            {params.row.expTotal}
                        </Grid>
                        <Grid xs={12} className='edit-grid-root'>
                            &nbsp;
                        </Grid>
                        <Grid xs={12} className='edit-grid-root'>
                            &nbsp;
                        </Grid>
                    </Grid>
                );
            },
        }, {
            field: 'applicationamt',
            headerName: '申請金額（万円',
            width: 20,
            headerClassName: "edit-grid-root-column-header",
            renderCell: (params) => {
                return (

                    <Grid container xs={12}  >
                        <Grid xs={12} className='edit-grid-root'>
                            {params.row.subTotal}
                        </Grid>
                        <Grid xs={12} className='edit-grid-root'>
                            &nbsp;
                        </Grid>
                        <Grid xs={12} className='edit-grid-root'>
                            &nbsp;
                        </Grid>
                    </Grid>
                );
            },
        }
    ];
   
    const getCellStyleParams = (params: any) => 'grid-cell-column'
    return (
        <Box >
            <Grid container xs={12} spacing={2} >
                <Grid item xs={2} spacing={2}>
                    <LeftPanGrant />
                </Grid>
                <Grid item xs={10} >
                    <EditGrantHeaderComponent selectedId={selectedIds} />
                    <Grid item >
                        {data ?// && data.data && data.data.length !== 0 ?
                            <StripedDataGrid
                                rows={data}
                                columns={columns}
                                // className="striped-grid"
                                //checkboxSelection
                                // autoHeight={true}
                                disableRowSelectionOnClick
                                getRowHeight={() => 'auto'}
                                hideFooterPagination={true}
                                getRowClassName={(params) =>
                                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                                }
                                getCellClassName={getCellStyleParams}
                                className='edit-grid-root-grid-design'
                                columnHeaderHeight={80}
                                disableColumnMenu
                                disableColumnFilter
                                hideFooter
                            />
                            : <Box>No record</Box>}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default GrantRequestEdit;
