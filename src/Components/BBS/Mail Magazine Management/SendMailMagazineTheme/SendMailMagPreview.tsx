import { Button, Grid} from "@mui/material";
import React, { useState ,useEffect} from "react";
import { useForm} from "react-hook-form";
import LeftPanBBS from "../../../Common/LeftPanBBS";
import ButtonLeft from '../../../../assets/images/btna1.gif';
import ButtonRight from '../../../../assets/images/btn_back_new.gif';
import { useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import ApiClient from "../../../../API/API-client";
import { setMemberReg } from "../../../../Redux/actions";
const SendmailmagPreviewtheme = () => {
  
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();
  
  
  const dispatch = useDispatch();
  //getting data from redux store
  const sendThemeData: any = useSelector(
    (state: any) => state?.memberData?.sendmailtheme
  );

let type:any;
type=sendThemeData?.type;
useEffect(() => {
  //to store and retrive data during the refresh or reload 
   const localStorageData1 = sessionStorage.getItem("sendmailtheme");
   if (localStorageData1) {
    const parsedObject: any = JSON.parse(localStorageData1);
   dispatch(setMemberReg("sendmailtheme", parsedObject));
   setSelectedOption(parsedObject?.type)
 }
}, []);
 //email theme create api
  const  CreateEmailthemeContent=async()=>{
  //   const formattedDate:any = sendThemeData?.date1
  // ? sendThemeData?.date1.toISOString().split('T')[0]
  const dateObj = sendThemeData?.date1 instanceof Date ? sendThemeData?.date1 : new Date(sendThemeData?.date1);
  // : '';
  const formattedDate = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;

  const formattedDateTime = `${formattedDate}T${sendThemeData?.email_replay_hr}:${sendThemeData?.email_replay_min}:00`;
    try {
        const dataRequest: any = {
          mailMagJobId:sendThemeData?.topics,
          subject:sendThemeData?.title,
          text:sendThemeData?.text,
          sendOutTime:formattedDateTime??"",
          type:sendThemeData?.type=="pc"?"pc":"sp",
          date:formattedDate??"",
          sendStatus:0,
          status:0
      
        };
        const apiData = await ApiClient.post("api/mailmag/magThemeCreate", dataRequest, {});
        if(apiData){
          dispatch(setMemberReg('sendmailtheme',''));
            navigate ('/mailmagazinetheme');
        }
      
    } catch (error: any) {
       console.error("Error",error)
    }
  }
  //navigate to sendmailmagtheme page by passing type as state
  const handleBackButtonClick=()=>{
    navigate('/sendmailmagtheme', { state: { data: type  } })
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
                <span className="verdana_big">J.テーマ別メルマガ発信</span>
                <span className="verdana_big">メルマガ管理</span>
 
              </Grid>
            </Grid>
            <Grid className="p2red_bg_right size"></Grid>
          </Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
            <Grid className="content-row gridmrglft">
              <Grid item xs={1}>
              </Grid>
              <Grid item xs={11}>
                <Grid className="hr"/>
                <Grid className="content-row">
                <Grid xs={11}>
                <Grid className="black">★トピック</Grid>
                <Grid className="hr"/>
                <Grid className="black">{sendThemeData?.topicName}</Grid></Grid>
                <Grid xs={1} container spacing={1}>
                <Grid item className={sendThemeData?.type=='pc' ? "Active_btnmailmag" : "Inactive_btnmailmag"}
                      >
                        PC
                      </Grid>
                      <Grid item className={sendThemeData?.type=='sp'? "Active_btnmailmag" : "Inactive_btnmailmag"}
                      >
                       携帯
                      </Grid>
                    </Grid>
                    </Grid>
                {/* <Grid className="tpspc_1"/> */}
                <Grid className="black">★タイトル</Grid>
                <Grid className="hr"/>
                <Grid className="black"><span style={{whiteSpace:'pre-wrap'}}>{sendThemeData?.title}</span></Grid>
                <Grid className="tpspc_1"/>
                <Grid className="black">{type=="pc"?"★メール内容(PC)":"★メール内容(携帯）"}</Grid>
                <Grid className="black"><span style={{whiteSpace:'pre-wrap'}}>{sendThemeData?.text}</span></Grid>
                <Grid className="tpspc_1"/>
                <Grid className="black"> 日付と時間</Grid>
                <Grid className="black"><span style={{whiteSpace:'pre-wrap'}}>{sendThemeData?.formattedTimestamp}</span></Grid>
                <Grid className="hr"/>
                <Grid className="content-row">
                <Button type="button" onClick={CreateEmailthemeContent}>
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
export default SendmailmagPreviewtheme;
