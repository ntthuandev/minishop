import React from "react";

const Button = ({ title, width, bgColor, type,handleClick }) => {
  return (
    <button
    type={type ?type: ""}
      className={`${width?width: "w-1/5"} border-none px-6 py-3 ${
        bgColor ? bgColor : "bg-cyan-400"
      } text-white text-xs font-bold text-center uppercase item-center rounded-lg hover:opacity-80`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
