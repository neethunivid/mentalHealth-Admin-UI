import { Grid ,Typography} from "@mui/material";
import React from "react";
import LeftPanBBS from "../../Common/LeftPanBBS";
import '../MemberData/member.scss';
import { useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps{
    title1?:string;
}

const UpdateresponseHeader = ({title1}:LayoutProps) => {
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
                <LeftPanBBS />
            </Grid>
            <Grid item xs={9}>
        
    
      <Grid className="content-row">
        <Grid className="p2red_bg_left size"></Grid>
        <Grid className="p2red_bg_midle">
          <Grid className="top-header">
            <span className="verdana_big">{titleData} </span>
            <span className="verdana_big">入会・退会管理</span>
          </Grid>
        </Grid>
        <Grid className="p2red_bg_right size"></Grid>
      </Grid>
    {actionData=='update'?
      <div className="mrg_top">
          <Grid className="middle_table"><Typography className="black"><b>データを更新しました。</b></Typography></Grid>
          </div>:<div className="mrg_top">
          <Grid className="middle_table"><Typography className="red_font"><b>データを削除しました。</b></Typography></Grid>
          </div>}
      </Grid>
      </Grid>
    
  );
};

export default UpdateresponseHeader;
