import { Grid } from "@mui/material";
import React from "react";
interface LayoutProps{
    title1:string;
    title2:string;
}

const MailMagazineMemberlistHeader = ({title1,title2}:LayoutProps) => {
  return (
    <div>
      <Grid className="content-row">
        <Grid className="p2red_bg_left size"></Grid>
        <Grid className="p2red_bg_midle">
          <Grid className="top-header">
            <span className="verdana_big">{title1} </span>
            <span className="verdana_big">{title2}</span>
          </Grid>
        </Grid>
        <Grid className="p2red_bg_right size"></Grid>
      </Grid>
    </div>
  );
};

export default MailMagazineMemberlistHeader;
