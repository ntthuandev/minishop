import React from "react";
import { formatNumber } from "../utils";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ data, handleDelete }) => {
    const id = data._id;
    const navigate = useNavigate();
    const handleView = () => {
        navigate(`/products/${id}`)
    }

    const handleEdit = () => {
        navigate(`/products/update/${id}`)
    }
  return (
    <div className="flex flex-col border p-6 justify-center text-black-100 bg-primary-blue-100 hover:bg-white hover:shadow-md rounded-3xl overflow-hidden">
      <div className="flex-1">
        <img
          src={data.image}
          alt="product"
          className="w-full h-[150px] object-contain"
          onClick={handleView}
        />
      </div>

      <div className="flex flex-col mt-3">
        <h3 className=" whitespace-nowrap font-satoshi font-semibold text-gray-900 mb-2">
          {data.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">Mã SP: {data._id}</p>
        <p className="text-sm text-gray-500 mb-2">Loại SP: <span className="ml-3 font-semibold"> {data.category}</span></p>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 bg-[#FFF0F0] rounded-10 my-2">
        <p className="text-sm font-semibold text-[#D46F77]">
          Đã bán: {data.sales}
        </p>
        <div className="w-[1px] h-full border border-slate-500"></div>
        <p className="text-sm font-semibold text-[#D46F77]">
          Số lượng còn: {data.inventory}
        </p>
      </div>
      <div className="">
        <p>Giá SP: <span className="font-semibold">{formatNumber(data.price)} Vnd</span></p>
      </div>
      <div className="mt-5 flex  justify-center items-center gap-4 border-t border-gray-100 pt-3">
        <p
          className="font-inter text-sm green_gradient cursor-pointer"
          onClick={handleEdit}
        >
          Cập nhật
        </p>
        <p
          className="font-inter text-sm orange_gradient cursor-pointer"
          onClick={() => handleDelete(id)}
        >
         Xoá
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
