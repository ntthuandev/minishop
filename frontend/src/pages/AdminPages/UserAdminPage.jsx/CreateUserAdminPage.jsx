import { useFormik } from "formik";
import React, {useState } from "react";
import { IoCloseOutline } from "react-icons/io5";


import axios from "axios";
import Loading from "../../../components/commom/Loading";
import { API_URL } from "../../../config/Url";
axios.defaults.withCredentials = true;
const CreateUserAdminPage = ({ isOpen, handleClose, reFetchUsers }) => {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    //alert(JSON.stringify(values))
    const dataUser = {...values, password: values.username}
    setLoading(true);
    try {
        const res = await axios.post(`${API_URL}/users`, dataUser)

        if(res.data) setSuccess(res.data)
        setTimeout(() => {
          reFetchUsers();
          handleClose();
        }, 500)
    } catch (err) {
        setError(err.response.data.message)
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

    if (!values.fullname) {
      errors.fullname = "Vui lòng tên người dùng";
    }

    if (!values.phone) {
      errors.phone = "Vui lòng nhập số điện thoại";
    }else if(!validatephone)
    {
      errors.phone = "Số điện thoại không hợp lệ";

    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      fullname: "",
      phone: "",
      isAdmin: false,
    },
    validate,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className="absolute inset-0 flex justify-center  bg-black opacity-50"
        onClick={handleClose}
      ></div>
      <div className="fixed  p-5  rounded-lg max-w-full w-2/3 m-h-[90vh]  bg-white shadow-lg">
        <div className="flex flex-col ">
          <div className="cursor-pointer text-black px-3 py-2 flex justify-end">
            <IoCloseOutline
              onClick={handleClose}
              className="text-4xl hover:bg-gray-100 rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-2xl font-semibold ">Thêm người dùng mới</p>

            <form
              onSubmit={formik.handleSubmit}
              className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md mt-5 w-2/3"
            >
              <div className="block text-base">
                <label className="text-gray-700" htmlFor="name">
                  Tên tài khoản
                </label>
                <input
                  className="block w-full mt-1 text-base outline-none px-3 py-1 focus:border-purple-400 border"
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
              <div className="flex-1 ">
                  <label
                    className="text-gray-700"
                    htmlFor="featured"
                    name="featured"
                  >
                    Tạo tài khoản với
                  </label>
                  <div className="flex gap-10 mt-2 border px-2 py-1">
                    <div>
                      <input
                        type="radio"
                        name="isAdmin"
                        onChange={formik.handleChange}
                        value={true}
                      />
                      <span className="ml-3">Nhân viên</span>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="isAdmin"
                        onChange={formik.handleChange}
                        value={false}
                        checked
                        className="p-3"
                      />
                      <span className="ml-3">Khách hàng</span>
                    </div>
                  </div>
                </div>
                {loading && (<Loading />)}
                {error && (<p className="text-base text-red-500 text-center">{error}</p>)}
                {success && <p className="base text-center text-green-500">{success}</p>}
              <div className="flex justify-center gap-5 mt-10">
                <button
                  className="px-6 py-2 border border-black rounded-lg"
                  onClick={handleClose}
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 border bg-green-500 text-white hover:opacity-90 rounded-lg"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserAdminPage;
