import { Button, Grid } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import LeftPanBBS from "../../../Common/LeftPanBBS";
import { useNavigate, useLocation } from "react-router-dom";
import apiClient from "../../../../API/API-client";
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import calendericon from "../../../../assets/images/icon_calender.gif";
import Member_pen_selectBox from "../../Member monitor management/Member monitor Comp/Member_pen_selectBox";
import submitButton from "../../../../assets/images/pg_24_btn_left.gif";
import resetButton from "../../../../assets/images/pg_24_btn_right.gif";
import { useSelector, useDispatch } from "react-redux";
import { setMemberReg } from "../../../../Redux/actions";
import { set } from "date-fns";
import ListMailMagThemeHeader from "./componets/ListMailMagThemeHeader";
import {
  formatDateArray,
  formatDateString,
  getCurrentDate,
} from "../../../Common/Date_conversion";
import { format } from "path";
interface Item {
  id: any;
  name: any;
}
const EmailReply_Theme = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const datePickerRef = useRef<ReactDatePicker>(null);
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setValue("date1", date);
  };
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [textareaWidth, setTextareaWidth] = useState("250px");
  const [items, setItems] = useState<Item[]>([]);
  const [parsedObject, setParsedObject] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    /*when browser refresh or when back from preview screen
     condition to get redux stored values get here and setValue in each fields */
    const localStorageData1 = sessionStorage.getItem("mailmagazineTheme");
    if (localStorageData1) {
      const parsedObject: any = JSON.parse(localStorageData1);
      setParsedObject(parsedObject);
      setValue("emaily_reply", parsedObject.mailMagJobId);
      setValue("email_subject", parsedObject.subject);
      setValue("email_text", parsedObject.text);
      setValue("email_replay_hr", parsedObject.hr);
      setValue("email_replay_min", parsedObject.min);
      const dateStr = parsedObject.sendOutTime;
      const formattedDate = new Date(dateStr);
      setSelectedDate(formattedDate);
       setValue("date1",formattedDate);
      dispatch(setMemberReg("mailmagazineTheme", parsedObject));
    } else {
      // this will trigger when first time enter screen to setValue on the date field
      if (location.state.data.sendOutTime) {
        const [year, month, day] = location.state.data.sendOutTime;
        const sendOutTime = new Date(year, month - 1, day);
        const formatDate = formatDateString(sendOutTime);
        setSelectedDate(sendOutTime);
        setValue("date1", formatDate);
      }
    }

    topicList();

    //to set the width of textarea based on the type
    setTextareaWidth(location.state.data.type == "pc" ? "600px" : "250px");

    //set the selectBox based on mailMagJobId
    setValue("emaily_reply", location.state.data.mailMagJobId);
  }, []);
  const dispatch = useDispatch();

  //to show all the topic based on type
  const topicList = async () => {

    try {
      const apiData = await apiClient.get(`api/mailmag/get-topic/${location.state.data.type}`);
      if (apiData) {
        setItems(apiData.data.data);
      }
    } catch (error) {
     alert(error);
    }
  };

  const location = useLocation();

  //to open the calender
  const handleButtonClick = () => {
    datePickerRef.current?.setOpen(true);
  };

  //form submission here
  const onSubmit = (data: any) => {
      const date = new Date(data.date1);

      //format date here in YYY-MM-DD format
      const formattedDate=formatDateString(date);

      //current Date for api
      const formattedDate1 = getCurrentDate();

      // formatted Date when reset the form
      const formattedDate2 = formatDateArray(location.state.data.sendOutTime);

      //this used to display selected topic in preview screen
      const selectedItem = items.find((item) => item.id === data.emaily_reply);
      const dataRequest = {
        mailMagJobId: data.emaily_reply,
        subject: data.email_subject,
        text: data.email_text,
        sendOutTime: `${formattedDate??formattedDate2}${"T"}${data.email_replay_hr}:${
          data.email_replay_min
        }:00`,
        type: location.state.data.type,
        date: formattedDate1,
        sendStatus: 0,
        status: 0,
        hr: data.email_replay_hr,
        fullDate: data.date1,
        min: data.email_replay_min,
        device: location.state.data.type,
        topicName: selectedItem?.name,
        id: location.state.data.id,
      };
      //save datRequest to redux
      dispatch(setMemberReg("mailmagazineTheme", dataRequest));

      navigate("/emailreplypreview", { state: { data: dataRequest } });
    // }
  };

  // this function will reset the form field that are entered by user 
  const handleReset = () => {
    reset();
    //to show previous date after reset 
    const [year, month, day] = location.state.data.sendOutTime;
    const sendOutTime = new Date(year, month - 1, day);
    const formatDate = formatDateString(sendOutTime);
    setSelectedDate(sendOutTime);
    setValue("date1", formatDate);
  };

  const mailmagazineTheme: any = useSelector(
    (state: any) => state.mailmagazineTheme
  );

  return (
    <div>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={3}>
          <Grid className="hr"></Grid>
          <LeftPanBBS />
        </Grid>
        <Grid item xs={9}>
          <Grid className="hr"></Grid>
          <ListMailMagThemeHeader
            label1="  J.テーマ別メルマガ発信"
            label2="メルマガ管理"
          />
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid xs={12} className="gridmrglft content-row">
              <Grid className="email_reply_theme_margin" xs={11}>
                <Grid>
                  <label className="black"> ★トピック</label>
                </Grid>
                <Grid className="hr"></Grid>
                <Controller
                  control={control}
                  name="emaily_reply"
                  defaultValue={
                    parsedObject == null
                      ? location.state.data?.mailMagJobId
                      : parsedObject.mailMagJobId
                  }
                  render={({ field }) => (
                    <select {...field}>
                      {items.map((item: any) => (
                        <option
                          key={item.id}
                          value={item.id}
                          selected={item.id == location.state.data.mailMagJobId}
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </Grid>
              <Grid xs={1} container spacing={1}>
                <Grid
                  item
                  className={
                    location.state.data.type === "pc"
                      ? "Active_btnmailmag"
                      : "Inactive_btnmailmag"
                  }
                >
                  PC
                </Grid>
                <Grid
                  item
                  className={
                    location.state.data?.type === "sp"
                      ? "Active_btnmailmag"
                      : "Inactive_btnmailmag"
                  }
                >
                  携帯
                </Grid>
              </Grid>
            </Grid>
            <Grid className="hr"></Grid>
            <Grid xs={12} className="gridmrglft content-row">
              <Grid className="email_reply_theme_margin" xs={11}>
                <Grid>
                  <label className="black"> ★トピック</label>
                </Grid>
                <Grid className="hr"></Grid>
                <Controller
                  control={control}
                  name="email_subject"
                  defaultValue={
                    parsedObject == null
                      ? location.state.data?.subject
                      : parsedObject.subject
                  }
                  render={({ field }) => (
                    <input {...field} className="bdr_text_page_24th"></input>
                  )}
                />

                <Grid className="hr"></Grid>
              </Grid>
            </Grid>
            <Grid className="hr"></Grid>
            <Grid xs={12} className="gridmrglft content-row">
              <Grid className="email_reply_theme_margin" xs={11}>
                <Grid>
                  <label className="black">
                    {location.state.data?.type == "pc"
                      ? "★メール内容(PC)"
                      : "★メール内容(携帯）"}{" "}
                  </label>
                </Grid>
                <Grid className="hr"></Grid>
                <Controller
                  control={control}
                  name="email_text"
                  defaultValue={
                    parsedObject == null
                      ? location.state.data?.text
                      : parsedObject?.text
                  }
                  render={({ field }) => (
                    <textarea
                      {...field}
                      className="bdr_textarea_mailmag"
                      rows={40}
                      style={{ width: textareaWidth }}
                    ></textarea>
                  )}
                />
                <Grid className="hr"></Grid>
              </Grid>
            </Grid>
            <Grid className="hr"></Grid>
            <Grid xs={12} className="email_reply_theme_margin1 content-row">
              <label className="black">日付 </label>
              <Controller
                control={control}
                name={"date1"}
                render={({ field }) => (
                  <ReactDatePicker
                    className="bdr_text"
                    {...field}
                    ref={datePickerRef}
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              />
              <img
                className="bg_white cursor_pointer"
                src={calendericon}
                alt="calendar"
                width={14}
                height={14}
                onClick={handleButtonClick}
              />
            </Grid>
            <Grid className="hr"></Grid>
            <Grid xs={12} className="email_reply_theme_margin1 content-row">
              <label className="black">時間 </label>
              <Member_pen_selectBox
              isHr={true}
                name={"email_replay_hr"}
                control={control}
                defaultValue={location.state.data?.sendOutTime[3].toString().padStart(2,'0')}
              />
              <label className="black">時</label>
              <Member_pen_selectBox
                name={"email_replay_min"}
                control={control}
                defaultValue={location.state.data?.sendOutTime[4].toString().padStart(2,'0')}
                isHr={false}
              />
              <label className="black">分</label>
            </Grid>
            <Grid className="hr"></Grid>
            <Grid xs={12} className="email_reply_theme_margin1 content-row">
              <button
                className="email_reply_theme_button"
                onClick={() => onSubmit}
              >
                <img src={submitButton} />
              </button>
              <Button onClick={() => handleReset()}>
                <img src={resetButton} />
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmailReply_Theme;
