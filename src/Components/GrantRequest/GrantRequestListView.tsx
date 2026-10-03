import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellCheckboxRenderer, gridClasses, GridRowSelectionModel } from '@mui/x-data-grid';
import { alpha } from '@mui/material/styles';
import { Box, Button, Checkbox, TableRow, Grid, Table, TableContainer, TableHead, TableCell, TableBody } from '@mui/material';
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
import TableRowComponent from './TableRowComponent';


const GrantRequestListView = () => {
    const [rowSelectionModel, setRowSelectionModel] =
        React.useState<GridRowSelectionModel>([]);
    const [selectedRows, setSelectedRowId] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const data = useSelector((state: any) => {
        return state?.reducer1.data?.grant_request
    });

  
    const navigate = useNavigate();

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
        setLoading(true)
        try {
            const req = {
            };
            dispatch(fetchData("grant_request", "api/grant-requests/list", req));
            if (!data || !Array.isArray(data)) {
                setLoading(false)
                return null; // Return null or a fallback component if the data is not available or is not an array
            }

        } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false)
        }
    };

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
    return (
        <Box >

            <Grid container xs={12} padding={1} spacing={1}>
                <Grid item xs={2} >
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
                    {data?.data?.length > 0 ?
                        <Grid item xs={12} container className='Table-root'>
                            <Grid item xs={12}>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className='Table-root-col1 cell-padding  Table-root-border-right headerbold '></TableCell>
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
                                        {data?.data?.map((item: any, index: any) => {
                                            const year = item.dateCreated[0];
                                            const month = String(item.dateCreated[1]).padStart(2, '0');
                                            const day = String(item.dateCreated[2]).padStart(2, '0');
                                            const formattedDate = `${year}-${month}-${day}`;
                                            return (
                                                <TableBody className={index % 2 === 0 ? 'odd-row' : 'even-row'}>
                                                    <TableRowComponent cell1={"checkbox"} cell2={item.id} cell3={item.newCont} cell4={item.classification} cell5={item.institution}
                                                        cell6={item.age} cell7={item.email2 ? item.email2 : item.repEmail} cell8={item.recomdPernInst} cell9={item.researchName}
                                                        cell10={item.expTotal} cell11={item.subTotal} handleCheckboxChange={handleCheckboxChange}></TableRowComponent>
                                                    <TableRowComponent cell1={""} cell2={formattedDate} cell3={""} cell4={""} cell5={item.dept}
                                                        cell6={""} cell7={""} cell8={item.recomdPernJob} cell9={""} cell10={""} cell11={""}></TableRowComponent>
                                                    <TableRowComponent cell1={""} cell2={""} cell3={""} cell4={item.remark} cell5={item.fullname ? item.fullname : item.representative}
                                                        cell6={""} cell7={""} cell8={item.recomdPernFullname} cell9={""} cell10={""} cell11={""}></TableRowComponent>
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


        </Box>
    );
};

export default GrantRequestListView;
