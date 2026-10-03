import { Grid } from "@mui/material";
import React from "react";

const RemarkAwait_header = () => {
  return (
    <div>
      <Grid className="content-row">
        <Grid className="p2red_bg_left size"></Grid>
        <Grid className="p2red_bg_midle">
          <Grid className="top-header">
            <span className="verdana_big">A.審査待ちの発言内容</span>
            <span className="verdana_big"> 会員モニター管理</span>
          </Grid>
        </Grid>
        <Grid className="p2red_bg_right size"></Grid>
      </Grid>
    </div>
  );
};

export default RemarkAwait_header;
