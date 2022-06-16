import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSession } from "helpers/session/useSession";
import { Button } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputCustom from "./forms/InputCustom";
import { SelectCustom } from "./forms/SelectCustom";
import { DateCustom } from "./forms/DateCustom";
import InputCustomPassword from "./forms/InputCustomPassword";
import CheckboxCustom from "./forms/CheckboxCustom";
import startSession from "helpers/session/session";

const genders = ['male','female','other']

const schema = yup.object().shape({
<<<<<<< HEAD
  username:yup
  .string()
  .trim()
  .min(6,'el campo debe tener minimo 6 caracteres')
  ,
  email : yup
  .string()
  .email()
  .required('email is required')
  ,
  age:yup 
  .date()
  .required('date of birth is required')
  ,
  password:yup
  .string()
  .trim()
  .min(6,'el campo debe tener minimo 6 caracteres')
  ,
  passwordConfirmation : yup
  .string()
  .trim()
  .oneOf([yup.ref('password'),null],'passwords must match')
  ,
  genre : yup
  .string()
  .oneOf(genders)
  .required(),

  subscriber:yup
  .boolean()
  .required()

})

=======
  username: yup
    .string()
    .trim()
    .min(6, "el campo debe tener minimo 6 caracteres"),
  email: yup.string().email().required("email is required"),
  age: yup.date().required("date of birth is required"),
  password: yup
    .string()
    .trim()
    .min(6, "el campo debe tener minimo 6 caracteres"),
  passwordConfirmation: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), null], "passwords must match"),
  gender: yup.string().required(),
});
>>>>>>> feb51f6c6f771ce6f01c8333bcd75496e2fe3d63

export const Register = () => {
  const navigate = useNavigate();
  const { loger, isLogged } = useSession();

  const {
    control: controlRegister,
    handleSubmit,
    formState: { errors: errorsRegister },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
<<<<<<< HEAD
    startSession({
      name:data.name,
      age:data.age,
      genre:data.genre,
      email:data.email,
      password:data.password,
      subscriber:data.subscriber
    },'register')
   
=======
    console.log(data);
    /*  e.preventDefault();
    //(!) Validation logic: should be separated form the view
    if (!username.trim() || !password.trim()) {
      console.log("Introduce valid credentials");
      return;
    }
    const credentials = { username, password };
    //------------------------------------------------------
    await register(credentials, "register");

    // Maybe an ineficient way to handle login
    await loger(credentials);
    setUsername("");
    setPassword(""); */
>>>>>>> feb51f6c6f771ce6f01c8333bcd75496e2fe3d63
  };

  useEffect(() => {
    if (isLogged) navigate("/");
  }, [isLogged, navigate]);

<<<<<<< HEAD
  return (<>
      <form className="session-form" onSubmit={handleSubmit(onSubmit)}>
      <InputCustom
          name='username'
=======
  return (
    <>
      <form
        className="register-form session-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputCustom
          name="username"
>>>>>>> feb51f6c6f771ce6f01c8333bcd75496e2fe3d63
          control={controlRegister}
          label="userName"
          id="username-input"
          errors={errorsRegister.username}
        />
        <InputCustom
          name="email"
          control={controlRegister}
          label="email"
          id="email-input"
          errors={errorsRegister.email}
        />
        <InputCustomPassword
          name="password"
          control={controlRegister}
          id="password-input"
          label="password"
          errors={errorsRegister.password}
        />
        <InputCustomPassword
          name="passwordConfirmation"
          control={controlRegister}
          id="passwordConfirmation-input"
          label="confirm password"
          errors={errorsRegister.passwordConfirmation}
        />
        <DateCustom
<<<<<<< HEAD
        name='age'
        label='Birthday'
        errors={errorsRegister.age}
        control={controlRegister}
        type='date'
        id='date-input'/>
        <SelectCustom
          name='genre'
          control={controlRegister}
          label='gender'
          id='gender-input'
          options={genders}/>
          <CheckboxCustom
          name='subscriber'
          control={controlRegister}
          errors={errorsRegister.subscriber}
          label='subscriber'/>
=======
          name="age"
          label="date of birth"
          errors={errorsRegister.age}
          control={controlRegister}
          placeholder="date of birth"
          id="date-input"
        />
        <SelectCustom
          name="gender"
          control={controlRegister}
          label="gender"
          id="gender-input"
          options={["male", "female", "other"]}
        />
>>>>>>> feb51f6c6f771ce6f01c8333bcd75496e2fe3d63
        <Button variant="contained" type="submit" className="list--buttons">
          Register
        </Button>
      </form>
     
    </>
  );
};
