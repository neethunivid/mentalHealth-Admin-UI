import { Grid } from '@mui/material'
import React from 'react'
import { Controller } from "react-hook-form";

interface LayoutProps{
    control:any;
    defaultValue:any;
    name:string;
    value:string;

}

const RadioEditReg = ({control,defaultValue,name,value}:LayoutProps) => {
  return (
 
    <Controller
    control={control}
    defaultValue={defaultValue}
    name={name}
    render={({field})=>(
        <input
        {...field}
        type='radio'
        value={value}
        checked={field.value==value}
        />
    )}
    />

  )
}

export default RadioEditReg