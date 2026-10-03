import React from 'react';
import '../../../assets/css/health.css';
import { Button, Grid } from '@mui/material';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import LeftPanBBS from '../../Common/LeftPanBBS';
import { useForm, Controller } from "react-hook-form";
import submitbtn from '../../../assets/images/7nth_page_btn.gif'
import resetbtn from '../../../assets/images/7nth_page_btn_1.gif'
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import '../MemberData/member.scss';
import "../../../assets/css/health.css";
import SearchModifyDeleteInput from '../Member monitor management/Member monitor Comp/SearchModifyDeleteInput';
const MemberSearchComponent: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

    const location = useLocation();

    //handle the submit action and pass the search request to next page
    const onSubmit = async (data: any) => {
        navigate('/membersearchlist', { state: { data: data, flag: "1" } });
    }

    //reset the form field
    const resetField = () => {
        reset();
    }
    return (
        <Grid container xs={12} padding={1} spacing={1}>
            <Grid item xs={3} spacing={2}>
                <LeftPanBBS />
            </Grid>
            <Grid item xs={9}>
                <Grid className="content-row">
                    <Grid className="p2red_bg_left size"></Grid>
                    <Grid className="p2red_bg_midle">
                        <Grid className="top-header">
                            <span className="verdana_big"> B.会員検索</span>
                            <span className="verdana_big">会員 DB 管理</span>
                        </Grid>
                    </Grid>
                    <Grid className="p2red_bg_right size"></Grid>
                </Grid>

                <Grid className="hr"></Grid>
                <span className="black">
                    ★いずれかの項目を入力して、会員を検索して下さい。
                </span>
                <form name="membersearch" id="form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container className="table_seven" >
                        <Grid item xs={12}>
                            <Grid className="hr"></Grid>
                            <Grid className="hr"></Grid>
                            <Grid className=" member_monitor_content content-row">
                                <Grid item xs={12} container >
                                    <Grid item xs={4} className="black"> <li >会員番号</li></Grid>
                                    <Grid item xs={8} > <input type="number"
                                        {...register('memberno')} className="bdr_text"></input>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className=" member_monitor_content content-row">
                                <Grid item xs={4} className="black" ><span> <li >ID</li></span> </Grid>
                                <Grid item xs={8} > <input type="text"
                                    {...register('memberid')} className="bdr_text"></input>
                                </Grid>
                            </Grid>
                            <Grid className=" member_monitor_content content-row">
                                <Grid item xs={4} className="black"> <li > 名前</li></Grid>
                                <Grid item xs={8} > <input type="text"
                                    {...register('name')} className="bdr_text"></input>
                                </Grid>
                            </Grid>
                            <Grid className=" member_monitor_content content-row">
                                <Grid item xs={4} className="black"> <li >eメール（PC又は携帯）</li></Grid>
                                <Grid item xs={8} > <input type="text"
                                    {...register('email_pc')} className="bdr_text"></input>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={12} container display={'flex'} justifyContent={'center'}>

                        <Grid item xs={4}>
                            <Button type='submit'><img className='padding_top' src={submitbtn} /></Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button ><img className='padding_top' src={resetbtn} onClick={() => resetField()} /></Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid >


    );
}

export default MemberSearchComponent;
