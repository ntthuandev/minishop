import React from "react";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const SignIn = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/api/auth/login", credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  return (
    // <div classNameName="p-3 max-w-lg mx-auto">
    //   <h1 classNameName="text-3xl text-center font-semibold my-7">Sign In</h1>
    //   <form onSubmit={handleSubmit} classNameName="flex flex-col gap-4">
    //     <input
    //       type="text"
    //       placeholder="username"
    //       classNameName="border p-3 rounded-lg"
    //       id="username"
    //       onChange={handleChange}
    //     />
    //     <input
    //       type="password"
    //       placeholder="password"
    //       classNameName="border p-3 rounded-lg"
    //       id="password"
    //       onChange={handleChange}
    //     />

    //     <button
    //       disabled={loading}
    //       classNameName="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
    //     >
    //       {loading ? "Loading..." : "Sign In"}
    //     </button>
    //   </form>
    //   {error && <p classNameName="text-red-500 mt-5">{error}</p>}
    // </div>

    <section className="relative flex flex-wrap lg:h-screen lg:items-center m-50 p-20">
      <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Xin chào!</h1>

          <p className="mt-4 text-gray-500">
            Đăng nhập để thực hiện các chức năng của hệ thống
          </p>
        </div>

        <form action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div>
            <label  className="sr-only">
              Tên Đăng Nhập
            </label>

            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm border-b-2 outline-none"
                placeholder="Nhập tên đăng nhập"
                id="username"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Mật khẩu
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm border-b-2 outline-none"
                placeholder="Nhập mật khẩu"
                id="password"
                onChange={handleChange}
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className=" rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              onClick={handleSubmit}
            >
             {loading ? "Loading..." : "Đăng Nhập"}
            </button>
          </div>
        </form>

        {error && <p classNameName="text-red-500 mt-5">{error}</p>}
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Welcome"
          src="https://nhaxinh.com/wp-content/uploads/2023/07/BST-Coastal-3-3.jpg"
          className="absolute inset-0 h-full w-full object-cover rounded-xl"
        />
      </div>
    </section>
  );
};

export default SignIn;
