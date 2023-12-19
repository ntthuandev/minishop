import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Loading from "../../components/commom/Loading";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    //alert(JSON.stringify(values))
    const dataUser = { ...values };
    setLoading(true);
    try {
      const res = await axios.post("/auth/register", dataUser);

      if (res.data) {
        setTimeout(() => {
            alert("Tạo người dùng thành công");
            navigate("/login")
        }, 500)
      }
    } catch (err) {
      setError(err.response.data.message);
    }
    setLoading(false);
  };
  const validate = (values) => {
    const errors = {};
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    var validatephone = values.phone.match(phoneno);
    if (!values.username) {
      errors.username = "Vui lòng nhập tên tài khoản";
    }
    if (!values.password) {
      errors.password = "Vui lòng nhập mật khẩu";
    }
    if (!values.fullname) {
      errors.fullname = "Vui lòng tên người dùng";
    }

    if (!values.phone) {
      errors.phone = "Vui lòng nhập số điện thoại";
    } else if (!validatephone) {
      errors.phone = "Số điện thoại không hợp lệ";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      phone: "",
      password: "",
      isAdmin: false,
    },
    validate,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleLogin = () => {
    navigate("/login")
  }

  return (
    <div className="p-10 bg-slate-200 h-[100vh]">
      <div className="flex flex-col items-center">
        <p className="text-3xl font-bold">Xin Chào</p>
        <p className="text-lg my-5 ">
          Đăng ký tài khoản để thực hiện các chức năng của hệ thống
        </p>
      </div>
      <div className="flex justify-around mt-1">
        <form
          onSubmit={formik.handleSubmit}
          className=" flex flex-col justify-center items-center px-4 py-3 mb-8 bg-white rounded-lg shadow-md mt-5 flex-1"
        >
          <div className="block text-base">
            <label className="text-gray-700" htmlFor="name">
              Tên tài khoản
            </label>
            <input
              className="block  mt-1 text-base outline-none px-3 py-1 focus:border-purple-400 border w-full"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              name="username"
              id="username"
            />
            {formik.errors.username ? (
              <p className="text-red-500">{formik.errors.username}</p>
            ) : null}
          </div>
          <div className="block text-base">
            <label className="text-gray-700" htmlFor="name">
              Mật khẩu
            </label>
            <input
              className="block  mt-1 text-base outline-none px-3 py-1 focus:border-purple-400 border w-full"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              id="password"
            />
            {formik.errors.password ? (
              <p className="text-red-500">{formik.errors.password}</p>
            ) : null}
          </div>
          <div className="blook  text-base">
            <label className="text-gray-700" htmlFor="fullname">
              Tên người dùng
            </label>
            <input
              className="block w-full mt-1 text-base outline-none px-3 py-1 focus:border-purple-400 border"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.fullname}
              name="fullname"
              id="fullname"
            />
            {formik.errors.fullname ? (
              <p className="text-red-500">{formik.errors.fullname}</p>
            ) : null}
          </div>
          <div className="block text-base">
            <label className="text-gray-700" htmlFor="name">
              Số điện thoại
            </label>
            <input
              className="block w-full mt-1 text-base outline-none px-3 py-1 focus:border-purple-400 border"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phone}
              name="phone"
              id="phone"
            />
            {formik.errors.phone ? (
              <p className="text-red-500">{formik.errors.phone}</p>
            ) : null}
          </div>
          {loading && <Loading />}
          {error && (
            <p className="text-base text-red-500 text-center">{error}</p>
          )}
          <div className="flex justify-center gap-5 mt-10">
            <button
              onClick={handleLogin}
              className="px-6 py-2 border border-green-500 text-black hover:opacity-90 rounded-lg"
            >
              Đăng nhập
            </button>
            <button
              type="submit"
              className="px-6 py-2 border bg-green-500 text-white hover:opacity-90 rounded-lg"
            >
              Đăng ký
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

export default RegisterPage;
