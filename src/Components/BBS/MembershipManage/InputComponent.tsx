import { Typography, Grid, TextFieldProps } from '@mui/material'
import React, { ReactNode, useEffect } from 'react'
import { useForm, Controller, UseFormSetFocus, UseFormSetValue } from "react-hook-form";
import '../../../assets/css/health.css'

interface LayoutProps {

    name: string;
    label: string;
    control?: any;
    defaultValue?: any;
    textBoxEnabled?: boolean;
    className?: any;
    type?: any;
    id?: any;
    setValue?: UseFormSetValue<any>;
}
const InputComponent = ({ control, defaultValue, name, label, textBoxEnabled, type, id, setValue }: LayoutProps) => {
    // useEffect(() => {
    //     if (setValue) {
    //         setValue(name, defaultValue)
    //     }
    // }, [defaultValue])
    return (
        <Grid container item xs={12} paddingBottom={0.5}>
            <Grid item xs={6}>
                <span className='black'>{label}</span>
            </Grid>
            <Grid item xs={6} >
                <Controller
                    control={control}
                    name={name}
                    defaultValue={defaultValue}
                    render={({ field }) => (
                        <input
                            type={type}
                            id={id}
                            value={defaultValue}
                            className='bdr_text'
                            // {...field}
                            disabled={!textBoxEnabled}
                        />
                    )}
                />
            </Grid>
        </Grid>

    )
}

export default InputComponent;