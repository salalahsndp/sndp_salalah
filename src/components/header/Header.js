import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";

export default function Header() {
  const onLogout = () => {

  }

  return (
    <div className="header">
      <Link to="/">
        <div className="logo">SNDP Salalah</div>
      </Link>
      <div className="logout" onClick={onLogout}>Logout</div>
    </div>
  );
}
