import React, { useState } from "react";
import { Login } from "components/Login";
import { Register } from "components/Register";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

export const Session = () => {

  const [t, i18n] = useTranslation("global");
  const [logView, setLogView] = useState(true);
  return (
    <>
      {logView && <Login />}
      {!logView && <Register />}
      <div className="session-btn-container">
        <Button
          className="session-btn"
          onClick={() => setLogView((state) => !state)}
        >
          {logView ? t('forms.go-register') : t('forms.go-login')}
        </Button>
      </div>
    </>
  );
};
