import React, { useEffect, useState } from "react";
import "./sidebar.scss";
import { Link, useLocation } from "react-router-dom";

const pathConfig = {
  "/": 1,
  "/members": 2,
  "/shakhas": 3,
};

export default function Sidebar() {
  const [activeTab, setActiveTab] = useState(1);

  const { pathname } = useLocation();
  useEffect(() => {
    setActiveTab(pathConfig[pathname]);
    console.log(pathname);
  }, [pathname]);

  return (
    <div className="sidebar">
      <Link to="/">
        <div className={`sidebar-item ${activeTab === 1 && "active"}`}>
          Add member
        </div>
      </Link>
      <Link to="/members">
        <div className={`sidebar-item ${activeTab === 2 && "active"}`}>
          Members
        </div>
      </Link>
      <Link to="/shakhas">
        <div className={`sidebar-item ${activeTab === 3 && "active"}`}>
          Shakhas
        </div>
      </Link>
    </div>
  );
}
