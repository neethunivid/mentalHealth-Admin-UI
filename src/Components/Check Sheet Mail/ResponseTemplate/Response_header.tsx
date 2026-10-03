import { Grid } from "@mui/material";
import React from "react";

interface LayoutProps {
  title: any;
}

const Response_header = ({ title }: LayoutProps) => {
  return (
    <div>
      <Grid className="content-row">
        <Grid className="p2red_bg_left size"></Grid>
        <Grid className="p2red_bg_midle">
          <Grid className="top-header"></Grid>
          <span className="verdana_big">{title}</span>
        </Grid>
        <Grid className="p2red_bg_right size"></Grid>
      </Grid>
      
    </div>
  );
};

export default Response_header;
