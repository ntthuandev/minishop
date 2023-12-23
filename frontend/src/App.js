import React, { useContext } from "react";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";

import LoginPage from "./pages/AuthPage/LoginPage";
import HomePage from "./pages/AdminPages/HomePage";
import ClientPageLayout from "./components/Layouts/ClientPageLayout";
import HomeClientPage from "./pages/ClientPages/HomeClientPage";
import ProductList from "./components/ClientComponents/ProductList";
import ProductListAdmin from "./pages/AdminPages/ProductAdminPage/ProductListAdmin";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import Checkout from "./components/ClientComponents/Checkout";
import AdminPageLayout from "./components/Layouts/AdminPageLayout";
import UserList from "./pages/AdminPages/UserAdminPage.jsx/UserList";
import UploadImage from "./components/commom/UploadImage";
import OrderListAdminPage from "./pages/AdminPages/OrderAdminPage/OrderListAdminPage";
import { OrderDetailProvider } from "./context/OrderDetailContext";
import RegisterPage from "./pages/AuthPage/RegisterPage";
import HistoryList from "./pages/AdminPages/HistoryPage/HistoryList";

const ProtectRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user != null) {
    if (user.isAdmin) {
      return <Navigate to="/admin" />;
    } else return children;
  } else {
    return <Navigate to="/login" />;
  }
};

const router = createBrowserRouter([
  {
    path: "/",

    element: (
      <ShoppingCartProvider>
        <ClientPageLayout />
      </ShoppingCartProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectRoute>
            <HomeClientPage />
          </ProtectRoute>
        ),
      },
      {
        path: "/products",
        element: (
          <ProtectRoute>
            <ProductList />
          </ProtectRoute>
        ),
      },
      {
        path: "/orders",
        element: <div>Order</div>,
      },
      {
        path: "/orders/contact",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "/admin",

    element: (
      <OrderDetailProvider>
        <AdminPageLayout />
      </OrderDetailProvider>
    ),
    children: [
      { path: "/admin", element: <HomePage /> },
      { path: "/admin/users", element: <UserList /> },
      { path: "/admin/products", element: <ProductListAdmin /> },
      { path: "/admin/orders", element: <OrderListAdminPage /> },
      { path: "/admin/upload", element: <UploadImage /> },
      { path: "/admin/history", element: <HistoryList /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
