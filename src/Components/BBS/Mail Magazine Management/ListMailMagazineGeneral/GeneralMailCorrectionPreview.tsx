import { Box, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import submit from "../../../../assets/images/btn_submit_new.gif";
import back from "../../../../assets/images/btn_back_new.gif";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMemberReg } from "../../../../Redux/actions";
import LeftPanBBS from "../../../Common/LeftPanBBS";
import ApiClient from "../../../../API/API-client";

const GeneralMailCorrectionPreview = () => {
  const [type, setType]= useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //the useSelector hook to extract the mailcontentgeneral data from the Redux state
  const mailcontent: any = useSelector((state: any) => state.memberData?.mailcontentgeneral);
  const formattedData = mailcontent?.text?.replace(/\/n\/r/g, '\n\r');
  const handleUpdateButtonClick = () => {
    updateEmailContent();

  };

  //save the data using api call
  const updateEmailContent = async () => {
    let dataRequest:any
    try {
      if(mailcontent?.type=="PC"){
        dataRequest= {
          text: mailcontent?.text,
          title: mailcontent?.title
        };
      }else{
        dataRequest= {
          textMob: mailcontent?.text,
          title: mailcontent?.title
        };
      }
     
      const apiData = await ApiClient.put("api/mailmag/updatemail/" + (mailcontent.id), dataRequest, {});
      if (apiData) {
        sessionStorage.removeItem("mailcontentgeneral")
        navigate('/listmailmagazinegeneral');
      }

    } catch (error: any) {
     console.error("Error:",error)
    }
  }

  //handle back button
  const handleBackButtonClick = () => {
    window.history.back();
  }
  
  return (
    <div>
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanBBS />
        </Grid>
        <Grid item xs={9}>
          <Grid className="content-row">
            <Grid className="p2red_bg_left size"></Grid>
            <Grid className="p2red_bg_midle">
              <Grid className="top-header">
                <span className="verdana_big">D.メルマガ会員へのメール送信（修正）</span>
              </Grid>
            </Grid>
            <Grid className="p2red_bg_right size"></Grid>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid >
            <Grid xs={12} container className="content_margintop">
              <Grid xs={1}></Grid>
              <Grid xs={9}>
                <span className="black">	★タイトル</span>
                <Grid className="hr"></Grid>
                <Grid className="black">{mailcontent?.title}</Grid>
              </Grid>
              <Grid xs={1} container spacing={1}>
                <Grid item className=
                {mailcontent?.type=='PC' ? "Active_btnmailmag" : "Inactive_btnmailmag"}
                >
                  PC
                </Grid>
                <Grid item className=
                {mailcontent?.type=='SP' ? "Active_btnmailmag" : "Inactive_btnmailmag"}
                >
                  携帯
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} container className="content_margintop">
              <Grid xs={1}></Grid>
              <Grid xs={6}>
                <span className="black">{mailcontent?.type == "PC" ? `★メール内容(PC)` : `★メール内容(携帯）`}</span>
                <Grid className="hr"></Grid>
                <Grid className="black"> <span style={{ whiteSpace: 'pre-wrap' }} >{formattedData}</span>
                 
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} container className="margintop">
              <Grid xs={1}></Grid>
              <Grid xs={10}>
                <Button type="submit" onClick={() => handleUpdateButtonClick()}>
                  <img src={submit} />
                </Button>
                <Button onClick={() => handleBackButtonClick()}>
                  <img src={back} />
                </Button>
                <Grid></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </div>
  )
}
export default GeneralMailCorrectionPreview