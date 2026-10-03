import { Grid } from "@mui/material";
import React from "react";
import {  Controller } from "react-hook-form";
import { useRef, useEffect, useState } from "react";

interface LayoutProps {
  title?: string;
  value?:any;
  control?:any;
  name?:any;
  defaultvalue?:any
}

const BookViewLeftRow = ({ title,name,control,defaultvalue}: LayoutProps) => {
 
  return (
 
      <Grid className="content-row" >
        <Grid className="black" item xs={5} paddingBottom={0.5}>
          <span>{title}</span>
        </Grid>
        <Grid className="" item xs={7} >
         <Controller
          name={name} // This is the name of the field in the form data
          control={control}
          defaultValue={defaultvalue} // Set your default value here
          render={({ field }) => (
            <input
              {...field}
              type="text"
             value={field.value}
              readOnly={false} 
            />
          )}
        />
        
        </Grid>
      </Grid>
 
  );
};

export default BookViewLeftRow;
