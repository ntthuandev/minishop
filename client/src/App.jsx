import React from "react";
import { useContext } from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";

import { Home, SignIn, ErrorPage, Resport } from "./pages";
import { CreateUser, UserProfile, UserLists } from "./pages/Users";
import { OrderDetail, OrderLists } from "./pages/Orders";
import {CreateProduct, ProductDetail, Products, UpdateProduct}from "./pages/Products"
import { Navbar, Sidebar } from "./components";
import { useStateContext } from "./context/ContextProvider";
import { AuthContext } from "./context/AuthContext";
import "./App.css";
const App = () => {
  const { activeMenu } = useStateContext();

  const Layout = () => {
    return (
      <div className="flex relative">
        {activeMenu ? (
          <div className="w-52 fixed sidebar bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "  bg-main-bg min-h-screen ml-52 w-full  "
              : "bg-main-bg w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static navbar w-full ">
            <Navbar />
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <ProtectedRoute><Resport /></ProtectedRoute>
        },
        {
          path: "/resport",
          element: <ProtectedRoute><Resport /></ProtectedRoute>
        },
        {
          path: "/users",
          element: <ProtectedRoute><UserLists /></ProtectedRoute>
        },
        {
          path: "/users/create",
          element: <ProtectedRoute><CreateUser /></ProtectedRoute>
        },
        {
          path: "/users/:id",
          element: <ProtectedRoute>< UserProfile/></ProtectedRoute>
        },
        {
          path: "/products",
          element: <ProtectedRoute><Products /></ProtectedRoute>
        },
        {
          path: "/products/:id",
          element: <ProtectedRoute><ProductDetail /></ProtectedRoute>
        },
        {
          path: "/products/create",
          element: <ProtectedRoute><CreateProduct /></ProtectedRoute>
        },
        {
          path: "/products/update/:id",
          element: <ProtectedRoute><UpdateProduct /></ProtectedRoute>
        },
        {
          path: "/orders",
          element: <ProtectedRoute><OrderLists /></ProtectedRoute>
        },
        {
          path: "/orders/:id",
          element: <ProtectedRoute><OrderDetail /></ProtectedRoute>
        }
      ]
    },
    {
      path: "login",
      element: <SignIn />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;
