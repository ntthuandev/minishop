import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";
const ProductItem = ({ data, handleDelete, handleEdit, handleView }) => {
  return (
    <div className="flex flex-col border p-6 justify-center text-black-100 bg-primary-blue-100 hover:bg-white hover:shadow-md rounded-3xl overflow-hidden">
      <div className="flex-1">
        <img
          src={data.image}
          alt="product"
          className="w-full h-[150px] object-contain"
          onClick={() => handleView(data._id)}
        />
      </div>

      <div className="flex flex-col mt-3">
        <h3 className=" whitespace-nowrap font-satoshi font-semibold text-gray-900 mb-2">
          {data.name}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          Loại SP: <span className="ml-3 font-semibold"> {data.category}</span>
        </p>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 bg-[#FFF0F0] rounded-10 my-2">
        <p className="text-sm font-semibold text-[#D46F77]">
          Đã bán: {data.sales}
        </p>
        <div className="w-[1px] h-full border border-slate-500"></div>
        <p className="text-sm font-semibold text-[#D46F77]">
          Còn tồn: {data.inventory}
        </p>
      </div>
      <div className="flex justify-center">
        <p className="font-semibold text-center">
          {formatCurrency(data.price)} Vnd
        </p>
      </div>
      <div className="mt-5 flex  justify-center items-center gap-4 border-t border-gray-100 pt-3">
        <p
          className="font-inter text-sm text-green-500 cursor-pointer"
          onClick={() => handleEdit(data._id)}
        >
          Cập nhật
        </p>
        <p
          className="font-inter text-sm text-red-500 cursor-pointer"
          onClick={() => handleDelete(data._id)}
        >
          Xoá
        </p>
      </div>
    </div>
  );
};

const ProductLIstGrid = ({
  products,
  handleDelete,
  handleEdit,
  handleView,
}) => {
  return (
    <div className="md:grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-5 gap-6 mx-5 my-5">
      {products?.map((item) => (
        <div key={item._id} className="col-span-1">
          <ProductItem
            data={item}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleView={handleView}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductLIstGrid;
