import React from "react";
import { useEffect } from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useStateContext } from "../context/ContextProvider";
const NavButton = ({ customFunc, icon, }) => (
    <button
      type="button"
      onClick={() => customFunc()}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
);
const Navbar = () => {
  const { activeMenu, setActiveMenu, setScreenSize, screenSize } =
    useStateContext();
  const {user} = useContext(AuthContext)
  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        icon={<AiOutlineMenu />}
      />
      
      <div className="flex">
        <NavButton
          title="Chat"
          dotColor="#03C9D7"
          icon={<BsChatLeft />}
        />
        <NavButton
          title="Notification"
          icon={<RiNotification3Line />}
        />
        
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          >
            <img
              className="rounded-full w-8 h-8"
              src={user?.photo}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {user?.fullname}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-16 mr-5" />
          </div>
       
      </div>
    </div>
  );
};

export default Navbar;
