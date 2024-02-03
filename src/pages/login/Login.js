import React from "react";
import "./login.scss";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Login() {
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
        <Button variant="contained" fullWidth>Login</Button>
      </div>
    </div>
  );
}
