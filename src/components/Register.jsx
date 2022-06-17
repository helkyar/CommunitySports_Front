import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import { useCallback, useContext } from "react";
import UserContextProvider from "contexts/user";

const genders = ['male', 'female', 'other']

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email()
    .min(6, "el campo debe tener minimo 6 caracteres"),
  password: yup
    .string()
    .trim()
    .min(6, "el campo debe tener minimo 6 caracteres"),
  /*   username: yup
      .string()
      .trim()
      .min(6, 'el campo debe tener minimo 6 caracteres')
    ,
    email: yup
      .string()
      .email()
      .required('email is required')
    ,
    age: yup
      .date()
      .required('date of birth is required')
    ,
    password: yup
      .string()
      .trim()
      .min(6, 'el campo debe tener minimo 6 caracteres')
    ,
    passwordConfirmation: yup
      .string()
      .trim()
      .oneOf([yup.ref('password'), null], 'passwords must match')
    ,
    genre: yup
      .string()
      .oneOf(genders)
      .required(),
  
    subscriber: yup
      .boolean()
   */
})


export const Register = () => {
  const { jwt, setJWT, user, setUser } = useContext(UserContextProvider);
  const navigate = useNavigate();
  const [t, i18n] = useTranslation("global");
  const { loger, isLogged } = useSession();



  const {
    control: controlRegister,
    handleSubmit,
    formState: { errors: errorsRegister },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const myNewUser = await startSession({
      username: data.username,
      age: data.age,
      genre: data.genre,
      email: data.email,
      password: data.password,
      subscriber: data.subscriber
    }, 'register')


    window.sessionStorage.setItem("jwt", myNewUser.token);
    window.sessionStorage.setItem("user", `{"id":"${myNewUser.id}", "email":"${myNewUser.email}"}`);
    setJWT(myNewUser.token)
    setUser({ id: myNewUser.id, email: myNewUser.email })

    console.log(myNewUser);
  };

  /*   useEffect(() => {
      if (isLogged) navigate("/");
    }, [isLogged, navigate]); */


  return (<>
    <form className="session-form" onSubmit={handleSubmit(onSubmit)}>
      <InputCustom
        name='username'
        control={controlRegister}
        label={t('forms.username')}
        id="username-input"
        errors={errorsRegister.username}
      />
      <InputCustom
        name="email"
        control={controlRegister}
        label={t('forms.email')}
        id="email-input"
        errors={errorsRegister.email}
      />
      <InputCustomPassword
        name="password"
        control={controlRegister}
        id="password-input"
        label={t('forms.password')}
        errors={errorsRegister.password}
      />
      <InputCustomPassword
        name="passwordConfirmation"
        control={controlRegister}
        id="passwordConfirmation-input"
        label={t('forms.confirm-password')}
        errors={errorsRegister.passwordConfirmation}
      />
      <DateCustom
        name='age'
        label={t('forms.Birthday')}
        errors={errorsRegister.age}
        control={controlRegister}
        type='date'
        id='date-input' />
      <SelectCustom
        name='genre'
        control={controlRegister}
        label={t('forms.gender')}
        id='gender-input'
        options={genders} />
      <CheckboxCustom
        name='subscriber'
        control={controlRegister}
        errors={errorsRegister.subscriber}
        label='subscriber' />
      <Button variant="contained" type="submit" className="list--buttons">
        {t('forms.register')}
      </Button>
    </form>

  </>
  );
};
