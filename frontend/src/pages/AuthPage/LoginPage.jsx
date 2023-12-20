import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {API_URL} from "../../config/Url"
const LoginPage = () => {
  
  const [dataLogin, setDataLogin] = useState({ username: "", password: "" });
  const [noValueUserName, setNoValueUserName] = useState(false);
  const [noValuePassword, setNoValuePassword] = useState(false);

  const {error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  // lay du lieu tu input
  const handleChange = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    if (id === "username") {
      if (!value) setNoValueUserName(true);
      else {
        setNoValueUserName(false);
        setDataLogin({ ...dataLogin, [e.target.id]: value });
      }
    }
    if (id === "password") {
      if (!value) setNoValuePassword(true);
      else {
        setNoValuePassword(false);
        setDataLogin({ ...dataLogin, [e.target.id]: value });
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dataLogin.username === "" || dataLogin.password === "") {
      if (dataLogin.username === "") setNoValueUserName(true);
      if (dataLogin.password === "") setNoValuePassword(true);
      return;
    }
    
    // call api
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        `${API_URL}/auth/login`,
        dataLogin,  { withCredentials: true }
      );
      if (res.data) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "Đăng nhập thất bại" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    <div className="p-10 bg-slate-200 h-[100vh]">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-bold">Xin Chào</p>
        <p className="text-lg my-5 ">
          Đăng nhập để thực hiện các chức năng của hệ thống
        </p>
      </div>
      <div className="flex justify-around mt-1">
        <form className="bg-white flex-1 flex flex-col items-center justify-center rounded-lg shadow-lg">
          <div className="">
            <label className="text-lg">Tên đăng nhập</label>
            <div className="relative">
              <input
                type="text"
                id="username"
                className="w-full text-base rounded-lg border-gray-200 p-4 pe-12 border-b-2 outline-none"
                placeholder="Nhập tên đăng nhập"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {noValueUserName && (
              <span className="text-red-400">
                Tên đăng nhập không được trống
              </span>
            )}
          </div>

          <div className="mt-5">
            <label className="">Mật khẩu</label>
            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-base border-b-2 outline-none"
                placeholder="Nhập tên đăng nhập"
                id="password"
                onChange={(e) => handleChange(e)}
              />
            </div>
            {noValuePassword && (
              <span className="text-red-400">Mật khẩu không được trống</span>
            )}
          </div>
            <p className="mt-3 text-center">Chưa có tài khoản? <a href="/register" className="text-green-500">Đăng ký</a></p>
          <div className="flex flex-col gap-3">
            {error && <span className="text-red-500">{error.message}</span>}
            <button
              className="px-10 py-4 bg-blue-500 hover:opacity-80 text-white rounded-xl mt-2"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Login
            </button>
          </div>
        </form>
        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            src="https://nhaxinh.com/wp-content/uploads/2023/07/BST-Coastal-3-3.jpg"
            className=" h-full w-full object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
