import { Grid } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRef, useEffect } from "react";
interface LayoutProps {
  firstRowHeading: string;
  control: any;
  name: string;
  name1: string;
  span: boolean;
  defaultValue: any;
  defaultValue1: any;
  error?: any;
  radioTitle1:string;
  radioTitle2:string;
  
}

const RegRadioIn = ({
  firstRowHeading,
  control,
  name,
  name1,
  span,
  defaultValue,
  defaultValue1,
  error,
  radioTitle1,
  radioTitle2
}: LayoutProps) => {
  const { setValue } = useForm();
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {

    if (error && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [error]);
  return (
    <div>
    <Grid container>
      <Grid item xs={5}>
        <span className="black">{firstRowHeading}</span>
        {span == true ? <span className="red_font">*</span> : ""}
      </Grid>
      <Grid item xs={7}>
        <Grid container className="content-row">
          <Controller
            control={control}
            defaultValue={defaultValue??"1"}
            name={name}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="radio"
                  value={"1"}
                  checked={field.value=="1"}
                  ref={(el) => {
                    inputRef.current = el;
                    field.ref(el);
                  }}
                  // checked={defaultValue == 1}
                //   {...register("mailmagazine", { required: true })}
                // defaultChecked

                />
              </>
            )}
          />

          <span className="black" style={{padding:"5px"}}>{radioTitle1} </span>
          <Controller
            control={control}
            defaultValue={defaultValue1??"1"}
            name={name1}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  ref={(el) => {
                    inputRef.current = el;
                    field.ref(el);
                  }}
                //  defaultChecked
                  type="radio"
                  value={"2"}
                  checked={field.value=="2"}
                  // checked={defaultValue == 2}
                //   {...register("mailmagazine", { required: true })}
                />
              </>
            )}
          />

          <span className="black" style={{padding:"5px"}}>{radioTitle2}</span>
        </Grid>
      </Grid>
    </Grid>
  </div>
  );
};

export default RegRadioIn;
