import React from 'react'
import { Controller } from 'react-hook-form'

interface LayoutProps{
    control:any,
    defaultValue:any,
    name:string
    className:string

    
}

const MemberRegInput = ({control,defaultValue,name,className}:LayoutProps) => {
  return (
    <Controller
    control={control}
    defaultValue={defaultValue}
    name={name}
    render={({ field }) => (
      <>
        <input
          {...field}
          type="text"
          className={className}
        //   {...register("MemberReg_change_cause")}
        />
      </>
    )}
  />
  )
}

export default MemberRegInput