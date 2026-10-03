import { Grid } from "@mui/material";
import React from "react";

const MemberMoDelDetailHeader = () => {
  return (
    <div style={{ display: "flex" }}>
      <Grid xs={6} className="p6red_bg_midle">
        <span className="verdana_big">B.</span>
        <span className="verdana_big">発言内容の検索・修正・削除 </span>
      </Grid>
      <Grid xs={6} className="p6red_bg_midle">
        <span className="black">
          下記の発言内容を処理（修正又は削除）して下さい。
        </span>
      </Grid>
    </div>
  );
};

export default MemberMoDelDetailHeader;
