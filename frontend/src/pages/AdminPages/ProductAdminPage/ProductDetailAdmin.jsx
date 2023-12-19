import React from "react";
import useFetch from "../../../hook/useFetch";
import { IoCloseOutline } from "react-icons/io5";
import { formatCurrency } from "../../../utils/formatCurrency";
import Loading from "../../../components/commom/Loading";
import { API_URL } from "../../../config/Url";

const ProductDetailAdmin = ({ isOpen, handleClose, idProduct }) => {
  const { data, loading, error } = useFetch(`${API_URL}/products/${idProduct}`);

  if (error) return <p>Không thể lấy thông tin sản phẩm</p>;
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
      // content here
      {loading ? (
        <Loading />
      ) : (
        <div className="fixed  p-5  rounded-lg max-w-full w-2/3 m-h-[90vh]  bg-white shadow-lg">
          <div className="flex flex-col ">
            <div className="cursor-pointer text-black px-3 py-2 flex justify-end">
              <IoCloseOutline
                onClick={handleClose}
                className="text-4xl hover:bg-gray-100 rounded-lg"
              />
            </div>
            <div>
              <p className="text-2xl font-semibold ">
                Thông tin chi tiết sản phẩm
              </p>

              <div className="flex gap-10 justify-between mt-5 px-3 pb-10">
                <div className="rounded-lg">
                  <img
                    src={data.image}
                    alt="image_product"
                    className="w-[300px] h-64  object-cover rounded-lg shadow-md"
                  />
                  <p className="mt-3 text-base font-semibold">
                    Mã sản phẩm: <span className="font-normal">{data._id}</span>
                  </p>
                </div>

                <div className="flex flex-col  gap-4 flex-1">
                  <p className="text-xl font-bold">{data.name}</p>
                  <span className="text-lg">
                    Loại sản phẩm: {data.category}
                  </span>

                  <div className="flex gap-10">
                    <p className="px-3 py-2 rounded-lg bg-blue-400 text-white">
                      Số lượng bán: <span>{data.sales}</span>{" "}
                    </p>

                    <p className="px-3 py-2 rounded-lg bg-red-400 text-white">
                      Số lượng còn: <span>{data.inventory}</span>{" "}
                    </p>
                  </div>

                  <p className="text-lg">
                    Giá bán: <span className="font-semibold">{formatCurrency(data.price)}</span>
                  </p>
                    <div>
                        <span>Thông tin mô tả</span>
                        <p className="border p-5 rounded-xl border-blue-500 mt-2">{data.description}</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailAdmin;
