import { Grid } from "@mui/material";
import { fi } from "date-fns/locale";
import React, { useEffect, useRef } from "react";
import { Controller } from "react-hook-form";
import prefecture from "../../../BBS/MemberData/MemberRegComp/Prefeture";
import pref from "../../Common/pref";
import InputSelect from "../../../Common/Inputs/InputSelect";
import InputText from "../../../Common/Inputs/InputText";

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
  selectBox?: boolean;
  inputClassName?: any;
  isPreview?: any;
}

const NewLenderInput2 = ({
  label1,
  label2,
  label3,
  control,
  error,
  defaultValue1,
  name1,
  defaultValue2,
  name2,
  selectBox,
  inputClassName,
  isPreview,
}: LayoutProps) => {
  // const inputRef = useRef<HTMLInputElement | null>(null);
  // useEffect(() => {
  //   if (error && inputRef.current) {
  //     inputRef?.current!.focus();
  //   }
  // }, [error]);
  return (
    <div>
      {isPreview ? (
        <Grid className="content-row">
          <Grid className="library-width-3"></Grid>
          <Grid className="content-row library-width-15">
            <label className="black">{label1}</label>
          </Grid>
          <Grid className="content-row library-width-82">
            <label className="black library-pad-left-right ">{label2} </label>
            <input
              value={defaultValue1}
              className={inputClassName?
                `${inputClassName} library_preview_inpBg` :
                "library-text-input1 library_preview_inpBg"
              }
            ></input>

            <label className="black library-text-example">{label3}</label>
          </Grid>
        </Grid>
      ) : (
        <Grid className="content-row">
          <Grid className="library-width-3"></Grid>
          <Grid className="content-row library-width-15">
            <label className="black">{label1}</label>
          </Grid>
          <Grid className="content-row library-width-82">
            <label className="black library-pad-left-right ">{label2} </label>
            {/* <Controller
              control={control}
              defaultValue={defaultValue1}
              name={name1}
              render={({ field }) => ( */}
                <>
                  {!selectBox ? (
                    <InputText
                    error={error}
                    defaultValue={defaultValue1}
                    control={control}
                    name={name1}
                    className={inputClassName ?? "library-text-input1 "}
                    />
                    // <input
                    //   {...field}
                    //   className={inputClassName ?? "library-text-input1 "}
                    //   // ref={(el) => {
                    //   //   inputRef.current = el;
                    //   //   field.ref(el);
                    //   // }}
                    // ></input>
                  ) : (
                    <InputSelect
                    control={control}
                    options={pref}
                    defaultValue={defaultValue1}
                    name={name1}

                    />
                    // <select {...field}>
                    //   {pref.map((option: any) => (
                    //     <option key={option.id} value={option.name}>
                    //       {option.name}
                    //     </option>
                    //   ))}
                    // </select>
                  )}
                </>
              {/* )}
            /> */}

            <label className="black library-text-example">{label3}</label>
            {/* 
          <label className="black library-pad-left-right">{label3} </label>

          <Controller
            control={control}
            defaultValue={defaultValue2}
            name={name2}
            render={({ field }) => (
              <>
                <input {...field} className="library-text-input1 "></input>
              </>
            )}
          /> */}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default NewLenderInput2;
