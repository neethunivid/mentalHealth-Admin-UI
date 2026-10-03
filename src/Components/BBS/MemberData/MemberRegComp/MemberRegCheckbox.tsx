import React from 'react'
import { Controller } from 'react-hook-form'

interface LayoutProps{
    control:any
    name:string
    defaultValue:any
    value:any
    selectedValue:any
    id:any
    onChange:(event: React.ChangeEvent<HTMLInputElement>) => void

}

const MemberRegCheckbox = ({control,name,defaultValue,value,selectedValue,id,onChange}:LayoutProps) => {
  return (
    <Controller
    control={control}
    defaultValue={
  defaultValue || "1"
    }
    name={name}
    render={({ field }) => (
      <>
        <input
          {...field}
          type="checkbox"
         id={id}
          value={value}
        //   {...register("MemberReg_usertype")}
          checked={selectedValue === value}
          onChange={onChange}
        />
      </>
    )}
  />
  )
}

export default MemberRegCheckbox