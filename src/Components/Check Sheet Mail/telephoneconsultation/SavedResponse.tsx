import { Grid ,Typography} from "@mui/material";
import React from "react";
import '../../BBS/MemberData/member.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import LeftPanChecksheet from "../LeftPanChecksheet";

interface LayoutProps{
    title1?:string;
}
/**
 * used to display saved response
 * @param param0 
 * @returns 
 */
const SavedresponseHeader = ({title1}:LayoutProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    let titleData:any;
    let actionData:any;
  if (location && location.state&& location.state.data&&location.state.action) {
    titleData = location.state.data
     actionData=location.state.action
  }
  return (
    <Grid container xs={12} padding={1} spacing={1}>
            <Grid item xs={3} spacing={2}>
                <LeftPanChecksheet />
            </Grid>
            <Grid item xs={9}>
            
      <Grid className="content-row">
        <Grid className="p2red_bg_left size"></Grid>
        <Grid className="p2red_bg_midle">
          <Grid className="top-header">
            <span className="verdana_big">A.電話相談の入力・閲覧・編集</span>
            <span className="verdana_big"></span>
          </Grid>
        </Grid>
        <Grid className="p2red_bg_right size"></Grid>
      </Grid>
    {actionData=='update'?
      <div className="mrg_top">
          <Grid className="middle_table"><Typography className="black"><b>データが保存されました</b></Typography></Grid>
          </div>:<div className="mrg_top">
          <Grid className="middle_table"><Typography className="red_font"><b>データが保存されました。</b></Typography></Grid>
          </div>}
      </Grid>
      </Grid>
    
  );
};

export default SavedresponseHeader;
