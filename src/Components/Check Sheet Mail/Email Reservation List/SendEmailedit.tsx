import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Button } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from "react-redux";
import timeOptionsData from "../../BBS/Mail Magazine Management/ListMailMagazineGeneral/TimeData";
import apiClient from "../../../API/API-client";
import LeftPanChecksheet from "../LeftPanChecksheet";
import { getCurrentDateTime } from "../../Common/Date_conversion";

const CheckSheetSendMailEdit = () => {
    const { register, handleSubmit, watch, control, setValue, getValues, reset } = useForm();
    const navigate = useNavigate();
    const [SelectedTime, setSelectedTime] = useState<any>([])
    const sendmailData: any = useSelector(
        (state: any) => state?.memberData?.mailEditdata
      );
    
    let type: any = "PC"
    const sendnow = watch('sendnow');
    const sendTime = watch('sendTime');
    const onSubmit = (data: any) => {
        if (!sendnow && !sendTime) {
            alert("ダウンロード方法を選択し、ダウンロードボタンを押して下さい。")
            return;
        }
        else if (sendTime && (!data.year && !data.date && !data.month)) {
            alert(" 発信日時を指定して送信する")
            return;
        }
        else{
            SendmailContentEdit(data); 
        }
    };
    let id: any;
    let title: any;
    let sendtime: any;
    let req: any
    const location = useLocation();
    if (location && location.state && location.state.data) {
        id = location.state.data;
        title = location.state.title;
        sendtime = location.state.sendtime;
    }
    //to get the date in the format yyyy-mm-dd
    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
//api call for mailcontent edit
    const SendmailContentEdit = async (data: any) => {
        const Date = formatDate(`${data.month}-${data.date}-${data.Year}`)
        const formattedDateTime = `${Date}T${data.selectedTime}:00`;
        try {
            if (sendnow == false) {
                req = {

                    
                        sentTime:formattedDateTime,
                        title:sendmailData?.title,
                        content:sendmailData?.content,
                        magMailSubject:sendmailData?.mailMagsub,
                        mailType:sendmailData?.device=="PC"?2:1
                    

                }
            } else {
                req = {

                    sentTime:getCurrentDateTime(),
                    title:sendmailData?.title,
                    content:sendmailData?.content,
                    magMailSubject:sendmailData?.mailMagsub,
                    mailType:sendmailData?.device=="PC"?2:1
                

                }
            }
            
            const apiData = await apiClient.put("api/checksheetmail/edit/"+sendmailData?.Id, req, {});
            if (apiData) {
                navigate('/diagnosismailing_list')
            }

        } catch (error: any) {
            // Handle errors if necessary
            console.error("API Error:", error);
        }
    }

//handles the sendnow checkbox
    const handleCheckboxAChange = (value: any) => {
        setValue('sendnow', value);
        if (value) {
            setValue('sendTime', false);

        }
    };
    //handles the senttime checkbox
    const handleCheckboxBChange = (value: any) => {
        setValue('sendTime', value);
        if (value) {
            setValue('sendnow', false);
        }

    };


    return (
        <>
            <Grid container xs={12} padding={1} spacing={1}>
                <Grid item xs={3} spacing={2}>
                    <LeftPanChecksheet /> 
                </Grid>
                <Grid item xs={9}>
                    <Grid className="content-row">
                        <Grid className="p2red_bg_left size"></Grid>
                        <Grid className="p2red_bg_midle">
                            <Grid className="top-header">
                                <span className="verdana_big">E.メルマガ会員へのメール送信（一般)</span>
                                <span className="verdana_big">メルマガ管理</span>
                            </Grid>
                        </Grid>
                        <Grid className="p2red_bg_right size"></Grid>
                    </Grid>
                    <Grid className="hr"></Grid>

                    <form name="sendmailgneral" onSubmit={handleSubmit(onSubmit)}>
                        <Grid item xs={12} className="history_page">
                            <Grid item xs={12} className="table_seven" padding={3}>

                                <Grid xs={12} container className="content_margintop">
                                    <Grid xs={1}></Grid>
                                    <Grid xs={9}>
                                    </Grid>
                                    <Grid xs={1} container spacing={1}>
                                        <Grid item className={sendmailData?.device == 'PC' ? "Active_btnmailmag" : "Inactive_btnmailmag"}
                                        >
                                            PC
                                        </Grid>
                                        <Grid item className={sendmailData?.device == 'SP' ? "Active_btnmailmag" : "Inactive_btnmailmag"}
                                        >
                                            SP
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} container padding={0.5}>
                                    <Controller
                                        name="sendnow"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={(e) => handleCheckboxAChange(e.target.checked)}
                                            />
                                        )}
                                    />
                                    <span className="black">  今すぐ発信</span>
                                </Grid>

                                <Grid item xs={12} container padding={0.5} display={"flex"} flexDirection={"row"}>
                                    <Grid item xs={3}>
                                        <Controller
                                            name="sendTime"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    type="checkbox"
                                                    checked={field.value}
                                                    onChange={(e) => handleCheckboxBChange(e.target.checked)}
                                                />
                                            )}
                                        />
                                        <span className="black">  予約して発信</span>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <input type="text" className='bdr_text_medium'  {...register('Year')} />
                                        <label className='black'>年</label>
                                        <input type="text" className="bdr_text_medium"  {...register('month')} />
                                        <label className='black'> 月</label>
                                        <input type="text" className="bdr_text_medium"  {...register('date')} />
                                        <label className='black'> 日</label>
                                    </Grid>

                                    <Grid item xs={4}>
                                        <Controller
                                            name="selectedTime" // The name of the field in the form data object
                                            control={control} // Control instance from useForm
                                            defaultValue={timeOptionsData[0]?.label} // Default value for the select input // Validation rules (optional)
                                            render={({ field }) => (
                                                <select {...field}>
                                                    {timeOptionsData.map((option) => (
                                                        <option key={option.value} value={option.label}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            )}
                                        />

                                    </Grid>
                                </Grid>
                                <Grid className="hr" />
                                <Grid className="hr" />
                                <Grid xs={12} className="text_grid">
                                    <Grid xs={3}></Grid>
                                    <span className="black content_center" >（日時を入力して下さい。　例：2008年01月01日　19:00）</span></Grid>
                                <Grid className="hr" />

                                <Grid xs={12}><span className="black">＜メールの送信先＞</span></Grid>
                                <Grid className ="hr"></Grid>
                                <Grid xs={12}>
                                    <Controller
                                        control={control}
                                        defaultValue={sendmailData?.userEmail}
                                        name="user_Email"
                                        render={({ field }) => (
                                            <>
                                                <textarea
                                                    {...field}
                                                    className="bdr_textarea_mailmag"
                                                    rows={20}
                                                    cols={54}
                                                />
                                            </>
                                        )}
                                    />
                                </Grid>
                                <Grid xs={12} container className="response-temp-margintop">
                                <Grid>
                                    <button type="submit" className="btnstyle">
                                    送信
                                    </button>
                                    <button type="reset" onClick={reset} className="btnstyle btnmrglft" >
                                    リセット
                                    </button>
                                    <Grid></Grid>
                                </Grid>
                            </Grid>
                            </Grid>
                            
                        </Grid>
                    </form>
                    <Grid className="hr"></Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default CheckSheetSendMailEdit;
