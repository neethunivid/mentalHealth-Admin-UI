import { Box, Button, Grid,Typography } from "@mui/material";
import LeftPanChecksheet from "../LeftPanChecksheet";
import "../../Check Sheet Mail/check.scss";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"


const ReserveListmailPreview = () => {
  const dispatch = useDispatch();
  //getting values from the redux store
  const sendmailData: any = useSelector(
    (state: any) => state?.memberData?.mailEditdata
  );
  const navigate = useNavigate();
  //fuctioncall in the on submit buttton
  const handleSubmitnext = () => {
    navigate('/checksheetEmailedit')
   
  };
  //function call in the backbutton
  const handleBackButtonClick = () => {
    window.history.back();
  }

  return (
    
      <Grid container xs={12} spacing={1} padding={1}>
        <Grid item xs={3} spacing={2}>
          <LeftPanChecksheet />
        </Grid>
        <Grid item xs={9}>
          <Grid className="content-row">
            <Grid className="p2red_bg_left size"></Grid>
            <Grid className="p2red_bg_midle">
              
                <span className="black">メール作成と送信（プレビュー）</span>
            
            </Grid>
            <Grid className="p2red_bg_right size"></Grid>
          </Grid>
          <Grid className="hr"></Grid>
            <Grid className="content-row">
              <Grid item xs={1}>
              </Grid>
              <Grid item xs={11} className="gridmrglft">
                <label className="black"><b>＜メルマガ・タイトル＞</b></label>
                <Grid className="hr"/>
                <Grid className="black">{sendmailData?.mailMagsub}</Grid>
                <Grid className="hr"/>
                <Grid className="content-row">
                <Grid xs={11}>
                <Grid className="black"><b>タイトル名</b></Grid>
                <Grid className="hr"/>
                <Grid className="black">{sendmailData?.title}</Grid></Grid>
                <Grid xs={1} container spacing={1}>
                <Grid
                        item
                        style={{
                          color: sendmailData?.device === "PC"? "red" : "black",
                          cursor: "pointer",
                        }}
                      >
                        PC 
                      </Grid>
                      <Grid
                        item
                        style={{
                          color: sendmailData?.device==="SP"? "red" : "black",
                          cursor: "pointer",
                        }}
                      >
                        SP
                      </Grid>
                    </Grid></Grid>
                <Grid className="tpspc_1"/>
                <Grid className="black"><b>タイトル名 (PC)</b></Grid>
                <Grid className="hr"/>
                <Grid className="black">{sendmailData?.content}</Grid>
                <Grid className="tpspc_1"/>
                <Grid className="content-row">
                    <button type="button" onClick={handleSubmitnext} className="lftbtn_style">
                    予約
                    </button>
                    <button type='button'onClick={handleBackButtonClick} className="lftbtn_style btnmrglft ">
                    戻る
                    </button>
                  </Grid>



              </Grid>
              </Grid>
          </Grid>
          </Grid>
    
  );
};
export default ReserveListmailPreview;
