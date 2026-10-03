import { Grid } from "@mui/material";
import React from "react";

export const SearchMoDelHeader = () => {
  return (
    <div>
      <Grid className="content-row">
        <Grid className="p2red_bg_left size"></Grid>
        <Grid className="p2red_bg_midle">
          <Grid className="top-header">
            <span className="verdana_big">B.発言内容の検索・修正・削除</span>
            <span className="verdana_big">会員モニター管理</span>
          </Grid>
        </Grid>
        <Grid className="p2red_bg_right size"></Grid>
      </Grid>
    </div>
  );
};
