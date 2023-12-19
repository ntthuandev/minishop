import React from "react";
import FileBase from "react-file-base64";
import { useState, useEffect } from "react";
import { Button } from "../../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
const CreateProduct = ({reFetch, handleToggle}) => {
  const [dataFile, setDataFile] = useState("");
  const [info, setInfo] = useState({
    name: "",
    category: "",
    price: "",
    inventory: "",
    description: "",
    image: ""
  });
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setInfo((prev) => ({ ...prev, image: ""}));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/products/create", info)
      alert("Thêm sản phẩm thành công")

      clear();
      handleToggle()
      reFetch()
    } catch (error) {
      alert(error.message);
    }
  };

  const clear = () => {
    setInfo({
      name: "",
      category: "",
      price: "",
      inventory: "",
      description: "",
      image: "",
    })
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products`)
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="flex justify-start mb-4">
      <p className="text-3xl mb-4">Tạo Sản Phẩm</p>

      </div>
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
                onChange={handleChange}
                rows={5}
                type="text"
                className="border-1 outline-none rounded-lg px-3 py-2  w-3/4 border-black"
                value={info.description}
              />
            </div>
          </div>
          <div className="w-1/4 overflow-hidden">
            <div className="h-full">
              <FileBase
                type="file"
                multiple={false}
                 
                onDone={({ base64 }) => {setDataFile(base64); setInfo((prev) => ({ ...prev, image: base64 }))}}
              />

              <img
                src={
                  dataFile && info.image
                    ? dataFile
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
            title="Tạo sản phẩm"
            handleClick={handleSubmit}
            type="submit"
          />
          <Button title="Xoá" bgColor="bg-rose-600" handleClick={clear} />
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
