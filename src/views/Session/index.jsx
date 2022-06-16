import React, { useState } from "react";
import { Login } from "components/Login";
import { Register } from "components/Register";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const Session = () => {

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
          {logView ? "Go Register" : "Go Login"}
        </Button>
      </div>
    </>
  );
};
