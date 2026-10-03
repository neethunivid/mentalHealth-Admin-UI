import { Box, Grid, Table, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import '../../assets/css/health.css';
import LeftPanGrant from "../Common/LeftPanGrant";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import ApiClient from '../../API/API-client';

const GrantHistoryComponent = () => {
    const { register, handleSubmit, watch } = useForm();
    const [selectedyear, setSelectedyear] = useState<number>();
    const selectedCheckBox1 = watch('currentYear');
    const selectedCheckBox2 = watch('previousyear'); // Replace 'currentYear' with the name of your checkbox input field
    const navigate = useNavigate();
    const onSubmit = (data: any) => {
        setSelectedyear(data.year)
        downloadDetails(selectedCheckBox1, selectedCheckBox2, data.year)

    };

    const handleDownloadButtonClick = () => {
    };
    const handleCancelButtonClick = () => {
        navigate("/grantlistview");
    };
    const downloadFile = (data: any, fileName: any, fileType: any) => {
        const blob = new Blob(["\ufeff" + data], { type: "text/csv;charset=UTF-8" })
        const a = document.createElement('a')
        a.download = fileName
        a.href = window.URL.createObjectURL(blob)
        const clickEvt = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        })
        a.dispatchEvent(clickEvt)
        a.remove()
    }
    function formatDate(date: any) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        return `${year}${month}${day}${hours}${minutes}${seconds}`;
    }
    const downloadDetails = async (data1: any, data2: any, data3: any) => {
        if (data1 == '' || data1 == undefined) {
            data1 = false;
        }
        if (data2 == '' || data2 == undefined) {
            data2 = false;
        }
        const dataRequest = {
            "applicationDetails": data1,
            "applicationHistory": data2,
            "year": parseInt(data3)
        }
        try {
            const apiData = await ApiClient.post('api/export/grant-request', dataRequest);
            const date = new Date();
            const formattedDate = formatDate(date);
            if (apiData) {
                downloadFile(apiData.data, `grant_request_${formattedDate}`, 'text/csv')
            }

        } catch (error: any) {
            if (error.response && error.response.status === 403) {

                console.log("403 error occurred");
            } else {

                console.log("Error occurred:", error);
            }
        }


    }

    return (
        <Box>
            <Grid container xs={12} padding={1} spacing={1}>
                <Grid item xs={2} spacing={2}>
                    <LeftPanGrant />
                </Grid>
                <Grid item xs={10} className="first_page">
                    <Grid item xs={12} className="first_page">
                        <Table >
                            <TableRow>
                                <TableCell className="p2red_bg_left">&nbsp;</TableCell>
                                <TableCell className="p2red_bg_midle">
                                    <label className="">
                                        C.申請履歴とダウンロード</label>
                                </TableCell>
                                <TableCell className="p2red_bg_right">&nbsp;</TableCell>
                            </TableRow>
                        </Table>
                    </Grid>
                    <Grid item xs={10} className="history_page">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid xs={12}>
                                <input type="checkbox" id="currentYear" className="boxDesign" value="" {...register('currentYear')} /> 申請内容のダウンロード
                            </Grid>
                            <Grid xs={12} container >
                                <Grid xs={3}>
                                    <input type="checkbox" id="previousyear" className="boxDesign" value="" {...register('previousyear')} /> 申請履歴

                                </Grid>
                                <Grid xs={9}>
                                    <select {...register("year")}>
                                        <option value="0">Select</option>
                                        {Array.from({ length: new Date().getFullYear() - 2021 }, (_, index) => (
                                            <option key={index + 2022} value={index + 2022}>
                                                {index + 2022}
                                            </option>
                                        ))}

                                    </select>
                                    <label> 年度（3月1日から4月末日までの申請受付分</label>
                                </Grid>
                            </Grid>
                            <button type="submit" id="download" onClick={handleDownloadButtonClick} className="downloadbtn" value='ダウンロード'>ダウンロード</button>
                            <button type="submit" id="cancel" onClick={handleCancelButtonClick} className="downloadbtn" value='ダウンロード'>キャンセル</button>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
            <Grid>

            </Grid>
        </Box>
    );
}
export default GrantHistoryComponent;