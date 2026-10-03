import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@mui/material';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import LeftPanBBS from '../../../Common/LeftPanBBS';
import back from '../../../../assets/images/btn_back_new.gif';
import submit from '../../../../assets/images/btna1.gif';
import '../../../../assets/css/health.css';
import apiClient from "../../../../API/API-client";
import { useSelector, useDispatch } from "react-redux";
import { setMemberReg } from "../../../../Redux/actions";

const SendMailGeneralPreview = () => {
  let dataRequest: any;
  const location = useLocation();
  const [type, setType] = useState("");
  //the useSelector hook to extract the memberData  from the Redux state 
  const memberData: any = useSelector((state: any) => state.memberData);
  const formattedData = memberData?.sendmailgeneral?.content?.replace(/\/n\/r/g, '\n\r');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
     /*when browser refresh or when back from preview screen
     condition to get redux stored values get here and setValue in each fields */
    const localStorageData1 = sessionStorage.getItem("sendmailgeneral");
    if (localStorageData1) {
      const parsedObject: any = JSON.parse(localStorageData1);
      dispatch(setMemberReg("sendmailgeneral", parsedObject));
      setType(parsedObject?.type)
    }
  }, []);

  //api call to save the data
  const handleUpdateButtonClick = async () => {
    try {

      if (memberData?.sendmailgeneral?.type == "PC") {
        dataRequest = {
          "type": 1,
          "title": memberData?.sendmailgeneral?.title,
          "text": memberData?.sendmailgeneral?.content,
          "textMob": "",
          "non": 1,
          "sendstatus": 0
        }
      } else {
        dataRequest = {
          "type": 2,
          "title": memberData?.sendmailgeneral?.title,
          "text": "",
          "textMob": memberData?.sendmailgeneral?.content,
          "non": 1,
          "sendstatus": 0
        }
      }
      const apiData = await apiClient.post(
        "api/mailmag/register",
        dataRequest,
        {}
      );
      if (apiData) {
        dispatch(setMemberReg('sendmailgeneral',''));
        navigate('/sendmailtogeneral', {state: {data: apiData.data.data.id,title: apiData.data.data.title}})
      }

    } catch (error: any) {
    
      console.error("Error:", error);
    }
  };

  //handling the back button
  const handleBackButtonClick = () => {
    navigate('/sendmailmaggeneral', 
    { state: { data: memberData?.sendmailgeneral?.type  } })
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
                <span className="verdana_big">F.メルマガ発信（一般)</span>
                <span className="verdana_big">メルマガ管理</span>
              </Grid>
            </Grid>
            <Grid className="p2red_bg_right size"></Grid>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid >
            <Grid xs={12} container className="content_margintop">
              <Grid xs={2}></Grid>
              <Grid xs={9}>
                <span className="black">	★タイトル</span>
                <Grid className="black">{memberData?.sendmailgeneral?.title}</Grid>
              </Grid>
              <Grid xs={1} container spacing={1}>
                <Grid item className={memberData?.sendmailgeneral?.type == 'PC' ? "Active_btnmailmag" : "Inactive_btnmailmag"}
                >
                  PC
                </Grid>
                <Grid item className={memberData?.sendmailgeneral?.type == 'SP' ? "Active_btnmailmag" : "Inactive_btnmailmag"}
                >
                  携帯
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} container className="content_margintop">
              <Grid xs={2}></Grid>
              <Grid xs={6}>
                <span className="black">{memberData?.sendmailgeneral?.type == "PC" ? `★メール内容(PC)` : `★メール内容(携帯）`}</span>
                <Grid className="black"> <span >{formattedData}</span>
                  {/* <span className="black">{mailcontent?.text}</span> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} container className="content_margintop">
              <Grid xs={2}></Grid>
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
  );
}

export default SendMailGeneralPreview;
