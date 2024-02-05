import React from "react";
// import NavbarComponent from "../components/NavbarComponent";
import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (
    <div>
      {/* <NavbarComponent /> */}
      <Outlet />
    </div>
  );
};

