import { Grid } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import React from "react";
import { useRef, useEffect } from "react";

interface LayoutProps {
  firstRowHeading: string;
  firstRowHeading1: string;
  firstRowHeading2: string;
  control: any;
  name: string;
  name1: string;
  error: any;
  defaultValue: any;
  defaultValue1: any;
  error1:any;
}

const RegPostInp = ({
  firstRowHeading,
  firstRowHeading1,
  firstRowHeading2,
  defaultValue,
  defaultValue1,
  control,
  name,
  name1,
  error,
  error1
}: LayoutProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputRef1 = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current?.focus();
    }
    if (error1 && inputRef1.current) {
      inputRef1.current?.focus();
    }
  }, [error,error1]);
  return (
    <Grid container>
      <Grid item xs={5}>
        <span className="black">{firstRowHeading}</span>
        <span className="red_font">*</span>
      </Grid>
      <Grid item xs={7}>
        <Grid container className="content-row">
          <span className="verdana"> {firstRowHeading1} </span>
          <Controller
            control={control}
            defaultValue={defaultValue}
            name={name}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  className="bdr_text_small_1"
                  ref={(el) => {
                    inputRef.current = el;
                    field.ref(el);
                  }}
                  maxLength={3}
                  //   {...register("post1")}
                />
              </>
            )}
          />

          <span className="verdana"> {firstRowHeading2} </span>
          <Controller
            control={control}
            defaultValue={defaultValue1}
            name={name1}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  className="bdr_text_small_1"
                  //   {...register("post2")}
                  ref={(el) => {
                    inputRef1.current = el;
                    field.ref(el);
                  }}
                  maxLength={4}
                />
              </>
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegPostInp;
