import { Grid, useForkRef } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRef, useEffect } from "react";
interface LayoutProps {
  firstrowHeading: string;
  firstrowHeading1?: string;
  control: any;
  defaultValue: any;
  defaultValue1: any;
  defaultValue2: any;
  spanText1: string;
  spanText2: string;
  spanText3: string;
  name: string;
  name1: string;
  name2: string;
  error?: any;
  error1?:any;
  error2?:any;
  isDob?:boolean;
}

const RegDobInput = ({
  firstrowHeading,
  firstrowHeading1,
  control,
  defaultValue,
  defaultValue1,
  defaultValue2,
  spanText1,
  spanText2,
  spanText3,

  name,
  name1,
  name2,
  error,
  error1,
  error2,
  isDob
}: LayoutProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputRef1=useRef<HTMLInputElement | null>(null);
  const inputRef2=useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current?.focus();
    }
    if(error1 && inputRef1.current){
        inputRef1.current?.focus();
    }if(error2&& inputRef2.current){
        inputRef2.current?.focus();
    }
  }, [error,error1,error2]);
  return (
    <div>
      <Grid container>
        <Grid item xs={5}>
          <span className="black"> {firstrowHeading}</span>
          <span className="red_font">*</span>
          <span className="black">{firstrowHeading1}</span>
        </Grid>
        <Grid item xs={7}>
          <Grid container flexDirection={"row"}>
            <Controller
              control={control}
              defaultValue={defaultValue}
              name={name}
              render={({ field }) => (
                <>
                  <input
                  maxLength={isDob?4:10}
                    {...field}
                    type="text"
                    className="bdr_text_small_1"
                    ref={(el) => {
                      inputRef.current = el;
                      field.ref(el);
                    }}
                    //   {...register("dob1", { required: true })}
                  />
                </>
              )}
            />

            <span className="verdana">{spanText1} </span>

            <Controller
              control={control}
              defaultValue={defaultValue1}
              name={name1}
              render={({ field }) => (
                <>
                  <input
                  maxLength={isDob?2:10}
                    {...field}
                    type="text"
                    className="bdr_text_small_1"
                    ref={(el) => {
                      inputRef1.current = el;
                      field.ref(el);
                    }}
                    //   {...register("dob2", { required: true })}
                  />
                </>
              )}
            />
            <span className="verdana">{spanText2} </span>
            <Controller
              control={control}
              defaultValue={defaultValue2}
              name={name2}
              render={({ field }) => (
                <>
                  <input
                  maxLength={isDob?2:10}
                    {...field}
                    type="text"
                    className="bdr_text_small_1"
                    ref={(el) => {
                      inputRef2.current = el;
                      field.ref(el);
                    }}
                    // {...register("dob3", { required: true })}
                  />
                </>
              )}
            />

            <span className="verdana">{spanText3} </span>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegDobInput;
