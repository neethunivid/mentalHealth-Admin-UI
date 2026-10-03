import { Typography, Grid } from '@mui/material'
import React, { ReactNode } from 'react'
import { useForm, Controller } from "react-hook-form";
import '../GrantRequest/styles.scss';

interface LayoutProps {

    name: string;
    control?: any;
    defaultValue?: any;
    textBoxEnabled?: boolean;
}
const InputEditComponent = ({ control, defaultValue, name, textBoxEnabled }: LayoutProps) => {
    return (
        <div>

            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <input
                        type="text"
                        //  className='edit-grid-root-input'
                        className='edit-grid-root-input'
                        {...field}
                        disabled={!textBoxEnabled}
                    />
                )}
            />



        </div>
    )
}

export default InputEditComponent;