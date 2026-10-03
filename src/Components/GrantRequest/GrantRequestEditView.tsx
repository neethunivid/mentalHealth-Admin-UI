import React, { MouseEventHandler, useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellCheckboxRenderer, gridClasses, GridRowModel, GridRenderCellParams } from '@mui/x-data-grid';
import '../../assets/css/health.css';
import { Box, Button, Checkbox, Grid, TableRow, TextField, Typography, Table, TableContainer, TableHead, TableCell, TableBody } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { darken, lighten, styled } from '@mui/material/styles';
import { fetchData } from '../../Redux/actions';
import LeftPanGrant from '../Common/LeftPanGrant';
import { useForm, Controller } from 'react-hook-form';
import apiClient from '../../API/API-client';
import { useNavigate } from 'react-router-dom';
import "../GrantRequest/styles.scss";
import EditGrantHeaderComponent from '../Common/Gr-Edit-Header';
import TableRowComponent from './TableRowComponent';
import TableEditRowComponent from './TableEditRowComponent';

const GrantRequestEditView = () => {
    const navigate = useNavigate();
    const data = useSelector((state: any) =>
        state?.reducer1?.data?.grant_edit_list?.data?.map((item: any, index: any) => ({
            ...item,
            index: index + 1,
        }))
    );
    
    const [isTextBoxEnabled, setIsTextBoxEnabled] = useState<boolean[]>(Array(data?.length || 100).fill(false));
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const dispatch = useDispatch();
    useEffect(() => {
        fetchGrantList();
    }, []);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const id = event.target.value;
        const isChecked = event.target.checked;
        setSelectedIds((prevIds: any) => {
            if (isChecked) {
                return [...prevIds, id];
            } else {
                return prevIds.filter((selectedId: any) => selectedId !== id);
            }
        });
    };
    const handleEditClick = (rowindex: number) => {

        setIsTextBoxEnabled((prevState) => {
            const newState = [...prevState]; // Create a copy of the state array
            newState[rowindex] = true; // Set the specific element to true
            return newState;
        });
    };
    const handleSaveButtonClick = async (rowIndex: any, formData: any) => {
        const confirmed = window.confirm('このまま保存しますか？');
        if (confirmed) {
            await editButtonAction(rowIndex, formData);
        }
    };
    const handleSubmitData = (formData: any, rowId: any) => {
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
                "classification": formData.classification,
                "dateCreated": formData.date,
                "remark": formData.remark,
                "institution": formData.institution,
                "dept": formData.dept,
                "newCont": formData.newCont,
                "representative": formData.representative,
                "age": formData.age,
                "recomdPernInst": formData.recomdPernInst,
                "recomdPernJob": formData.recomdPernJob,
                "recomdPernFullname": formData.recomdPernFullname,
                "researchName": formData.researchName,

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


    return (
        <Box >
            <Grid container xs={12} padding={1} spacing={1} >
                <Grid item xs={2} spacing={2}>
                    <LeftPanGrant />
                </Grid>
                <Grid item xs={10} >
                    <EditGrantHeaderComponent selectedId={selectedIds} />
                    <Grid item >

                        {data?.length > 0 ?
                            <Grid item xs={12} container className='Table-root'>
                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className='Table-root-col1 cell-padding  Table-root-border-right headerbold '>削除</TableCell>
                                                    <TableCell className='Table-root-col0 cell-padding  Table-root-border-right headerbold '>編集</TableCell>
                                                    <TableCell className='Table-root-col2 cell-padding Table-root-border-right headerbold' >NO 受付日付</TableCell>
                                                    <TableCell className='Table-root-col3 cell-padding  Table-root-border-right headerbold'>新規・継続 区分</TableCell>
                                                    <TableCell className='Table-root-col4 cell-padding Table-root-border-right headerbold'>研究活動 区分</TableCell>
                                                    <TableCell className='Table-root-col5 cell-padding Table-root-border-right headerbold'>申請者</TableCell>
                                                    <TableCell className='Table-root-col6 cell-padding Table-root-border-right headerbold'>年齢</TableCell>
                                                    <TableCell className='Table-root-col7 cell-padding Table-root-border-right headerbold'>Email</TableCell>
                                                    <TableCell className='Table-root-col8 cell-padding Table-root-border-right headerbold'>推薦者</TableCell>
                                                    <TableCell className='Table-root-col9 cell-padding Table-root-border-right headerbold'>申請課題名</TableCell>
                                                    <TableCell className='Table-root-col10 cell-padding Table-root-border-right headerbold'>研究総額（万円）</TableCell>
                                                    <TableCell className='Table-root-col11 cell-padding  Table-root-border-right headerbold'>申請金額（万円）</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            {data?.map((item: any, index: any) => {
                                                const year = item.dateCreated[0];
                                                const month = String(item.dateCreated[1]).padStart(2, '0');
                                                const day = String(item.dateCreated[2]).padStart(2, '0');
                                                const formattedDate = `${year}-${month}-${day}`;
                                                return (
                                                    <TableBody className={index % 2 === 0 ? 'odd-row' : 'even-row'}>
                                                        <TableEditRowComponent item={item} date={formattedDate}
                                                            handleCheckboxChange={handleCheckboxChange}
                                                            handleEditClick={(rowid: any) => handleEditClick(rowid)}
                                                            handleSubmitData={(formData: any, rowId: any) => handleSubmitData(formData, rowId)} textBoxEnabled={isTextBoxEnabled[item.id]} >

                                                        </TableEditRowComponent>


                                                        <TableRow className="custom-row" >
                                                            <TableCell className='cell-padding'></TableCell>
                                                            <TableCell className='cell-padding'></TableCell>
                                                            <TableCell className='cell-padding'></TableCell>
                                                            <TableCell className='cell-padding'></TableCell>
                                                            <TableCell className='cell-padding'></TableCell >
                                                            <TableCell className='cell-padding'></TableCell>
                                                            <TableCell className='cell-padding'></TableCell>
                                                            <TableCell className='cell-padding'></TableCell>
                                                            <TableCell className='cell-padding'></TableCell>
                                                            <TableCell className='cell-padding'></TableCell>
                                                            <TableCell className='cell-padding'></TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                )
                                            })}
                                        </Table>
                                    </TableContainer>

                                </Grid>
                            </Grid>
                            : <div>no records found</div>}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default GrantRequestEditView;
