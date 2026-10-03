import { Grid } from "@mui/material";
import React from "react";
interface LayoutProps {
  title: string;
  value: any;
  typeInput?: boolean;
  checkboxSize?:any
}

const PreviewRightRow = ({ title, value, typeInput,checkboxSize }: LayoutProps) => {
  return (
    <div>
      <Grid className="content-row">
        <Grid className="black" item xs={3} paddingBottom={0.5}>
          <span style={{ width: "42%" }}>{title}</span>
        </Grid>
        <Grid item xs={9}>
          {typeInput == true ? (
            <textarea  className="bdr_text3"   style={{ height: checkboxSize * 20 + "px" }}   rows={checkboxSize}  value={value} />
          ) : (
            <input value={value} type="text" className="bdr_text3" />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default PreviewRightRow;
