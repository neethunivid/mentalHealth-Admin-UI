import React, { useState, useRef, useEffect } from "react";
import dateImage from "../../../../assets/images/icon_calender.gif";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";

interface LayoutProps {
  label?: string;
  name: any;
  control: any;
  defaultValue?: any;
  setValue: any;
  reset:any
}

const SearchMoDelDate = ({
  label,
  name,
  control,
  defaultValue,
  setValue,
  reset,
}: LayoutProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    defaultValue || null
  );

  const datePickerRef = useRef<ReactDatePicker>(null);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };
 ;
  useEffect(() => {
    if (selectedDate) {
      setValue(name, formatDate(selectedDate));
    } else {
      setValue(name, "");
    }
  }, [selectedDate, setValue, name]);
 
  useEffect(() => {
    if (reset) {
      setSelectedDate(defaultValue || null); // Reset the date to defaultValue or null when the reset prop is true
    }
  }, [reset, defaultValue]);
  const handleButtonClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="black">
      <span>{label}</span>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ReactDatePicker
            ref={datePickerRef}
            className="bdr_text"
            selected={selectedDate}
            onChange={(date: Date) => {
              handleDateChange(date);
              field.onChange(date); 
            }}
            dateFormat="yyyy-MM-dd"
          />
        )}
      />

      <img
        className="member_monitor_content_date_image"
        src={dateImage}
        alt="Calendar Icon"
        onClick={handleButtonClick}
      />
    </div>
  );
};

export default SearchMoDelDate;
