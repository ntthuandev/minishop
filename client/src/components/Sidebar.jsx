import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import {GrClose} from "react-icons/gr"
import { useStateContext } from '../context/ContextProvider';
import { links } from '../constants';
import {CiLogout} from "react-icons/ci"
import axios from 'axios';

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  //const [activeMenu, setActiveMenu] = useState(true)
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
const navigate = useNavigate();
  const handleLogout =  () => {
    axios.get(`/api/auth/logout`)
    localStorage.removeItem("user")
    
    navigate("/login")
  }

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg    text-md m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
             <SiShopware /> <span>MiniShop</span>
            </Link>
            
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                
                className=" text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden "
              >
                <GrClose />
              </button>
          </div>
          <div className="flex flex-col mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`${link.path}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}

          </div>
          <div className='flex  items-center m-2 text-base cursor-pointer' onClick={handleLogout}><CiLogout /> <p className='ml-3'>Logout</p></div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
