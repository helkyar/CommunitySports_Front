import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "helpers/session/useSession";
import InputCustom from "./forms/InputCustom";
import InputCustomPassword from "./forms/InputCustomPassword";
import { Button } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const schema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .min(6, "el campo debe tener minimo 6 caracteres"),
  password: yup
    .string()
    .trim()
    .min(6, "el campo debe tener minimo 6 caracteres"),
});

export const Login = () => {
  const navigate = useNavigate();
  const { loger, isLogged, logfail } = useSession();

  const {
    control: controlLogin,
    handleSubmit,
    formState: { errors: errorsLogin },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);
    //(!) Validation logic: should be separated form the view
    try {
      const { username, password } = data;
      const credentials = {
        username,
        password,
      };
      loger(credentials);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLogged) navigate("/");
    if (logfail) alert("Retry");
  }, [logfail, isLogged, navigate]);

  return (
    <>
      <form
        className="login-form session-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputCustom
          name="username"
          control={controlLogin}
          label="username"
          id="username-input"
          errors={errorsLogin.username}
        />
        <InputCustomPassword
          name="password"
          control={controlLogin}
          id="password-input"
          label="password"
          errors={errorsLogin.password}
        />
        <Button variant="contained" type="submit" className="list--buttons">
          Login
        </Button>
      </form>
    </>
  );
};
