import React from 'react';
import '../../../assets/css/health.css';
import { Button, Grid } from '@mui/material';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
// import LeftPanBBS from '../../Common/LeftPanBBS';
import { useForm, Controller } from "react-hook-form";
import submitbtn from '../../../assets/images/7nth_page_btn.gif'
import resetbtn from '../../../assets/images/7nth_page_btn_1.gif'
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import "../../../assets/css/health.css";
import LibraryHeader from '../Common/LibraryHeader';
import '../Common/library.scss'
import LeftPanLibrary from '../Common/LeftPanLibrary';
const SearchBookLender= () => {
    const navigate = useNavigate();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

    const location = useLocation();
    
    //handle  form submit action
    const onSubmit = async (data: any) => {
        navigate('/lendersearchlist', { state: { data: data} });
    }

    //reset the form fields
    const resetField = () => {
        reset();
    }
    return (
        <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanLibrary />
        </Grid>
        <Grid item xs={9}>
          <LibraryHeader
            label1=" B-4."
            label2="貸出・返却の登録"
            label3="図書室管理"
          />

                <Grid className="hr"></Grid>
                <span className="black">
                    ★項目を選択して、貸出者を検索して下さい。
                </span>
                <Grid className="hr"></Grid>
                <Grid className="hr"></Grid>
                <form name="booksearch" id="form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container className="table_seven" >
                        <Grid item xs={12}>
                            <Grid className="hr"></Grid>
                            <Grid className="hr"></Grid>
                            <Grid className=" searchbook_content content-row">
                                <Grid item xs={12} container >
                                    <Grid item xs={2} className="black">● 登録 No. </Grid>
                                    <Grid item xs={8} > <input type="text"
                                        {...register('regNo')} className="bdr_text3"></input>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className=" searchbook_content content-row">
                                <Grid item xs={2} className="black" ><span>● 貸出者氏名</span> </Grid>
                                <Grid item xs={8} > <input type="text"
                                    {...register('name')} className="bdr_text3"></input>
                                </Grid>
                            </Grid>
                         
                            <Grid className="searchbook_content content-row">
                                <Grid item xs={2} className="black"> ● ふりがな</Grid>
                                <Grid item xs={8} > <input type="text"
                                    {...register('phoneticCom1')} className="bdr_text3"></input>
                                </Grid>
                            </Grid>
                            
                            <Grid className="searchbook_content content-row">
                                <Grid item xs={2} className="black"> ● 電話番号</Grid>
                                <Grid item xs={8} > <input type="text"
                                    {...register('phone')} className="bdr_text3"></input>
                                </Grid>
                            </Grid>
                            <Grid className="searchbook_content content-row">
                                <Grid item xs={2} className="black">● E-mail</Grid>
                                <Grid item xs={8} > <input type="text"
                                    {...register('email')} className="bdr_text3"></input>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <Grid display={'flex'} justifyContent={'center'}>
                            <Button type="submit">
                                <img src={submitbtn} />
                            </Button>
                            <Button type="reset">
                                <img src={resetbtn} onClick={() => resetField()} />
                            </Button>
                        </Grid> 
                </form>
            </Grid>
        </Grid >


    );
}

export default SearchBookLender;
