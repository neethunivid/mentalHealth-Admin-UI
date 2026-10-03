import { Grid } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

interface LayoutProps {
  label1?: string;
  label2?: string;
  label3?: string;
  control?: any;
  error?: any;
  defaultValue1?: any;
  name1?: any;
  defaultValue2?: any;
  name2?: any;
}

const NewLenderRadioInp = ({
  label1,
  label2,
  label3,
  control,
  error,
  defaultValue1,
  defaultValue2,
  name1,
  name2,
}: LayoutProps) => {
  return (
    <div>
      <Grid className="content-row">
        <Grid className="library-width-3"></Grid>
        <Grid className="content-row library-width-15">
          <label className="black">{label1}</label>
        </Grid>
        <Grid className="content-row library-width-82">
          <Controller
            control={control}
            defaultValue={defaultValue1 ?? "1"}
            name={name1}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="radio"
                  value={"1"}
                  checked={field.value == "1"}
                ></input>
              </>
            )}
          />
          <label className="black library-pad-left-right ">{label2} </label>
          <Controller
            control={control}
            defaultValue={defaultValue1 ?? "1"}
            name={name1}
            render={({ field }) => (
              <>
                <input
                  type="radio"
                  {...field}
                  value={"2"}
                  checked={field.value == "2"}
                ></input>
              </>
            )}
          />
          <label className="black library-pad-left-right">{label3} </label>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewLenderRadioInp;
