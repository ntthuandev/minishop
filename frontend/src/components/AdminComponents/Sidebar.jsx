import React , {useContext, useState} from "react";
import { Link, useLocation, useNavigate,  } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const links = [
  {
    name: "Khách Hàng",
    href: "/admin/users",
  },
  {
    name: "Sản Phẩm",
    href: "/admin/products",
  },
  {
    name: "Đơn hàng",
    href: "/admin/orders",
  },
  {
    name: "Lịch sử",
    href: "/admin/history",
  },
];
const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {dispatch} = useContext(AuthContext)
    const handleLogout = () => {
        dispatch({type: "LOGOUT"})
        navigate("/login")
    }
   return (
    <div className='flex fixed top-0 left-0 flex-col justify-between pb-10 p-5 w-64 h-[100vh] bg-white shadow-md border-r'>
        <div className='mt-5'>
            <Link to="/admin">
            <h1 className='text-2xl font-bold text-blue-500'>MiniShop</h1>
            
            </Link>
            <div className='mt-5'>
                <p className="text-lg font-semibold py-2">Quản Lý</p>
                <ul className="border-t py-4 pl-2 flex flex-col gap-2">
                    {links.map(link => (
                        <Link to={link.href}  key={link.name} className={`py-2 text-center rounded-lg ${link.href == location.pathname ? "bg-blue-500 text-white" : "bg-gray-100"}`}>{link.name}</Link>
                    ))}
                </ul>
            </div>

        </div>

        <button className='text-white py-1 bg-black rounded-lg' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
