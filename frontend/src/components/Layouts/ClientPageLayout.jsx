import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../commom/Navbar";
import ProductList from "../ClientComponents/ProductList";
import Hero from "../ClientComponents/Hero";
import ProductFeature from "../ClientComponents/ProductFeature";
const ClientPageLayout = () => {
  return (
    <div className="w-max-[1200px] mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ClientPageLayout;
