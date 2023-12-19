import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import imageDb from "../../../config/Config";

import { getDownloadURL, uploadBytes } from "firebase/storage";
import { ref as storageRef } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import Loading from "../../../components/commom/Loading";
import { API_URL } from "../../../config/Url";
axios.defaults.withCredentials = true;
const CreateNewProduct = ({ isOpen, handleClose, reFetchProduct }) => {
  const [image, setImage] = useState();

  const [loading, setLoading] = useState(false);
  
    // useEffect(() => {
    //     return () => {
    //         image && URL.revokeObjectURL(image.preview)
    //     }
    // }, [image])
  const handlePreviewImage = (e) => {
    const file = e.target.files[0]

    file.preview = URL.createObjectURL(file)

    setImage(file);
  }

  const handleUploadImage =  () => {
    // if (image !== null) {
    //   const id = v4();
    //   const imgRef = storageRef(imageDb, `files/${id}`);
    //   uploadBytes(imgRef, image).then((value) => {
    //     getDownloadURL(value.ref).then((url) => {
            
    //        return url;
    //     });
    //   });
    // }

    return new Promise((resolve, reject) => {
        if (image !== null) {
          const id = v4();
          const imgRef = storageRef(imageDb, `files/${id}`);
          
          uploadBytes(imgRef, image)
            .then((value) => getDownloadURL(value.ref))
            .then((url) => resolve(url))
            .catch((error) => reject(error));
        } else {
          reject("No image selected");
        }
      });
  };
  const handleSubmit = async (values) => {
     const url =  await handleUploadImage();
    const dataProduct = { ...values, image: url };


    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/products/create`, dataProduct);
      if (res) {
        alert("Them san pham thanh cong");
        handleClose();
        reFetchProduct();
      }
    } catch (error) {
      alert(error);
    }
    setLoading(false);
  };
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Vui lòng nhập tên sản phẩm";
    }

    if (!values.category) {
      errors.category = "Vui lòng nhập loại sản phẩm";
    }

    if (!values.price) {
      errors.price = "Vui lòng nhập giá sản phẩm";
    } else
    {
      const regex  = /^[1-9]\d*(,\d{3})*(,\d{3})*(,\d{3})*(,\d{3})*(,\d{3})*(,\d{3})*(,\d{3})*(,\d{3})*(,\d{3})*(,\d{1,2})?/;
      if (!regex.test(values.price))
          errors.price = "Giá bán không hợp lệ!!!";
    }
    if (!values.inventory) {
      errors.inventory = "Vui lòng nhập số lượng sản phẩm";
    } else
    {
      const regex  = /^[1-9]\d*$/;
      if (!regex.test(values.inventory))
          errors.inventory = "Số lượng không hợp lệ!!!";
    }
    
    if (!values.description) {
      errors.description = "Vui lòng nhập thông tin mô tả sản phẩm";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      price: "",
      inventory: "",
      description: "",
      featured: false,
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
          <div>
            <p className="text-2xl font-semibold ">Thêm sản phẩm mới</p>

            <form
              onSubmit={formik.handleSubmit}
              className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md mt-5"
            >
              <div className="block text-base">
                <label className="text-gray-700" htmlFor="name">
                  Tên sản phẩm
                </label>
                <input
                  className="block w-full mt-1 text-base outline-none px-3 py-1 focus:border-purple-400 border"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  name="name"
                  id="name"
                />
                {formik.errors.name ? (
                  <p className="text-red-500">{formik.errors.name}</p>
                ) : null}
              </div>

              <div className="flex justify-between gap-10">
                <div className="flex-1">
                  <label className="text-gray-700">Loại sản phẩm</label>
                  <input
                    className="block w-full mt-1 text-base outline-none px-3 py-1 focus:border-purple-400 border"
                    type="text"
                    name="category"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                  />
                  {formik.errors.category ? (
                    <p className="text-red-500">{formik.errors.category}</p>
                  ) : null}
                </div>
                <div className="flex-1 ">
                  <label
                    className="text-gray-700"
                    htmlFor="featured"
                    name="featured"
                  >
                    Sản phẩm nổi bật
                  </label>
                  <div className="flex gap-10 mt-2 border px-2 py-1">
                    <div>
                      <input
                        type="radio"
                        name="featured"
                        onChange={formik.handleChange}
                        value={true}
                      />
                      <span>Nổi bật</span>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="featured"
                        onChange={formik.handleChange}
                        value={false}
                        checked
                      />
                      <span>Không nổi bật</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between gap-10">
                <div className="block text-base flex-1">
                  <label className="text-gray-700" name="price">
                    Giá bán
                  </label>
                  <input
                    className="block w-full mt-1 text-base outline-none px-3 py-1 focus:border-purple-400 border"
                    type="text"
                    name="price"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                  />
                  {formik.errors.price ? (
                    <p className="text-red-500">{formik.errors.price}</p>
                  ) : null}
                </div>
                <div className="block text-base flex-1">
                  <label className="text-gray-700">Số lượng</label>
                  <input
                    className="block w-full mt-1 text-base outline-none px-3 py-1 focus:border-purple-400 border"
                    type="text"
                    name="inventory"
                    onChange={formik.handleChange}
                    value={formik.values.inventory}
                  />
                  {formik.errors.inventory ? (
                    <p className="text-red-500">{formik.errors.inventory}</p>
                  ) : null}
                </div>
              </div>

              <div className="flex gap-10 justify-between">
                <div className="block text-base mt-5 flex-1">
                  <label className="text-gray-700" name="image">
                    Hình ảnh
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={(e) => handlePreviewImage(e)}
                  />

                  {image && (
                    <img
                      src={image.preview}
                      alt="image"
                      className="w-[150px] h-[150px]"
                    />
                  )}
                </div>

                <div className="flex flex-col mt-5 flex-1">
                  <label className="text-gray-700" name="description">
                    Thông tin mô tả sản phẩm
                  </label>
                  <textarea
                    rows={5}
                    type="text"
                    name="description"
                    className="block w-full mt-1 text-base outline-none px-3 py-1 focus:border-purple-400 border"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  />
                  {formik.errors.description ? (
                    <p className="text-red-500">{formik.errors.description}</p>
                  ) : null}
                </div>
              </div>
              <div>
                {loading && (<Loading />)}
              </div>
              <div className="flex justify-end gap-5 mt-10">
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

export default CreateNewProduct;
