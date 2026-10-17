import { Grid } from "@mui/material";
import React, { useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
interface LayoutProps {
  control: any;
  defaultValue: any;
  defaultValue1?: any;
  defaultValue2?: any;
  defaultValue3?: any;
  defaultValue4?: any;
  defaultValue5?: any;
  defaultValue6?: any;

  defaultTitle1?: any;
  defaultTitle2?: any;
  error1?: any;
  error2?: any;
}

const RegCheckBox = ({
  defaultValue,
  defaultValue1,
  defaultValue2,
  defaultValue3,
  defaultValue4,
  defaultValue5,
  defaultValue6,

  defaultTitle1,
  defaultTitle2,

  control,
  error1,
  error2,
}: LayoutProps) => {
  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (error1 && inputRef1.current) {
      inputRef1.current?.focus();
    } else if (error2 && inputRef2.current) {
      inputRef2.current?.focus();
    }
   
  }, [error1,error2]);
  return (
    <div>
      <Grid container item xs={12}>
        <Grid item xs={7} className="content-row">
          <Controller
            control={control}
            defaultValue={defaultValue}
            name="MemberReg_checkboxGroup"
            render={({ field }) => (
              <input
                {...field}
                checked={field.value}
                type="checkbox"
                value="A.普通神経症"
              ></input>
            )}
          />

          <label className="verdana"> A.普通神経症</label>
        </Grid>
        <Grid item xs={5}>
          <Controller
            control={control}
            defaultValue={defaultValue1}
            name="MemberReg_checkboxGroup1"
            render={({ field }) => (
              <input
                {...field}
                checked={field.value}
                type="checkbox"
                value="D.その他"
                // {...register("checkboxGroup")}
              ></input>
            )}
          />

          <label className="verdana"> D.その他</label>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={7} flexDirection={"row"}>
          <Controller
            control={control}
            defaultValue={defaultValue2}
            name="MemberReg_checkboxGroup2"
            render={({ field }) => (
              <input
                {...field}
                checked={field.value}
                type="checkbox"
                value=" B.不安神経症"
                // {...register("checkboxGroup")}
              ></input>
            )}
          />

          <label className="verdana"> B.不安神経症 </label>
        </Grid>
        <Grid item xs={5}>
          <Controller
            control={control}
            defaultValue={defaultValue3}
            name="MemberReg_checkboxGroup3"
            render={({ field }) => (
              <input
                {...field}
                checked={field.value}
                type="checkbox"
                value="E.成長の部屋"
                // {...register("checkboxGroup")}
              ></input>
            )}
          />

          <label className="verdana"> E.成長の部屋 </label>
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={7} flexDirection={"row"}>
          <Controller
            control={control}
            defaultValue={defaultValue4}
            name="MemberReg_checkboxGroup4"
            render={({ field }) => (
              <input
                {...field}
                checked={field.value}
                type="checkbox"
                value="C.強迫神経症"
                // {...register("checkboxGroup")}
              ></input>
            )}
          />
          <span className="verdana"> C.強迫神経症</span>
        </Grid>
        <Grid item xs={5}>
          <Controller
            control={control}
            defaultValue={defaultValue5}
            name="MemberReg_checkboxGroup5"
            render={({ field }) => (
              <input
                {...field}
                checked={field.value}
                type="checkbox"
                value="F.新規1"
                // {...register("checkboxGroup")}
              ></input>
            )}
          />
          <label className="verdana"> F.新規1</label>
          <Controller
            control={control}
            defaultValue={defaultTitle1}
            name="MemberReg_checkboxGroup5Title"
            render={({ field }) => (
              <input
                {...field}
                ref={(el) => {
                  inputRef1.current = el;
                  field.ref(el);
                }}
                type="text"
                className="bdr_text_small"
              />
              //   <input
              //     {...field}
              //     type="checkbox"
              //     value="F.新規1"
              //     // {...register("checkboxGroup")}
              //   ></input>
            )}
          />
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid item xs={7} flexDirection={"row"}>
          <Controller
            control={control}
            defaultValue={defaultValue6}
            name="MemberReg_checkboxGroup6"
            render={({ field }) => (
              <input
                {...field}
                type="checkbox"
                value=" G.新規２"
                checked={field.value}
                // onChange={(e) => field.onChange(e.target.checked)}
                // {...register("checkboxGroup")}
              ></input>
            )}
          />
          <label className="verdana"> G.新規２</label>
          <Controller
            control={control}
            defaultValue={defaultTitle2}
            name="MemberReg_checkboxGroup6Title"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="bdr_text_small"
                ref={(el) => {
                  inputRef2.current = el;
                  field.ref(el);
                }}
              />
              //   <input
              //     {...field}
              //     type="checkbox"
              //     value=" G.新規２"
              //     checked={field.value || false}
              //     onChange={(e) => field.onChange(e.target.checked)}
              //     // {...register("checkboxGroup")}
              //   ></input>
            )}
          />
          {/* <input name="title" type="text" className="bdr_text_small" /> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default RegCheckBox;
