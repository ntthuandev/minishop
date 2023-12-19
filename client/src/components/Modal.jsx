import React from 'react'
import {AiOutlineClose} from "react-icons/ai"
const Modal = ({ isOpen, handleClose, children}) => {
  return (
    <div className={`absolute ${isOpen ? "block" : "hidden"} top-[-100px] right-0 bottom-0 left-0  rounded-lg`}>
        <div className="relative bg-[#ECF9FF] m-[50px] px-10 py-5 rounded-xl shadow-xl ">
          <div className="flex justify-end mb-5  ">
            <div>
              <AiOutlineClose className="text-3xl" onClick={handleClose}/>
            </div>
          </div>
          {children}
        </div>
      </div>
  )
}

export default Modal