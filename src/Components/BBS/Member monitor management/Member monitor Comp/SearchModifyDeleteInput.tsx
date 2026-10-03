import { Grid } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";

interface LayoutProps {
  label?: string;
  name?: any;
  control: any;
  defaultValue?: any;
}

const SearchModifyDeleteInput = ({ label, name, control }: LayoutProps) => {
  return (
    <div>
      <Grid className="black">
        <span>{label}</span>

        <Controller
          control={control}
          //   defaultValue={defaultValue}
          name={name??""}
          render={({ field }) => (
            <>
              <input style={{paddingRight:"10px"}} className="bdr_text"{...field} type="text"></input>
            </>
          )}
        />
      </Grid>
    </div>
  );
};

export default SearchModifyDeleteInput;
