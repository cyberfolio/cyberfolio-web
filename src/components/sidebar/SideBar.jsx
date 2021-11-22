import React from "react";
import "./SideBar.css";

export const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-appname unselectable">Portfolio Tracker</div>
      <div className="sidebar-wallet unselectable">0x38fd......e04e</div>
      <div className="sidebar-links">
        <div className="sidebar-link unselectable">Dashboard</div>
      </div>
    </div>
  );
};
