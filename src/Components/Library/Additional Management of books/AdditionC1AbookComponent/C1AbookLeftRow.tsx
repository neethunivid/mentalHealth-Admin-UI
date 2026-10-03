import { Grid } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import {
  useForm,
  Controller,
  UseFormSetFocus,
  UseFormSetValue,
} from "react-hook-form";
import InputText from "../../../Common/Inputs/InputText";

interface LayoutProps {
  title?: string;
  value?: any;
  control?: any;
  name?: any;
  error?: any;
  setValue?:any;
}

const C1AbookLeftRow = ({ title, name, control, error,value,setValue }: LayoutProps) => {

  return (
    <Grid className="content-row">
      <Grid className="black" item xs={5} paddingBottom={0.5}>
        <span>{title}</span>
      </Grid>
      <Grid className="" item xs={7}>
        <InputText
        defaultValue={value}
        control={control}
        name={name}
        className='bdr_text4'
        error={error}
        type={'text'}
        setValue={setValue}
        />
        {/* <Controller
          // defaultValue={}
          control={control}
          name={name}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="bdr_text4"
              ref={(el) => {
                inputRef.current = el;
                field.ref(el);
              }}
            />
          )}
        /> */}
      </Grid>
    </Grid>
  );
};

export default C1AbookLeftRow;
