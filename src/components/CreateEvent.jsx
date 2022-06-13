import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectCustom } from "./forms/SelectCustom";
import InputCustom from "./forms/InputCustom";
import { Button } from "@mui/material";
import { DateCustom } from "./forms/DateCustom";

const sports = [
    'Atletismo','Baloncesto','Badminton','Balonmano','Esgrima','Futbol','Natación','Padel','Squash','Tenis','Tenis mesa','Tiro arco','Unihockey','Volleyball','Waterpolo'
]

const schema = yup.object().shape({
    sport : yup
    .string()
    .required('sport is required'),
    participants : yup
    .number()
    .positive()
    .required('number of participants is required'),
    date :yup
    .date()
    .required('date is required'),
    time : yup
    .string()
    .required('time is required'),
    gender : yup
    .string()
    .oneOf(['male','female','mix'])
    .required('sex is required'),
    nameCenter: yup
    .string()
    .trim()
    .required('name of the center is required'),
    address : yup
    .string()
    .trim()
    .required('address is required'),
    mobility : yup
    .boolean()
    .required('mobility is required'),
    ind_magnetic: yup
    .boolean()
    .required('ind_magnetic is required'),
    email : yup
    .string()
    .email()
    .trim()
    .required('email is required') 

})

export const CreateEvent = () => {

    const {
        control: controlEvents,
        handleSubmit,
        formState: { errors: errorsEvent },
    } = useForm({
        resolver: yupResolver(schema),
    });
    
    const onSubmit = async (data) => {
        console.log(data)
    };

    return (
        <form className="create-event-form" onSubmit={handleSubmit(onSubmit)}>
            <SelectCustom
            name='sport'
            control ={controlEvents}
            label='sport'
            id='sport-input'
            options = {sports}/>
            <InputCustom
            name='participants'
            control={controlEvents}
            label='participants'
            id='participants-input'
            errors={errorsEvent.participants}
            type='number'
            defaultValue={0}
            />
            <DateCustom
            name='date'
            label='Date'
            errors={errorsEvent.date}
            control={controlEvents}
            type='date'
            id='date-input'/>
             <DateCustom
            name='time'
            label='Time'
            errors={errorsEvent.time}
            control={controlEvents}
            type='time'
            id='date-input'/>

            <Button variant="contained" type="submit" className="list--buttons">
                Register 
            </Button>
        </form>
    )
    
}