import React, { useRef, useEffect } from "react";
import { Controller } from "react-hook-form";

interface LayoutProps {
  control: any;
  defaultValue?: any;
  name: string;
  className?: any;
  type?: any;
  error?: any;
  setValue?:any
  maxLength?:any
  readOnly?:any
  placeholder?:string
}

const InputText = ({
  control,
  defaultValue,
  name,
  className,
  type,
  error,
  setValue,
  maxLength,
  readOnly=false,
  placeholder =''
}: LayoutProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (error && inputRef.current) {
      inputRef.current?.focus();
    }
    if(setValue){
      setValue(name,defaultValue);
    }
  }, [error,defaultValue]);
  return (
    <>
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field }) => (
          <>
            <input
              {...field}
              type={type}
              className={className}
              ref={(el) => {
                inputRef.current = el;
                field.ref(el);
              }}
              maxLength={maxLength}
              readOnly={readOnly} 
              placeholder={placeholder}
            />
          </>
        )}
      />
    </>
  );
};

export default InputText;
