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
    setValue?: any
    reset?: any
}

const DwnloadRemarkDate = ({ label, name, control, defaultValue, setValue, reset }: LayoutProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);


    const datePickerRef = useRef<ReactDatePicker>(null);

    //save the selected date in state
    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        //if selected date has value then save the value in react hook form 
        if (selectedDate) {

            setValue(name, formatDate(selectedDate));
        } else {
            setValue(name, "") // Clear the form value if the date is cleared
        }
    }, [selectedDate, setValue, name]);
    useEffect(() => {
        if (reset) {
            setSelectedDate(defaultValue || null); // Reset the date to defaultValue or null when the reset prop is true
        }
    }, [reset, defaultValue]);
    // open the date picker with the help of useRef
    const handleButtonClick = () => {
        if (datePickerRef.current) {
            datePickerRef.current.setOpen(true);
        }
    };

    //format the date in YYY-MM-DD format
    const formatDate = (date: Date | null) => {
        if (!date) return "";

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    return (
        <div >
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <ReactDatePicker
                        className="bdr_text_date"
                        ref={datePickerRef}
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

export default DwnloadRemarkDate;
