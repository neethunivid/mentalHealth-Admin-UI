import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, Button } from "@mui/material";
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from "react-redux";
import { setMemberReg } from "../../../Redux/actions";
import timeOptionsData from "../../BBS/Mail Magazine Management/ListMailMagazineGeneral/TimeData";
import apiClient from "../../../API/API-client";
import { checkDate, formatDateString, getCurrentDateTime } from "../../Common/Date_conversion";
import LeftPanChecksheet from "../LeftPanChecksheet";

const CheckSheetSendMail = () => {
    const { register, handleSubmit, watch, control, setValue, getValues, reset } = useForm();
    const navigate = useNavigate();
    const [SelectedTime, setSelectedTime] = useState<any>([])
    const mailcontent: any = useSelector((state: any) => state.memberData?.emailcontent);
    const sendnow = watch('sendnow');
    const sendTime = watch('sendTime');
    const location = useLocation();
    const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
    
        const localStorageData1 = sessionStorage.getItem("emailcontent");
        if (localStorageData1) {
          const parsedObject: any = JSON.parse(localStorageData1);
          dispatch(setMemberReg("emailcontent", parsedObject));
        }
 
      }, []);
    const onSubmit = (data: any) => {
        if (!sendnow && !sendTime) {
            alert("ダウンロード方法を選択し、ダウンロードボタンを押して下さい。")
            return;
        }
        else if (sendTime && (!data.Year && !data.date && !data.month)) {
            alert(" 発信日時を指定して送信する")
            return;
        }
        else if (!sendTime && (data.Year && data.date && data.month)) {
            alert(" 発信日時を指定して送信する")
            return;
        }else  if(sendTime&&(!checkDate(`${data.Year}-${data.month}-${data.date}`))){
            alert("正しい日付形式を入力してください")
        }
        else{
            SendEmailToMember(data)
        }
    };
   
    let req: any;
   
    //send mail to member
    const SendEmailToMember = async (data: any) => {
        setSubmitButtonDisabled(true)
        const Date =formatDateString(`${data.Year}-${data.month}-${data.date}`)
        const formattedDateTime = `${Date}T${data.selectedTime}:00`;
        const currentTime=getCurrentDateTime()
        try {
            if (sendnow == false) {
                req = {

                    "diagonseCheckID": mailcontent.DiagonoseId,
                    "diagonseMagID":location?.state?.diagonseMagId,
                    "checkSheetTypeID": mailcontent.checksheetId,
                    "title":mailcontent.checksheet_title,
                    "content": mailcontent.template_content,
                    "sentTime": formattedDateTime,
                    "magMailSubject":mailcontent.template_subject,
                    "sendStatus": 0,
                    "mailType": mailcontent.type=="PC"?2:1

                }
            } else {
                req = {

                    "diagonseCheckID": Array.isArray(mailcontent.DiagonoseId) ? mailcontent.DiagonoseId : [mailcontent.DiagonoseId],
                    "diagonseMagID":location?.state?.diagonseMagId,
                    "checkSheetTypeID":mailcontent.checksheetId,
                    "title": mailcontent.checksheet_title,
                    "content": mailcontent.template_content,
                    "sentTime":currentTime ,
                    "magMailSubject": mailcontent.template_subject,
                    "sendStatus": 1,
                    "mailType":  mailcontent.type=="PC"?2:1

                }
            }
            const apiData = await apiClient.post("api/checksheetmail/saveemail", req, {});
            if (apiData) {
                setSubmitButtonDisabled(false)
                navigate('/diagnosismailing_list', { state: {data: mailcontent.userEmail } })
            }

        } catch (error: any) {
            // Handle errors if necessary
            setSubmitButtonDisabled(false)
            console.error("API Error:", error);
        }
    }

    //handle sendnow checkbox
    const handleCheckboxAChange = (value: any) => {
        setValue('sendnow', value);
        if (value) {
            setValue('sendTime', false);

        }
    };
    //handle the checkbox for giving time
    const handleCheckboxBChange = (value: any) => {
        setValue('sendTime', value);
        if (value) {
            setValue('sendnow', false);
        }

    };

    //reset the form field and checkboxes
    const handlereset=()=>{
        reset();
        setValue('sendTime', false);
        setValue('sendnow', false);
    }

    return (
        <>
            <Grid container xs={12} padding={1} spacing={1}>
                <Grid item xs={3} spacing={2}>
                    <LeftPanChecksheet/>
                </Grid>
                <Grid item xs={9}>
                    <Grid className="content-row">
                        <Grid className="p2red_bg_left size"></Grid>
                        <Grid className="p2red_bg_midle">
                            <Grid className="top-header">
                                <span className="verdana_big">メールの送信</span>
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
                                        <Grid item className={mailcontent?.type == 'PC' ? "Active_btnmailmag" : "Inactive_btnmailmag"}
                                        >
                                            PC
                                        </Grid>
                                        <Grid item className={mailcontent?.type == 'SP' ? "Active_btnmailmag" : "Inactive_btnmailmag"}
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
                                        name="magazine_content"
                                        render={({ field }) => (
                                            <>
                                                <textarea
                                                    {...field}
                                                    className="bdr_textarea_mailmag"
                                                    rows={20}
                                                    cols={54}
                                                    onChange={(e) => field.onChange(e.target.value)} // Update value on change
                                                    value={field.value || (mailcontent?.userEmail ? mailcontent.userEmail.join('\n') : '')} // Safely check for userEmail
                                                />
                                            </>
                                        )}
                                    />
                                </Grid>
                                <Grid xs={12} container className="response-temp-margintop">
                                <Grid>
                                    <button type="submit" className="btnstyle"  disabled={isSubmitButtonDisabled}>
                                    送信
                                    </button>
                                    <button className="btnstyle btnmrglft" type="reset" onClick={()=>{handlereset()}}>
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

export default CheckSheetSendMail;
