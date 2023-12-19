import React from "react";

const Input = ({ title }) => {
  return (
    <div className="w-full flex justify-between items-center mb-4">
      <label className="w-1/4 text-base font-bold flex-2">{title}</label>
      <input
        type="text"
        className="border-1 outline-none rounded-lg px-3 py-2  w-3/4 border-gray-400"
      />
    </div>
  );
};

export default Input;
