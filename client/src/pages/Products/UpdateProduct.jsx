import React from "react";
import FileBase from "react-file-base64";
import { useState, useEffect } from "react";
import { Button } from "../../components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const inputs = [
  {
    id: "name",
    label: "Tên Sản Phẩm",
    type: "text",
    placeholder: "Tên sản phẩm...",
  },
  {
    id: "category",
    label: "Loại Sản Phẩm",
    type: "text",
    placeholder: "Loại sản phẩm...",
  },
  {
    id: "price",
    label: "Giá Sản Phẩm",
    type: "text",
    placeholder: "Giá sản phẩm...",
  },
  {
    id: "inventory",
    label: "Số lượng",
    type: "text",
    placeholder: "Số lượng sản phẩm...",
  },
];
const UpdateProduct = () => {
  const [dataFile, setDataFile] = useState("");
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/api/products/${id}`);
  const [info, setInfo] = useState({
    name: "",
    category: "",
    price: "",
    inventory: "",
    description: "",
    image: "",
  });

  useEffect(() => {setInfo(prev => ({...prev, ...data}))}, [data]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/products/update/${id}`, info);
      alert("Cập nhật sản phẩm thành công");
      navigate("/products")
    } catch (error) {
      alert(error.message);
    }
  };

  const clear = () => {
    setInfo({ creator: "", title: "", message: "", tags: "", image: "" });
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <p className="text-3xl mb-4">Tạo Sản Phẩm</p>
      <form className="flex  flex-col ">
        <div className="flex flex-row gap-10">
          <div className="w-3/4">
            {inputs.map((input) => (
              <div
                key={input.id}
                className="w-full flex justify-between items-center mb-4"
              >
                <label
                  htmlFor={input.id}
                  className="w-1/4 text-base font-bold flex-2"
                >
                  {input.label}
                </label>
                <input
                  id={input.id}
                  type={input.type}
                  onChange={handleChange}
                  placeholder={input.placeholder}
                  value={info[input.id]}
                  className="border-1 outline-none rounded-lg px-3 py-2  w-3/4 border-gray-400"
                />
              </div>
            ))}

            <div className="w-full flex justify-between items-center mb-4">
              <label className="w-1/4 text-base font-bold flex-2">Mô tả</label>
              <textarea
                id="description"
                placeholder="Thông tin mô tả sản phẩm..."
                value={info.description}
                onChange={handleChange}
                rows={5}
                type="text"
                className="border-1 outline-none rounded-lg px-3 py-2  w-3/4 border-black"
              />
            </div>
          </div>
          <div className="w-1/4">
            <div className="h-full">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => {
                  setDataFile(base64);
                  setInfo((prev) => ({ ...prev, image: base64 }));
                }}
              />

              <img
                src={
                  info.image
                    ? info.image
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                accessKey="select-img"
                className="w-full h-3/5 object-cover mt-5 rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5">
          <Button
            title="Cập nhật sản phẩm"
            handleClick={handleSubmit}
            type="submit"
          />
          <Button title="Xoá" bgColor="bg-rose-600" handleClick={clear} />
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
