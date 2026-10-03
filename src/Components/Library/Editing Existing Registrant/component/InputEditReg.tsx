import { Grid } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
interface LayoutProps {
  control: any;
  defaultValue: any;
  name: string;
}
const InputEditReg = ({ control, defaultValue, name }: LayoutProps) => {
  return (
    <Grid>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field }) => (
          <input {...field} type="text" className="bdr_text12" />
        )}
      />
    </Grid>
  );
};

export default InputEditReg;
