import React, { useRef, useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import calenderIcon from '../../../assets/images/icon_calender.gif';
import { formatDateArray, formatDateString } from '../Date_conversion';

interface LayoutProps {
  control?: any;
  className?: any;
  defaultValue?: any;
  name?: any;
  error?: any;
  setValue?: any;
}

const InputDatePicker = ({
  control,
  className,
  defaultValue,
  name,
  error,
  setValue,
}: LayoutProps) => {
  const datePickerRef = useRef<ReactDatePicker>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [manualDate, setManualDate] = useState<string>(''); // State for manual date input

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setManualDate(formatDateString(date)); // Update the manual date input
    setValue(name, formatDateString(date));
  };

  const handleManualDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = event.target.value;
    setManualDate(inputDate);
    setValue(name, inputDate);
  };

  const openDatePicker = () => {
    if (selectedDate) {
      setValue(name, formatDateString(selectedDate));
      setManualDate(formatDateString(selectedDate)); // Update manual date input when opening date picker
    }
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (defaultValue) {
      const parsedDate = new Date(defaultValue);
      setSelectedDate(parsedDate);
      setManualDate(formatDateString(parsedDate)); // Update manual date input with default value
      setValue(name, formatDateString(parsedDate));
    }
    if (error) {
        // inputRef.current?.focus();
      datePickerRef.current?.setOpen(true);
    }
    // if (selectedDate) {
    //   setValue(name, formatDateString(selectedDate));
    //   setManualDate(formatDateString(selectedDate)); // Update manual date input when selectedDate changes
    // }
  }, [error, setValue, name]);

  return (
    <>
      <Controller
        control={control}
        defaultValue={selectedDate}
        name={name}
        render={({ field }) => (
          <div className="date-picker-wrapper">
            <input
            {...field}
              type="text"
              className="library-text-input1"
              // value={defaultValue}
              ref={(el) => {
                inputRef.current = el;
                field.ref(el);
              }}
              onChange={handleManualDateChange}
              placeholder="YYYY-MM-DD"
            />
            <ReactDatePicker
              {...field}
              className="library-text-input1"
              ref={datePickerRef}
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              showYearDropdown={true}
              yearDropdownItemNumber={3}
              customInput={<div style={{ display: 'none' }} />}
            />
            <img
              className="bg_white"
              src={calenderIcon}
              alt="Calendar"
              width={14}
              height={14}
              onClick={openDatePicker}
            />
          </div>
        )}
      />
    </>
  );
};

export default InputDatePicker;
