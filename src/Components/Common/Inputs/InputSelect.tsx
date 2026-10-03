import React,{useRef,useEffect} from "react";
import { Controller } from "react-hook-form";
interface LayoutProps {
  control: any;
  defaultValue?: any;
  name: string;
  className?: string;
  type?: any;
  error?: any;
  options?: any;
  sampleOption?:any;
  readOnly?:boolean
  
}
const InputSelect = ({
  control,
  defaultValue,
  name,
  className,
  type,
  error,
  options,
  sampleOption,
  readOnly=false
}: LayoutProps) => {
  const inputRef=useRef<HTMLSelectElement|null>(null);
  useEffect(()=>{
if(error&&inputRef.current){
  inputRef.current?.focus();
}
  },[error]);
  return (
    <>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field }) => (
          <>
            <select {...field} className={className} ref={inputRef} disabled={readOnly}>
              {sampleOption&&<option>{sampleOption}</option>}
              {options.map((option: any) => (
                <option key={option.id} value={option.id}
                >
                  {option.name}
                </option>
              ))}
            </select>
          </>
        )}
      />
    </>
  );
};

export default InputSelect;
