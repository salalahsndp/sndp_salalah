import React from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Login() {
  const navigate = useNavigate();

  let onLogin = () => {
    navigate("/");
  };

  return (
    <div className="login">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <TextField
          className="input-field"
          id="outlined-basic"
          label="Username"
          variant="outlined"
          size="small"
          fullWidth
        />
        <TextField
          className="input-field"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          size="small"
          fullWidth
        />
        <Button variant="contained" fullWidth onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  );
}
