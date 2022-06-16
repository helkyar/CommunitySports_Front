import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import register from "helpers/session/session";
import { useSession } from "helpers/session/useSession";
import { Button } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputCustom from "./forms/InputCustom";
import { SelectCustom } from "./forms/SelectCustom";
import { DateCustom } from "./forms/DateCustom";
import InputCustomPassword from "./forms/InputCustomPassword";

const schema = yup.object().shape({
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
  };

  useEffect(() => {
    if (isLogged) navigate("/");
  }, [isLogged, navigate]);

  return (
    <>
      <form
        className="register-form session-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputCustom
          name="username"
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
        <Button variant="contained" type="submit" className="list--buttons">
          Register
        </Button>
      </form>
    </>
  );
};
