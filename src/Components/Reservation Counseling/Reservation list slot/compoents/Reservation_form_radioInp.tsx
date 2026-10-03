import { Grid } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";

interface LayoutProps {
  label: string;
  radioLabel1: string;
  radioLabel2: string;
  name: any;
  control: any;
  defaultValue:any;
}

const Reservation_form_radioInp = ({
  label,
  radioLabel1,
  radioLabel2,
  name,
  control,
  defaultValue
}: LayoutProps) => {
  return (
    <div>
      <Grid xs={12} className="content-row">
        <Grid xs={5}>
          <Grid className="reservation_form_padding">
            <label className="black">{label}</label>
          </Grid>
        </Grid>
        <Grid xs={9} className="content-row">
          <Controller
            control={control}
            defaultValue={defaultValue??"M"}
            name={name}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="radio"
                  value={"M"}
                  checked={field.value == "M"}
                />
              </>
            )}
          />
          <span className="black reservation_form_font16" style={{ padding: "5px" }}>
            {radioLabel1}{" "}
          </span>
          <Controller
            control={control}
            defaultValue={defaultValue??"M"}
            name={name}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  type="radio"
                  value={"F"}
                  checked={field.value == "F"}

                />
              </>
            )}
          />
          <span className="black reservation_form_font16" style={{ padding: "5px" }}>
            {radioLabel2}
          </span>
        </Grid>
      </Grid>
    </div>
  );
};

export default Reservation_form_radioInp;
