import { Grid } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useRef, useEffect } from "react";
interface LayoutProps {
  firstrowHeading: string;
  firstrowHeading1?: string;
  control?: any;
  defaultValue?: any;
  name?: string;
  span?: boolean;
  error?: any;
}

const RegInpRight = ({
  firstrowHeading,
  firstrowHeading1,
  control,
  span,
  defaultValue,
  name,
  error,
}: LayoutProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current?.focus();
    }
  }, [error]);
  return (
    <Grid container item xs={12}>
      <Grid item xs={4} className="content-row">
        <label className="black">{firstrowHeading} </label>
        {span == true ? "" : <span className="red_font">＊</span>}
      </Grid>
      <Grid item xs={8}>
        {name != null ? (
          <Controller
            control={control}
            defaultValue={defaultValue}
            name={name ?? ""}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="text"
                  className=" bdr_text_medium"
                  ref={(el) => {
                    inputRef.current = el;
                    field.ref(el);
                  }}
                  // {...register("join_date", { required: true })}
                />
              </>
            )}
          />
        ) : (
          ""
        )}
        <span className="black">{firstrowHeading1}</span>
      </Grid>
    </Grid>
  );
};

export default RegInpRight;
