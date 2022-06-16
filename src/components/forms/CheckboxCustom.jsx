import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Controller } from "react-hook-form";

export default function CheckboxCustom({ name, control, label, id, errors,}){
    
    return <><Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          {...field}
          id={id}
          label={label}
          control={<Checkbox/>}  
          className="form--checkbox"
        />
      )}
    />
       <p className='date-error-message'>{errors ? errors.message : null}</p>
    </>

}