import { Grid } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRef, useEffect } from "react";
interface LayoutProps {
  title: string;
  name1: string;
  name2: string;
  control: any;
  defaultValue1: any;
  defaultValue2: any;
  error1: any;
  error2: any;
}

const RegRightTop_Inp = ({
  error1,
  error2,
  title,
  name1,
  name2,
  control,
  defaultValue1,
  defaultValue2,
}: LayoutProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputRef1 = useRef< HTMLTextAreaElement>(null);
    useEffect(() => {
    if (error1 && inputRef.current) {
      inputRef.current?.focus();
    }
    if (error2 && inputRef1.current) {
        inputRef1.current?.focus();
    }
  }, [error1, error2]);
  return (
    <div>
      <Grid item xs={12}>
        <Controller
          control={control}
          defaultValue={defaultValue1}
          name={name1}
          render={({ field }) => (
            <>
              {/* {error && <span className="error-message">{error.message}</span>} */}
              <input
                {...field}
                type="text"
                id="statement_title"
                className="bdr_text2"
                ref={(el) => {
                  inputRef.current = el;
                  field.ref(el);
                }}
                //   {...register("statement_title",{required:true})}
              />
            </>
          )}
        />
      </Grid>
      <Grid className="hr"></Grid>
      <Grid item xs={12}>
        <span className="black">・発言内容</span>
        <span className="red_font">*</span>
      </Grid>
      <Grid item xs={12}>
        <Controller
          control={control}
          defaultValue={defaultValue2}
          name={name2}
          render={({ field }) => (
            <>
              {/* {error && <span className="error-message">{error.message}</span>} */}
              <textarea
                {...field}
                rows={11}
                cols={40}
                className="text_area"
                ref={inputRef1}
                //   {...register("statement_text",{required:true})}
              ></textarea>
            </>
          )}
        />
      </Grid>
    </div>
  );
};

export default RegRightTop_Inp;
