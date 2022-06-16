import React from 'react'
import { Controller } from "react-hook-form";
import {
    TextField
  } from "@mui/material";


export const DateCustom = ({name, control, label, id,type, errors,defaultValue,}) => {
    return (<>
        <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
            <TextField
            {...field}
            id={id}
            label={label}
            type={type}
            className='form--date-input'
            defaultValue={defaultValue ? defaultValue : null}
            InputLabelProps={{
                shrink:true
            }}
            />
        )}
        />
        <p className='date-error-message'>{errors ? errors.message : null}</p>
        
    </>
    )
}