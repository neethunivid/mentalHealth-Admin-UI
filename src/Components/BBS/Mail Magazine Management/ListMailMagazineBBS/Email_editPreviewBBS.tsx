import {Button, Grid } from "@mui/material";
import LeftPanBBS from "../../../Common/LeftPanBBS";
import ButtonLeft from '../../../../assets/images/btn_submit_new.gif';
import ButtonRight from '../../../../assets/images/btn_back_new.gif';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import ApiClient from "../../../../API/API-client";
const EmailEdit_BBS = () => {
  let dataRequest:any;
  const navigate = useNavigate();
  //to get the data from redux from submit page
  const bbsmailcontent: any = useSelector((state: any) => state.memberData?.bbsmailcontent);
 // replace with the newline and carriage return characters.
  const formattedData = bbsmailcontent?.text.replace(/\/n\/r/g, '\n\r');
 
//buttonclick to update emailcontent
  const handleUpdateButtonClick = () => {
    updateEmailContent();
  
  };
  //update the email text and content
  const updateEmailContent=async()=>{
    try {
      if(bbsmailcontent?.type=='PC'){
         dataRequest={
            text:bbsmailcontent?.text,
            title:bbsmailcontent?.title
        };
      }else{
         dataRequest={
          textMob:bbsmailcontent?.text,
          title:bbsmailcontent?.title
      };
      }
        const apiData = await ApiClient.put("api/mailmag/updatemail/"+(bbsmailcontent?.id), dataRequest, {});
        if(apiData){
          sessionStorage.removeItem("bbsmailcontent");
          window.location.href = '/listmailmagazinebbs';
        }
      
    } catch (error: any) {
        if (error.response && error.response.status === 400) {

            alert(error.response.data.error);
            console.error(error.response.data);
        } else {

            console.error("Error:", error);
        }
    }
  }
  //navigates back to edit page
  const handleBackButtonClick=()=>{
    window.history.back();
  }

   return (
    
      <Grid container xs={12} spacing={1} padding={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanBBS />
        </Grid>
        <Grid item xs={9}>
          <Grid className="content-row">
            <Grid className="p2red_bg_left size"></Grid>
            <Grid className="p2red_bg_midle">
              <Grid className="top-header">
                <span className="verdana_big">D.メルマガ会員へのメール送信（修正）</span>
                <span className="verdana_big">メルマガ管理</span>
 
              </Grid>
            </Grid>
            <Grid className="p2red_bg_right size"></Grid>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
            <Grid className="content-row">
              <Grid item xs={1}>
              </Grid>
              <Grid item xs={11} className="gridmrglft">
                <Grid className="hr"/>
                <Grid className="content-row">
                <Grid xs={11}>
                <Grid className="black">★タイトル</Grid>
                <Grid className="hr"/>
                <Grid className="black">{bbsmailcontent?.title}</Grid></Grid>
                <Grid xs={1} container spacing={1}>
                <Grid item className={bbsmailcontent?.type=='PC' ? "Active_btnmailmag" : "Inactive_btnmailmag"}
                      >
                        PC
                      </Grid>
                      <Grid item className={bbsmailcontent?.type=='SP'? "Active_btnmailmag" : "Inactive_btnmailmag"}
                      >
                       携帯
                      </Grid>
                    </Grid></Grid>
                <Grid className="tpspc_1"/>
                <Grid className="black">{bbsmailcontent?.type=='PC'?"★メール内容(PC)":"★メール内容(携帯)"}</Grid>
                <Grid className="hr"/>
                <Grid className="black"><span style={{whiteSpace:'pre-wrap'}}>{formattedData}</span></Grid>
                <Grid className="tpspc_1"/>
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
export default EmailEdit_BBS;
