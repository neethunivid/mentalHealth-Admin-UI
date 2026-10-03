import { Grid } from "@mui/material";
import React from "react";

interface LayoutProps {
  label1: string;
  label2: string;
  label3: string;
}

const LibraryHeader = ({ label1, label2, label3 }: LayoutProps) => {
  return (
    <div>
      <Grid className="content-row">
        <Grid className="p2red_bg_left"></Grid>
        <Grid className="p2red_bg_midle">
          <Grid className="top-header">
            <div>
              <span className="verdana_big">{label1}</span>
              <span className="black">{label2}</span>
            </div>
            <span className="verdana_big">{label3}</span>
          </Grid>
        </Grid>
        <Grid className="p2red_bg_right"></Grid>
      </Grid>
    </div>
  );
};

export default LibraryHeader;
