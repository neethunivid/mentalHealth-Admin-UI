import React from "react";
import { Controller } from "react-hook-form";
import pref from "../../Common/pref";

interface LayoutProps {
  control: any;
  defaultValue: any;
  name: string;
}

const SelectBoxEditReg = ({ control, defaultValue, name }: LayoutProps) => {
  return (
    <Controller
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field }) => (
        <select {...field}>
          {pref.map((option: any) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      )}
    />
  );
};

export default SelectBoxEditReg;
