import { Grid } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import calenderIcon from "../../../../assets/images/icon_calender.gif";
import { formatDateString } from "../../../Common/Date_conversion";

interface LayoutProps {
  label1: string;
  label2: string;
  label3: string;
  control: any;
  error?: any;
  defaultValue1?: any;
  name1: any;
  defaultValue2?: any;
  name2: any;
  selectBox?: boolean;
  inputClassName?: any;
  date: any;
  setValue: any;
}

const NewLenderDateInp = ({
  label1,
  label2,
  label3,
  control,
  error,
  defaultValue1,
  name1,
  defaultValue2,
  name2,
  selectBox,
  inputClassName,
  date,
  setValue,
}: LayoutProps) => {
  const datePickerRef = useRef<ReactDatePicker>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };
  const handleButtonClick = () => {
    datePickerRef.current?.setOpen(true);
  };
  useEffect(() => {
    const fullDate = new Date();
    const year = fullDate.getFullYear();
    const month = fullDate.getMonth();
    const date = fullDate.getDay();
    const currentDate = `${year}-${month}-${date}`;
    setValue(name1, currentDate);
    setValue(name1,date);
    if (selectedDate) {
      setValue(name1, formatDateString(selectedDate));
    } else {
        
        setValue(name1, currentDate);
    }
  }, [selectedDate, setValue, name1]);

  const formatDate = (date: Date | null) => {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Grid className="content-row">
        <Grid className="library-width-3"></Grid>
        <Grid className="content-row library-width-15">
          <label className="black">{label1}</label>
        </Grid>
        <Grid className="content-row library-width-82">
          <label className="black library-pad-left-right ">{label2} </label>
          <Controller
            control={control}
            name={name1}
            render={({ field }) => (
              <ReactDatePicker
                className="library-text-input1"
                {...field}
                ref={datePickerRef}
                selected={selectedDate || new Date()}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
              />
            )}
          />
          <img
            className="bg_white"
            src={calenderIcon}
            alt="calendar"
            width={14}
            height={14}
            onClick={handleButtonClick}
          />
          <label className="black library-text-example">{label3}</label>
        </Grid>
      </Grid>
    </div>
  );
};

export default NewLenderDateInp;
