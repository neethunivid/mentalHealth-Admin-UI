import React from 'react'
import { Controller } from 'react-hook-form';

interface LayoutProps {
    control?: any;
    error?: any;
    defaultValue?: any;
    name?: any;
    defaultValueActive?:any
    inputValue?:any
    className?:any
  }

const InputRadio = ({control,error,defaultValue,name,defaultValueActive,inputValue,className}:LayoutProps) => {
  return (
       
    <Controller
    control={control}
    defaultValue={defaultValue ?? defaultValueActive}
    name={name}
    render={({ field }) => (
      <>
        <input
          {...field}
          type="radio"
          className={className}
          value={inputValue}
          checked={field.value === inputValue}
        ></input>
      </>
    )}
  />
  )
}

export default InputRadio