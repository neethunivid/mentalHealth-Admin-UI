import { Grid } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import InputText from "../../../Common/Inputs/InputText";
import InputSelect from "../../../Common/Inputs/InputSelect";
// import ages from "../../common/Age";
import getOptions from "../../../../utils/utls";
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
const Reservation_form_select = ({
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
  const { ReservationSlotages} =
  getOptions();
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
          
          <InputSelect
                        defaultValue={
                            defaultValue
                        }
                        control={control}
                        options={ReservationSlotages}
                        name={name}
                        error={error}
                       sampleOption={"選択"}
                        className={classNameInput}
                      />
      
        )}

        <label className="black reservation_form_font16">
          {inpuEx ? label2 : ""}
        </label>
      </Grid>
    </Grid>
  );
};

export default Reservation_form_select;
