import { Grid } from "@mui/material";
import React, { useRef, useEffect } from "react";
import { Controller } from "react-hook-form";
import InputText from "../../../Common/Inputs/InputText";

interface LayoutProps {
  label1?: string;
  label2?: string;
  label3?: string;
  control?: any;
  error1?: any;
  error2?: any;
  defaultValue1?: any;
  name1?: any;
  defaultValue2?: any;
  name2?: any;
  isPreview?: boolean;
}
const NewLenderInput1 = ({
  label1,
  label2,
  label3,
  control,
  error1,
  error2,
  defaultValue1,
  name1,
  defaultValue2,
  name2,
  isPreview,
}: LayoutProps) => {
  // const inputRef1 = useRef<HTMLInputElement | null>(null);
  // const inputRef2 = useRef<HTMLInputElement | null>(null);
  // useEffect(() => {

  //   if (error1 && inputRef1.current) {
  //     inputRef1.current?.focus();
  //   } else if (error2 && inputRef2.current) {
  //     inputRef2.current?.focus();
  //   }
  // }, [error1, error2]);
  return (
    <div>
      {isPreview ? (
        <div>

          <Grid className="content-row">
            <Grid className="library-width-3"></Grid>
            <Grid className="content-row library-width-15">
              <label className="black">{label1}</label>
            </Grid>
            <Grid className="content-row library-width-82">
              <label className="black library-pad-left-right ">{label2} </label>
              <>
                <input
                  value={defaultValue1}
                  type="text"
                  className="library-text-input1 library_preview_inpBg"
                  readOnly
                ></input>
              </>
              <label className="black library-pad-left-right">{label3} </label>
              <>
                <input
                  readOnly
                  className="library-text-input1 library_preview_inpBg"
                  value={defaultValue2}
                ></input>
              </>
            </Grid>
          </Grid>
        </div>
      ) : (
        <Grid className="content-row">
          <Grid className="library-width-3"></Grid>
          <Grid className="content-row library-width-15">
            <label className="black">{label1}</label>
          </Grid>
          <Grid className="content-row library-width-82">
            <label className="black library-pad-left-right ">{label2} </label>
            <InputText
            className="library-text-input1"
            control={control}
            defaultValue={defaultValue1}
            name={name1}
            error={error1}
            type={'text'}
            />
            {/* <Controller
              control={control}
              defaultValue={defaultValue1}
              name={name1}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    className="library-text-input1 "
                    ref={(el) => {
                      inputRef1.current = el;
                      field.ref(el);
                    }}
                  />
                </>
              )}
            /> */}

            <label className="black library-pad-left-right">{label3} </label>
            <InputText
            className="library-text-input1"
            control={control}
            defaultValue={defaultValue2}
            name={name2}
            error={error2}
            type={'text'}
            />
            {/* <Controller
              control={control}
              defaultValue={defaultValue2}
              name={name2}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    className="library-text-input1 "
                    ref={(el) => {
                      inputRef2.current = el;
                      field.ref(el);
                    }}
                  ></input>
                </>
              )}
            /> */}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default NewLenderInput1;
