import { Grid } from "@mui/material";
import React,{useState,useRef,useEffect} from "react";
import { useForm, Controller } from "react-hook-form";
interface LayoutProps {
  firstrowHeading: string;
  control: any;
  defaultValue: any;
  defaultValue1: any;
  name: string;
  name1: string;
  error1?:any;
  error2?:any
}


const RegEmailImput = ({
  firstrowHeading,
  control,
  defaultValue,
  defaultValue1,
  name,
  name1,
  error1,error2
}: LayoutProps) => {

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputRef1 = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (error1 && inputRef.current) {
      inputRef.current?.focus();
    }
    if(error2 && inputRef1.current){
        inputRef1.current?.focus();
    }
  }, [error1,error2]);

  return (
    <div>
      <Grid container>
        <Grid item xs={5}>
          <span className="black">{firstrowHeading}</span>
        </Grid>
        <Grid item xs={7}>
          <Controller
            control={control}
            defaultValue={defaultValue}
            name={name}
            render={({ field }) => (
              <>
                <input
                {...field}
                ref={(el) => {
                  inputRef.current = el;
                  field.ref(el);
                }}
                  type="text"
                  className="reg_email_input1"
                  // {...register("email_pc1")}
                />
              </>
            )}
          />

          <span className="black"> @</span>
          <Controller
            control={control}
            defaultValue={defaultValue1}
            name={name1}
            render={({ field }) => (
              <>
             <input
             {...field}
             ref={(el) => {
              inputRef1.current = el;
              field.ref(el);
            }}
            type="text"
            className="reg_email_input1"
            // {...register("email_pc2")}
          />
              </>
            )}
          />
         
        </Grid>
      </Grid>
    </div>
  );
};

export default RegEmailImput;
