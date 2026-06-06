import React from "react";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";
// import Home from "./Pages/Home"


export default function App() {
  return (
    <>
      <Navbar />

      <Outlet />

    </>


  );
}