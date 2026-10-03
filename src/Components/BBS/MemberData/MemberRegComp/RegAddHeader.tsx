import { Grid } from "@mui/material";
import React from "react";

const RegAddHeader = () => {
  return (
    <div>

      <Grid className="content-row">
        <Grid className="p2red_bg_left size"></Grid>
        <Grid className="p2red_bg_midle">
          <Grid className="top-header">
            <span className="verdana_big">C.新規会員の追加（入力画面）</span>
            <span className="verdana_big">会員DB管理</span>
          </Grid>
        </Grid>
        <Grid className="p2red_bg_right size"></Grid>
      </Grid>
    </div>
  );
};

export default RegAddHeader;
