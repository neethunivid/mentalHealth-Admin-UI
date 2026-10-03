import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import LeftPanBBS from "../../../Common/LeftPanBBS";
import { useNavigate, useLocation } from "react-router-dom";
import ButtonLeft from "../../../../assets/images/btna1.gif";
import ButtonRight from "../../../../assets/images/btn_back_new.gif";
import apiClient from "../../../../API/API-client";
import ListMailMagThemeHeader from "./componets/ListMailMagThemeHeader";

const ListMailMagPreview = () => {

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //to previous screen
  const handleBackButtonClick=()=>{
    window.history.back();
  }

//calls the update api here
 const handleUpdateButtonClick=()=>{
    themeUpdateApi();
 }

// function to call update api
  const themeUpdateApi = async () => {
    const dataRequest = {
      mailMagJobId:  location.state.data.mailMagJobId,
      subject: location.state.data.subject,
      text:location.state.data.text,
      sendOutTime: location.state.data.sendOutTime,
      type: location.state.data.type,
      date: location.state.data.date,
      sendStatus: 0,
      status: 0,
    };
    try { 
      const apiData=await apiClient.put(`api/mailmag/magThemeUpdate/${location.state.data.id}`,dataRequest,{})
      if(apiData){
        //clear from session Storage
        sessionStorage.removeItem("mailmagazineTheme");
        //navigate to list mail magazine by theme home screen
          window.location.href = '/mailmagazinetheme';
      }

    } catch (error) {
    alert(error);
    }
  };
  return (
    <Grid container xs={12} spacing={1} padding={1}>
      <Grid item xs={3} spacing={2}>
        <LeftPanBBS />
      </Grid>
      <Grid item xs={9}>
        <ListMailMagThemeHeader label1="   D.メルマガ会員へのメール送信（修正）" label2="メルマガ管理"/>
     
        <Grid className="hr"></Grid>
        <Grid className="hr"></Grid>
        <Grid className="content-row gridmrglft">
          <Grid item xs={1}></Grid>
          <Grid item xs={11}>
            <Grid className="hr" />
            <Grid className="content-row">
              <Grid xs={11}>
              {/* ★トピック */}
                <Grid className="black">Topic</Grid>
                <Grid className="hr" />
                <Grid className="black">{location.state.data.topicName}</Grid>
                <Grid className="hr"></Grid>
              </Grid>
              <Grid xs={1} container spacing={1}>
                <Grid
                  item
                  className={
                    location.state.data?.device == "pc"
                      ? "Active_btnmailmag"
                      : "Inactive_btnmailmag"
                  }
                >
                  PC
                </Grid>
                <Grid
                  item
                  className={
                    location.state.data?.device == "sp"
                      ? "Active_btnmailmag"
                      : "Inactive_btnmailmag"
                  }
                >
                  携帯
                </Grid>
              </Grid>
            </Grid>
            <Grid className="black">★タイトル</Grid>
            <Grid className="hr" />
            <Grid className="black">
              <span style={{ whiteSpace: "pre-wrap" }}>
                {location.state.data?.subject}
              </span>
            </Grid>
            <Grid className="tpspc_1" />
            <Grid className="black">{location.state.data.type=='pc'?"★メール内容(PC)":"	★メール内容(携帯）"}</Grid>
            <Grid className="black">
              <span style={{ whiteSpace: "pre-wrap" }}>{location.state.data?.text}</span>
            </Grid>
            <Grid className="tpspc_1" />
            {/* 日付と時間 */}
            <Grid className="black"> Date & Time</Grid>
            <Grid className="black">
              <span style={{ whiteSpace: "pre-wrap" }}>
                {location.state.data?.sendOutTime}
              </span>
            </Grid>
            <Grid className="hr" />
            <Grid className="content-row">
            <Button type="submit" onClick={()=>handleUpdateButtonClick()}>
                  <img src={ButtonLeft} />
                </Button>
                <Button onClick={()=>handleBackButtonClick()}>
                  <img src={ButtonRight} />
                </Button>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ListMailMagPreview;
