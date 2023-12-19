import React from "react";
import { useState } from "react";
import { BsUpload } from "react-icons/bs";
import axios from "axios";


import { Header , Button} from "../../components";
const userInputs = [
  {
    id: "username",
    label: "Tên Đăng Nhập",
    type: "text",
    placeholder: "tendangnhap",
  },
  {
    id: "fullname",
    label: "Họ Tên",
    type: "text",
    placeholder: "Nguyễn Thuận",
  },
  {
    id: "phone",
    label: "Số Điện Thoại",
    type: "text",
    placeholder: "01234567",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
  },
  {
    id: "address",
    label: "Địa Chỉ",
    type: "text",
    placeholder: "USA",
  },
];
const CreateUser = ({reFetchUser}) => {

  const [info, setInfo] = useState({});
  const [success, setSuccess]  = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        ...info,
      };

      await axios.post("/api/auth/register", newUser);
      setSuccess(true);
      reFetchUser();
    } catch (err) {
      setSuccess(false)
      setErrorMessage(err.message)
      console.log(err);
    }
  };

  
  return (
    <form className="flex flex-col items-center bg-slate-100 p-10 rounded-lg">
            {userInputs.map((input) => (
              <div key={input.id} className="w-full mt-3">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {input.label}
                  </label>
                  <input
                    type={input.type}
                    onChange={handleChange}
                    id={input.id}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none"
                    placeholder={input.placeholder}
                    required
                  />
                </div>
            ))}
            {success ? (
              <p className="text-base text-green-400">
                Thêm người dùng thành công
              </p>
            ): (
              <p className="text-base text-red-600">{errorMessage}</p>
            )}
            <button
              className="w-[150px] p-[10px] border-none bg-sky-500 text-white font-bold mt-[10px] cursor-pointer rounded-full"
              onClick={handleClick}
            >
              Tạo
            </button>
          </form>
  );
};

export default CreateUser;
