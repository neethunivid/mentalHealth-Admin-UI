import { Grid,Button } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import LeftPanBBS from "../../../Common/LeftPanBBS";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../../../../API/API-client";
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import calendericon from "../../../../assets/images/icon_calender.gif";
import { useSelector, useDispatch } from "react-redux";
import { setMemberReg } from "../../../../Redux/actions";
import Member_pen_selectBox from "../../Member monitor management/Member monitor Comp/Member_pen_selectBox";
import submitButton from "../../../../assets/images/pg_24_btn_left.gif";
import resetButton from "../../../../assets/images/pg_24_btn_right.gif";
import { formatDateString } from '../../../Common/Date_conversion';
interface Item {
  id: any;
  name: any;
}
const EmailMAILmag_Theme = () => {
  //mailmagazine by theme create page
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const datePickerRef = useRef<ReactDatePicker>(null);
  const dispatch = useDispatch();
  //function used to update the values of selectedDate and "date1"
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setValue("date1", date);
  };
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  //state variable initialisation
  const [textareaWidth, setTextareaWidth] = useState("600px");
  const [items, setItems] = useState<Item[]>([]);
  const [typeOption, setSelectedOption] = useState("pc");
  const [isPcClicked, setIsPcClicked] = useState(true);
  const [isMobileClicked, setIsMobileClicked] = useState(false);
  //function executed when pc button click
  const handlePcClick = () => {
    setIsPcClicked(true);
    setIsMobileClicked(false);
    setTextareaWidth("600px");
    setSelectedOption("pc")
    topicList("pc")
  };

//function executed when sp button click
  const handleMobileClick = () => {
    setIsPcClicked(false);
    setIsMobileClicked(true);
    setTextareaWidth("250px");
    setSelectedOption("sp")
    topicList("sp")
  };

  useEffect(() => {
      //dispatch(setMemberReg('sendmailtheme',''));
    if (location && location.state && location.state.data) {
      setSelectedOption(location.state.data);
      setTextareaWidth(location.state.data === "pc" ? "600px" : "250px");
      topicList(location.state.data === "pc" ? "pc" : "sp");
    }else{
    topicList(typeOption=="pc" ? "pc" : "sp");
    }
   
  }, []);
//api call for topiclist int he selectionbox
  const topicList = async (topicdata:any) => {
    try {
      const apiData = await apiClient.get("api/mailmag/get-topic/"+topicdata);
      if (apiData) {
        setItems(apiData.data.data);
      }
    } catch (error) {
      console.error(error, "error is getting here");
    }
  };
 //stores the data in the redux store
  const location = useLocation();
 const sendThemeData: any = useSelector(
    (state: any) => state?.memberData?.sendmailtheme
  );
  //to open the calender on the calendericon click
  const handleButtonClick = () => {
    datePickerRef.current?.setOpen(true);
  };
//function executed in the onsubmit button  of the hookfrorm
  const onSubmit=(data:any)=>{
    if (!data.topics) {
        alert("メールマガのタイトルをご記入ください。");
        return; 
      }
      else if (!data.title) {
        alert("メールマガのタイトルをご記入ください。");
        return;
      }
       else if (!data.text) {
        alert("メールマガのテキストをご記入ください");
        return;
      }
      else if (!data.date1) {
        alert("日付を選択してください。");
        return; 
      }
else if (!data.email_replay_hr) {
        alert("時間を選択してください。");
        return; 
      }
// else if (!data.email_replay_min) {
//         alert("時間を選択してください。");
//         return; 
//       }
    else{

      const dateObj = data?.date1 instanceof Date ? data?.date1 : new Date(data?.date1);
      //to get the selected value of the topics in the selectionlist
      const selectedItem = items.find(item => item.id==data.topics);
      const formattedDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;


  const formattedHour = data.email_replay_hr?.padStart(2, '0'); // Ensure two digits
  const formattedMinute = data.email_replay_min?.padStart(2, '0')??'00'; // Ensure two digits

  // Create the formatted datetime
  const formattedDateTime = `${formattedDate} ${formattedHour}:${formattedMinute}:00`;
  // dispatching an action to update the application's state related to "sendmailtheme" with specific data and then navigating to a different page 
  dispatch(setMemberReg("sendmailtheme", {...data,formattedTimestamp: formattedDateTime,type:typeOption,topicName:selectedItem?.name}));
  navigate("/sendmailmagpreview");
    }
  }
  //resets the form data
  const handleReset = () => {
    reset();
    setValue("title", "");
    setValue("text", "");
    setValue("date1", "");
    setValue("email_replay_hr", "");
    setValue("email_replay_min", "");
    setValue("topics", "");
  };
  
  return (
    <div>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={3}>
          <Grid className="hr"></Grid>
          <LeftPanBBS />
        </Grid>
        <Grid item xs={9}>
          <Grid className="hr"></Grid>
          <Grid className="content-row">
            <Grid className="p2red_bg_left size"></Grid>
            <Grid className="p2red_bg_midle">
              <Grid className="top-header">
                <span className="verdana_big">J.テーマ別メルマガ発信</span>
                <span className="verdana_big">メルマガ管理</span>
              </Grid>
            </Grid>
            <Grid className="p2red_bg_right size"></Grid>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <form name="sendmailtheme" onSubmit={handleSubmit(onSubmit)}>
            <Grid xs={12} className="content-row">
              <Grid className="email_reply_theme_margin" xs={11}>
                <Grid>
                  <label className="black"> ★トピック</label>
                </Grid>
                <Grid className="hr"></Grid>
                <Controller
  control={control}
  name="topics"
  defaultValue={sendThemeData?.topics}
  render={({ field }) => (
    <select {...field}>
      <option value="">select</option>
      {items.map((item: any) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  )}
/>
              </Grid>
              <Grid xs={1}>
              <button type='button' className={typeOption=="pc"?'Active_btnmailmag':'Inactive_btnmailmag'}
                onClick={handlePcClick} 
              >
                PC
              </button>
              {" | "}
              <button type='button'
                onClick={handleMobileClick} className={typeOption=="sp"?'Active_btnmailmag':'Inactive_btnmailmag'}
              >
                携帯
              </button>
              </Grid>
            </Grid>
            <Grid className="hr"></Grid>
            <Grid xs={12} className="content-row">
              <Grid className="email_reply_theme_margin" xs={11}>
                <Grid>
                  <label className="black"> ★タイトル</label>
                </Grid>
                <Grid className="hr"></Grid>
                <Grid>
                    <Controller
                      name="title"
                      control={control}
                      defaultValue={sendThemeData?sendThemeData?.title:""} 
                      render={({ field }) => <input {...field} />}
                    />
                  </Grid>
        
                <Grid className="hr"></Grid>
              </Grid>
              
            </Grid>
            <Grid className="hr"></Grid>
            <Grid xs={12} className="content-row">
              <Grid className="email_reply_theme_margin" xs={11}>
                <Grid>
                  <label className="black">

                    {typeOption=="pc"
                      ? "★メール内容(PC)"
                      : "★メール内容(携帯）"}
                  </label>
                </Grid>
                <Grid className="hr"></Grid>
                <Controller
                        name="text"
                        control={control}
                        defaultValue={sendThemeData?sendThemeData?.text:""}
                        render={({ field }) =>
                          < textarea
                            className="bdr_textarea_mailmag"
                            rows={40}
                            style={{ width: textareaWidth }}
                            {...field} />}
                      />
              
                <Grid className="hr"></Grid>
              </Grid>
    
            </Grid>
            <Grid className="hr"></Grid>
            <Grid xs={12} className="email_reply_theme_margin content-row">
              <label className="black">日付 </label>
             
               <Controller
        control={control}
        name="date1"
        defaultValue={formatDateString(sendThemeData?.date1)}
        render={({ field }) => (
          <ReactDatePicker
          {...field}
          className="bdr_text"
          ref={datePickerRef}
          selected={selectedDate} // Connect the value from the form state
            onChange={handleDateChange} // Handle date changes and update form state
            dateFormat="yyyy-MM-dd"
          />
        )}
      />
              <img
                className="bg_white"
                src={calendericon}
                alt="calendar"
                width={14}
                height={14}
                onClick={handleButtonClick}
              />
            </Grid>
            <Grid className="hr"></Grid>
            <Grid xs={12} className="email_reply_theme_margin content-row">
              <label className="black">	時間  </label>
              <Member_pen_selectBox
              isHr={true}
                name={"email_replay_hr"}
                control={control}
                label={"時"}
                defaultValue={sendThemeData?.email_replay_hr}
              />
              <Member_pen_selectBox
                name={"email_replay_min"}
                control={control}
                label={" 分"}
               defaultValue={sendThemeData?.email_replay_min??'00'}
              />
    
            </Grid>
            <Grid className="hr"></Grid>
           <Grid className="email_reply_theme_margin">
             <Button type="submit"> <img src={submitButton} /></Button>
             <Button type="reset" onClick={handleReset}><img src={resetButton} /></Button> 
              </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmailMAILmag_Theme;
