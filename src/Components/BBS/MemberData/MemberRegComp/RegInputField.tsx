import { Grid } from "@mui/material";
import "../../MemberData/member.scss";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import occupation from "./RegOccupation";
import prefecture from "./Prefeture";
import { useRef, useEffect, useState } from "react";
import apiClient from "../../../../API/API-client";
interface LayoutProps {
  firstrowHeading: string;
  firstrowHeading1?: string;
  control: any;
  defaultValue: any;
  name: string;
  textInput?: Boolean;
  select1?: Boolean;
  error?: any;
  memberButton?: boolean;
  span?: boolean;
  inputTypePassword?: boolean;
  handleClick: () => void;
}

const RegInputField = ({
  firstrowHeading,
  firstrowHeading1,
  control,
  defaultValue,
  name,
  textInput,
  select1,
  error,
  memberButton,
  span,
  handleSubmit,
  inputTypePassword,
}: any) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const [prefList, setPrefList] = useState([]);
  const [jobList,setJobList]=useState([]);
  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current?.focus();
    }
    if(name=='MemberReg_prefecture'){
      getPref();
    
    }else if(name=='MemberReg_occupation'){
      getJob();
    }
   
  }, [error,name]);
  const getPref = async () => {
    try {
      const apiData = await apiClient.post("api/members/prefList", {});
      if (apiData) {
        setPrefList(apiData.data.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const getJob = async () => {
    try {
      const apiData=await apiClient.post('api/members/job',{});
      if(apiData){
      
        setJobList(apiData.data.data);
      }
    } catch (error) {

    }
  };
  return (
    <Grid className="content-row ">
      <Grid className="black" item xs={5}>
        <span>{firstrowHeading}</span>
        {span == true ? "" : <span className="red_font">*</span>}
        {!firstrowHeading1 ? "" : <span>{firstrowHeading1}</span>}
      </Grid>
      <Grid className="black" item xs={7}>
        <Controller
          control={control}
          defaultValue={defaultValue}
          name={name}
          render={({ field }) => (
            <>
              {/* {error && <span className="error-message">{error.message}</span>} */}
              {textInput == true ? (
                <select
                  {...field}
                  // ref={(el) => {
                  //   selectRef.current = el;
                  //   field.ref(el);
                  // }}
                >
                  {!select1
                    ? jobList.map((option: any) => (
                        <option key={option.id} value={option.name}>
                          {option.name}
                        </option>
                      ))
                    : prefList.map((option: any) => (
                        <option key={option.id} value={option.name}>
                          {option.name}
                        </option>
                      ))}
                </select>
              ) : (
                <input
                  {...field}
                  ref={(el) => {
                    inputRef.current = el;
                    field.ref(el);
                  }}
                  type={inputTypePassword == true ? "password" : "text"}
                  className="bdr_text2"
                />
              )}
            </>
            // <>
            //   <input
            //     {...field}
            //     required={true}
            //     type="text"
            //     className="bdr_text2"
            //   />
            // </>
          )}
        />
        {memberButton == true ? (
          <input
            className="cursor_pointer"
            type="button"
            value="使用可能なIDかチエック"
            onClick={handleSubmit}
          />
        ) : (
          ""
        )}
      </Grid>
    </Grid>
  );
};

export default RegInputField;
