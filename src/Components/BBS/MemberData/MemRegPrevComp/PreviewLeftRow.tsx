import { Grid } from "@mui/material";
import React from "react";

interface LayoutProps {
  title: string;
  value:any;
}

const PreviewLeftRow = ({ title,value }: LayoutProps) => {
  return (
 
      <Grid className="content-row" >
        <Grid className="black" item xs={7} paddingBottom={0.5}>
          <span>{title}</span>
        </Grid>
        <Grid  item xs={5} >
          <input  readOnly={true} value={value} type="text" className="bdr_text" />
        </Grid>
      </Grid>
 
  );
};

export default PreviewLeftRow;
