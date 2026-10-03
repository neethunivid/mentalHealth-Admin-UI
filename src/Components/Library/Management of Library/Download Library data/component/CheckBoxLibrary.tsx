import React from "react";
import { Controller } from "react-hook-form";

interface LayoutProps {
  control: any;
  selectedOption: any;
  value: any;
  onClick1: (value: any) => void;
  onClick2?: (Value: any) =>any;
  setValue: (name: string, value: any) => void;
}

const CheckBoxLibrary = ({
  control,
  selectedOption,
  value,
  onClick1,
  onClick2,
  setValue,
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
            checked={selectedOption == value}
            value="batchDownload"
            onChange={() => {
              setValue(value, !field.value);
              onClick1(value);
              if (onClick2) {
                onClick2(value); 
              }
             
            }}
          />
        )}
      />
    </div>
  );
};

export default CheckBoxLibrary;
