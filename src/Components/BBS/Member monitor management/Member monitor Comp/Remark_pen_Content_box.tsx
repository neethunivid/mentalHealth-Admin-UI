import { Grid, Typography } from "@mui/material";
import React from "react";

interface LayoutProps {
  reviewData: any;
}



const Remark_pen_Content_box = ({ reviewData }: any) => {
  const memberId=sessionStorage.getItem('memberId');
  return (
    <div>
      <Grid className="text_grid">
        <Grid xs={2} className="bdr_white_right itemgrid">
          <Typography className="white">
            <strong> 項目</strong>
          </Typography>
        </Grid>
        <Grid xs={10} className="bdr_white_right itemgrid">
          <Typography className="white">
            <strong>返信フォーム</strong>
          </Typography>
        </Grid>
      </Grid>
      <Grid className="bg_grey greytopbtm1 text_grid">
        <Grid xs={2}>
          <li className="blacktxt">ID</li>
        </Grid>
        <Grid xs={10}>
          <label className="blacktxt">{memberId}</label>
        </Grid>
      </Grid>
    </div>
  );
};

export default Remark_pen_Content_box;
