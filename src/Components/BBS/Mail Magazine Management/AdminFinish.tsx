import { Grid } from "@mui/material";
import React from "react";
import LeftPanBBS from "../../Common/LeftPanBBS";

const AdminFinish = () => {
  return (
    <Grid container xs={12} spacing={2}>
      <Grid item xs={3}>
        <Grid className="hr"></Grid>
        <LeftPanBBS />
      </Grid>
      <Grid item xs={9}>
        <Grid className="hr"></Grid>
        <Grid className="content-row">
          <Grid className="p2red_bg_left size"></Grid>
          <Grid className="p2red_bg_midle">
            <Grid className="top-header">
              <span className="verdana_big">管理者設定</span>
            </Grid>
          </Grid>
          <Grid className="p2red_bg_right size"></Grid>
        </Grid>
        <Grid className="hr"></Grid>
        <Grid className="hr"></Grid>
        <Grid className="middle_table">
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <label className="black" style={{ color: "red" }}>
            管理者設定を更新しました。
          </label>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
          <Grid className="hr"></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminFinish;
