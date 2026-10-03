import React, { useState } from 'react';
import '../../../assets/css/health.css';
import { Button, Grid } from '@mui/material';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import LeftPanBBS from '../../Common/LeftPanBBS';
import { useForm, Controller } from "react-hook-form";
import submitbtn from '../../../assets/images/pg_22_btn_left.gif'
import resetbtn from '../../../assets/images/pg_22_btn_right.gif'
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import '../MemberData/member.scss';
import ApiClient from "../../../API/API-client";
import '../Mail Magazine Management/Mail Magazine Components/mail_magazine.scss'
import MailMagazineMemberlistHeader from './Mail Magazine Components/MailMagazineMemberlistHeader';

const EditMailMemberGeneral: React.FC = () => {
    let EditData:any;
    let apiData:any;
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const { register, handleSubmit, control, formState: { errors }, reset,setValue } = useForm();

    const location = useLocation();
  if (location && location.state) {
    EditData = location.state.data
  }
    const onSubmit = async (data: any) => {
     const reg= /[a-zA-Z][a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
        if(data.membername==""){
            alert("お名前を入力してください")
            return
        }else if(data.memberemail==""){
            alert("正しいメールアドレスを入力してください。")
            return
        }else if(!reg.test(data?.memberemail)){
            alert("正しいメールアドレスを入力してください。")
        }
        else if(data.memberemailmob==""){
            alert("正しいメールアドレスを入力してください。")
        }
        else if(!reg.test(data?.memberemailmob)){
            alert("正しいメールアドレスを入力してください。")
        }else{
            updateMailMember(data)
        }
    }
    const resetField = () => {
        reset();
        setValue("membername","");
        setValue("memberemail","");
        setValue("memberemailmob","");
    }
    const updateMailMember=async(data:any)=>{
        setMessage("");
        try {
            const dataRequest={
                    email: data.memberemail,
                    emailMob: data.memberemailmob,
                    name: data.membername
            }
            apiData = await ApiClient.put('api/mailmag/update/'+EditData.id, dataRequest, {});
            if(apiData){
                setMessage("更新成功");
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
        <Grid container xs={12} padding={1} spacing={1}>
            <Grid item xs={3} spacing={2}>
                <LeftPanBBS />
            </Grid>
            <Grid item xs={9}>
                <MailMagazineMemberlistHeader
                    title1=""
                    title2="メルマガ管理"
                />

                <Grid className="hr"></Grid>

                <form name="membersearch" id="form" onSubmit={handleSubmit(onSubmit)}>
                    <Grid container  className="table_seven" >
                        <Grid item xs={12} >
                             {message ? (<Box>
                                         <h1 id="message" >{message}</h1>
                                        </Box>) : null}
                            <Grid className="hr"></Grid>
                            <Grid className="hr"></Grid>
                            <Grid className=" member_magazine_content content-row">
                                <Grid item xs={12} container >
                                    <Grid item xs={4} className="black"> <span >会員番号 <span className="red_font">*</span></span>
                                   </Grid>
                                    <Grid item xs={8} > <input type="text"
                                        {...register('membername')} className="bdr_text"
                                        defaultValue={EditData.name}></input>
                                         
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid className=" member_magazine_content content-row">
                                <Grid item xs={4} className="black" ><span className ="black">メールアドレス（PC用）<span className="red_font">*</span></span>
                                 </Grid>
                                <Grid item xs={8} > <input type="text"
                                    {...register('memberemail')} className="bdr_text"
                                    defaultValue={EditData.email}></input>
                                     
                                </Grid>
                            </Grid>
                            <Grid className=" member_magazine_content content-row">
                                <Grid item xs={4} className="black"> <span >メールアドレス（携帯用）<span className="red_font">*</span></span>
                                </Grid>
                                <Grid item xs={8} > <input type="text"
                                    {...register('memberemailmob')} className="bdr_text"
                                    defaultValue={EditData.emailMob}></input>
                                     
                                </Grid>
                            </Grid>
                            <Grid className=" member_magazine_content textalign">
                            <span className="red_font">*</span>
                              <span className="black"> 入力必須項目</span>
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

export default EditMailMemberGeneral;
