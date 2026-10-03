import { Grid } from "@mui/material";
import "../../MemberData/member.scss";
import React from "react";
import { useForm, Controller, UseFormSetFocus, UseFormSetValue } from "react-hook-form";
import occupation from "../MemberRegComp/RegOccupation";
import prefecture from "../MemberRegComp/Prefeture";
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
    setValue?: UseFormSetValue<any>;
    id?: any
}

const EditInputField = ({
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
    textBoxDisabled,
    inputTypePassword,
    id,
    inputType,
    setValue
}: any) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const selectRef = useRef<HTMLSelectElement | null>(null);
    const [prefList, setPrefList] = useState<any>([]);
  const [jobList,setJobList]=useState<any>([]);
    useEffect(() => {
        if (error && inputRef.current) {
            inputRef.current?.focus();
        } else if (selectRef.current) {
            selectRef.current.focus();
        }
        if(name=="prefecture"){
            getPref();
        }
        if(name=="occupation"){
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

                            {textInput == true ? (
                                <select
                                    {...field}
                                    ref={(el) => {
                                        selectRef.current = el;
                                        field.ref(el);
                                    }}
                                    // defaultValue={!select1 ? jobList[defaultValue]?.name : prefList[defaultValue]?.name}
                                >
                                    {!select1
                                        ? jobList.map((option:any) => (
                                            <option key={option.id} value={option.name}>
                                            {option.name}
                                          </option>
                                        ))
                                        : prefList.map((option:any) => (
                                            <option key={option.id} value={option.name}>
                                            {option.name}
                                          </option>
                                        ))}
                                </select>
                            ) : (
                                <input
                                    {...field}
                                    //   required={true}
                                    ref={(el) => {
                                        inputRef.current = el;
                                        field.ref(el);
                                    }}
                                    type={inputTypePassword == true ? "password" : "text"}
                                    className="bdr_text2"
                                    disabled={textBoxDisabled}

                                />
                            )}
                        </>

                    )}
                />

                {memberButton == true ? <input type="button" value="使用可能なIDかチエック" onClick={handleSubmit} /> : ""}
            </Grid>
        </Grid>
    );
};

export default EditInputField;
