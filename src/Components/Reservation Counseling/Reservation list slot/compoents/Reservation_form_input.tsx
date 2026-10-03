import { Grid } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import InputText from "../../../Common/Inputs/InputText";
interface LayoutProps {
  label1: string;
  label2: string;
  classNameInput: string;
  control: any;
  name: string;
  inpuEx?: boolean;
  error?: any;
  defaultValue: any;
  disabled?: boolean;
  isPhone?:boolean;
}
const Reservation_form_input = ({
  label1,
  label2,
  classNameInput,
  control,
  name,
  inpuEx,
  error,
  defaultValue,
  disabled,
  isPhone
}: any) => {

  return (
    <Grid xs={12} className="content-row">
      <Grid xs={5} className="content-row">
        <Grid className="reservation_form_padding ">
          <label className="black">{label1}</label>
        </Grid>
      </Grid>
      <Grid xs={9}>
        {disabled ? (
          <input disabled type="text" className={classNameInput} value={defaultValue}></input>
        ) : (
          <InputText
          control={control}
          defaultValue={defaultValue}
          name={name}
          error={error}
          className={classNameInput}
          type={"text"}
          maxLength={isPhone?12:undefined}
          />
          // <Controller
          //   control={control}
          //   defaultValue={defaultValue}
          //   name={name}
            
          //   render={({ field }) => (
          //     <input
          //       {...field}
          //       ref={(el) => {
          //         inputRef.current = el;
          //         field.ref(el);
          //       }}
          //       maxLength={isPhone?12:undefined}
          //       className={classNameInput}
          //       type="text"
          //     />
          //   )}
          // />
        )}

        <label className="black reservation_form_font16">
          {inpuEx ? label2 : ""}
        </label>
      </Grid>
    </Grid>
  );
};

export default Reservation_form_input;
