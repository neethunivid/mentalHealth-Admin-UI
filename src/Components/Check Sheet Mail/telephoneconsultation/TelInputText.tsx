import React, { useRef, useEffect } from "react";
import { Controller } from "react-hook-form";

interface LayoutProps {
  control: any;
  defaultValue?: any;
  name: string;
  className?: string;
  type?: string;
  setValue?: (name: string, value: any) => void;
  readOnly?: boolean;
  value?: any; 
}

//component is used as textfield with open and close parenthesis
const TelInputText = ({
  control,
  defaultValue = '',
  name,
  className,
  type = "text",
  setValue,
  readOnly
}: LayoutProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

 // useEffect to handle input focus and set default value
  useEffect(() => {
   // Focus on the input field if there is an error
    if (inputRef.current) {
      inputRef.current.focus();
    }
    // Set the value of the input field when defaultValue changes
    if (setValue) {
      setValue(name, defaultValue); // Set the value when defaultValue changes
    }
  }, [ defaultValue, name, setValue]);

  return (
    <div className="input-container">
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field }) => (
          <div className="input-wrapper">
            <span className="parenthesis left">(</span>
            <input
              {...field}
              type={type}
              className={`input-field ${className}`}
              ref={(el) => {
                inputRef.current = el;
                field.ref(el); // Register the input field
              }}
              readOnly={readOnly}
            />
            <span className="parenthesis right">)</span>
          </div>
        )}
      />
    </div>
  );
};


export default TelInputText;
