import React from 'react'
import { useForm, Controller } from "react-hook-form";
import options from '../timedata';
import optionsdata from '../minutesdata';

interface LayoutProps{
    control:any;
    defaultValue:any;
    label:any;
    isHr:boolean;
    name:any

}

const Member_pen_selectBox = ({control,defaultValue,label,isHr,name}:any) => {
  return (
    <div className="bg_white">
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <select
        {...field}
        >
            {isHr==true?    options.map((option) => (
            <option  
              key={option.value}
              value={option.value}
              // selected={ formatedHr}
            >
              {option.value}
            </option>
          )): optionsdata.map((option) => (
            <option
            
              key={option.value}
              value={option.value}
            
            >
              {option.value}
            </option>
          ))}
      
        </select>
      )}
    />
    <span className="verdana">{label}</span>
  </div>
  )
}

export default Member_pen_selectBox