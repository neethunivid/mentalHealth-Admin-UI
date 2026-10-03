import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMemberReg } from "../../../Redux/actions";
import LeftPanChecksheet from "../LeftPanChecksheet";
import CheckSheetHeader from "../Common/CheckSheetHeader";
import apiClient from "../../../API/API-client";

const MoritaEmailPreview = () => {
  const [type, setType]= useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mailcontent: any = useSelector((state: any) => state.memberData?.emailcontent);
  
  useEffect(() => {
    const localStorageData1 = sessionStorage.getItem("emailcontent");
    if (localStorageData1) {
      const parsedObject: any = JSON.parse(localStorageData1);
      dispatch(setMemberReg("emailcontent", parsedObject));
     setType(parsedObject?.type)
    }
  }, []);

  const handleBackButtonClick = () => {

    navigate('/checksheet-create', { state: {selectedOption: mailcontent?.type ,checkSheetType:{id:mailcontent.checksheetId}} })
  }
  const handleUpdateButtonClick = () => {
    createReply()
  };
  const createReply=async()=>{
    try {
       const req = {
              "checkSheetType":mailcontent.checksheetId,
              "title": mailcontent.checksheet_title,
              "content": mailcontent.template_content,
              "magMailSubject": mailcontent.template_subject,
              "mail_type": mailcontent.type=="PC"?2:1
          }

      const apiData = await apiClient.post("api/checksheetmail/createReply", req, {});
      if (apiData) {
        
        navigate('/checksheetsendmail',{state:{diagonseMagId:apiData?.data?.data?.id}})
      }

  } catch (error: any) {
      // Handle errors if necessary
      console.error("API Error:", error);
  }
  }
  
  return (
    <div>
      <Grid container xs={12} padding={1} spacing={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanChecksheet />
        </Grid>
        <Grid item xs={9}>
          <CheckSheetHeader label="メール作成と送信（プレビュー）" />
          <Grid className="hr"></Grid>
          <Grid >
          <Grid xs={12} container className="content_margintop">
              <Grid xs={1}></Grid>
              <Grid xs={6}>
              <span className="black">	＜メルマガ・タイトル＞</span>
                <Grid className="hr"></Grid>
                <Grid className="black"> <span style={{ whiteSpace: 'pre-wrap' }} >{mailcontent?.checksheet_title}</span>
                 
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} container className="content_margintop">
              <Grid xs={1}></Grid>
              <Grid xs={9}>
                <span className="black">	タイトル名</span>
                <Grid className="hr"></Grid>
                <Grid className="black"> <span className="black">{mailcontent?.template_subject}</span></Grid>
              </Grid>
              <Grid xs={1} container spacing={1}>
                <Grid item className={type == 'PC' ? "Active_btnmailmag" : "Inactive_btnmailmag"}
                >
                  PC |
                </Grid>
                <Grid item className={type == 'SP' ? "Active_btnmailmag" : "Inactive_btnmailmag"}
                >
                  SP
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} container className="content_margintop">
              <Grid xs={1}></Grid>
              <Grid xs={6}>
                <span className="black">{type == "PC" ? `	タイトル名 (PC)` : `タイトル名(SP)`}</span>
                <Grid className="hr"></Grid>
                <Grid className="black"> <span style={{ whiteSpace: 'pre-wrap' }} >{}</span>
                  <span className="black">{mailcontent?.template_content}</span>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} container className="response-temp-margintop">
              <Grid xs={1}></Grid>
              <Grid xs={10}>
                <button   type="submit" className="btnstyle" onClick={() => handleUpdateButtonClick()}>
                予約
                </button>
                <button    className="btnstyle btnmrglft" onClick={() => handleBackButtonClick()}>
                戻る
                </button>
                <Grid></Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </div>
  )
}
export default MoritaEmailPreview