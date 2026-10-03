import React from "react";
import { useForm, Controller } from "react-hook-form";

interface LayoutProps {
  control: any;
  selectedOption: any;
  value: any;
  onClick: (value: any) => void;
  setValue: (name: string, value: any) => void;

}

export const CheckBoxDownload_loan = ({
  control,
  selectedOption,
  value,
  onClick,
  setValue

}: LayoutProps) => {
 
  return (
    <div>
      <Controller
        name={value}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <input
            {...field}
            className="management_checkbox"
            type="checkbox"
            checked={selectedOption===value} 
            onChange={() => {
              // setValue(value, selectedOption === value ? false : !field.value);
              onClick(value); // Pass the value directly to onClick
            }}
          />
        )}
      />
    </div>
  );
};
