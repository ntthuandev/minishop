import React, { useState, useEffect } from "react";
import useFetchPaginate from "../../../hook/useFetchPaginate";
import { formatDay } from "../../../utils/formatDay";
import axios from "axios";
import { useOrderDetail } from "../../../context/OrderDetailContext";
import Loading from "../../../components/commom/Loading";
import { API_URL } from "../../../config/Url";

const OrderItem = ({ data, reFetch }) => {
  const handleRestore = async (modelType, id, idHistory) => {
    let model;
    if (modelType === "User") {
      model = "users";
    } else if (modelType === "Product") {
      model = "products";
    } else {
      model = "orders";
    }

    try {
      const res = await axios.put(`${API_URL}/${model}/restore/${id}`, {
        idHistory,
      });

      if (res) alert(res.data);
      setTimeout(() => {
        reFetch();
      }, 500);
    } catch (error) {
      alert(error);
    }
  };
  const handelModelType = (modelType) => {
    switch (modelType) {
      case "User":
        return "Khách Hàng";
      case "Product":
        return "Sản Phẩm";
      case "Order":
        return "Đơn  hàng";

      default:
        return null;
    }
  };

  const handleAction = (action) => {
    switch (action) {
      case "create":
        return "Tạo";
      case "delete":
        return "Xoá";
      case "update":
        return "Cập nhật";
      case "CheckOrder":
        return "Duyệt Đơn Hàng";
      case "restore":
        return "Khôi Phục";
      default:
        return null;
    }
  };
  return (
    <tr className="text-gray-700 ">
      <td className="px-4 py-3">
        <div className="flex items-center text-sm">
          <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
            <img
              className="object-cover w-full h-full rounded-full"
              src={data?.user?.photo}
              alt="image"
            />
          </div>
          <div>
            <p className="font-semibold">{data?.user?.fullname}</p>
            <p className="text-xs text-gray-600">{data?.user?.username}</p>
          </div>
        </div>
      </td>

      <td
        className={`px-4 py-3 text-sm text-center`
      
      
      }
      >
        <p className={`w-full text-white px-4 py-2 rounded-lg ${
          data?.action === "create" && "bg-green-500"
        } ${data?.action === "delete" && "bg-red-500"}
        ${data?.action === "update" && "bg-yellow-500"}
        ${data?.action === "CheckOrder" && "bg-blue-400"}
        ${data?.action === "restore" && "bg-purple-500"}
        `}>
          {handleAction(data?.action)}  

        </p>
      </td>
      <td className="px-4 py-3 text-sm text-center">
        <span className={`px-2 py-1 font-semibold leading-tight rounded-full `}>
          {handelModelType(data?.modelType)}
        </span>
      </td>

      <td className="px-4 py-3 text-sm text-center">
        {formatDay(data?.timestamp)}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center text-sm">
          {data?.modelType === "Order" && (
            <div>
              <p className="font-semibold">Mã đơn hàng</p>
              <p className="text-xs text-gray-600">{data?.modelId?._id}</p>
            </div>
          )}

          {data.modelType === "Product" && (
            <>
              <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                <img
                  className="object-cover w-full h-full rounded-full"
                  src={data?.modelId?.image || data?.modelId?.photo}
                  alt="image"
                />
              </div>
              <div>
                <p className="font-semibold">{data?.modelId?.name}</p>
                <p className="text-xs text-gray-600">
                  {data?.modelId?.category}
                </p>
              </div>
            </>
          )}

          {data.modelType === "User" && (
            <>
              <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                <img
                  className="object-cover w-full h-full rounded-full"
                  src={data?.modelId?.photo}
                  alt="image"
                />
              </div>
              <div>
                <p className="font-semibold">{data?.modelId?.fullname}</p>
                <p className="text-xs text-gray-600">
                  {data?.modelId?.username}
                </p>
              </div>
            </>
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-center">
        {data?.action === "delete" && !data?.isRestore && (
          <buton
            onClick={() =>
              handleRestore(data?.modelType, data?.modelId?._id, data?._id)
            }
            className="text-green-500 px-2 py-1 rounded-xl font-semibold hover:cursor-pointer hover:bg-gray-100"
          >
            Khôi Phục
          </buton>
        )}
        {data?.action === "delete" && data?.isRestore && (
          <buton className="text-green-500 px-2 py-1 rounded-xl font-semibold opacity-50 line-through">
            Khôi Phục
          </buton>
        )}
      </td>
    </tr>
  );
};

const HistoryList = () => {
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(0);

  const { setIdOrder, openOrderDetail } = useOrderDetail();
  const { data, loading, error, reFetch } = useFetchPaginate(
    `${API_URL}/history`
  );
  useEffect(() => {
    if (loading) return;
    setHistory(data[page]);
  }, [loading, page]);

  // handle paginate
  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = data.length - 1;
      }
      return prevPage;
    });
  };

  const handlePage = (index) => {
    setPage(index);
  };
  // end handle paginate

  return (
    <div className=" px-10 bg-gray-50 mt-6 mb-5">
      <div className="flex flex-col">
        <p className="text-2xl font-semibold">Lịch Sử Làm Việc</p>
      </div>

      {/* order list */}
      {loading && <Loading />}
      {!loading && (
        <div className="w-full overflow-hidden rounded-lg shadow-xs mt-5">
          <div className="w-full overflow-x-auto ">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b ">
                  <td className="px-4 py-3 text-center">Người thực hiện</td>
                  <td className="px-4 py-3 text-center">Thực hiện</td>
                  <td className="px-4 py-3 text-center">Dữ liệu</td>
                  <td className="px-4 py-3 text-center">Ngày thực hiện</td>
                  <td className="px-4 py-3 text-center"></td>
                  <td className="px-4 py-3 text-center"></td>
                </tr>
              </thead>

              <tbody className="bg-white divide-y ">
                {history?.map((order) => (
                  <OrderItem key={order._id} data={order} reFetch={reFetch} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* pagination */}
      {!loading && (
        <div className="flex justify-center flex-wrap gap-5">
          <button
            className="bg-transparent border-transparent font-semibo text-lg px-4 py-2 rounded-xl  cursor-pointer hover:border hover:border-blue-500"
            onClick={prevPage}
          >
            Trước
          </button>
          {data.map((item, index) => {
            return (
              <button
                key={index}
                className={`px-4 py-2 rounded-xl hover:border hover:border-blue-500 ${
                  index === page ? "bg-blue-500 text-white" : null
                }`}
                onClick={() => handlePage(index)}
              >
                {index + 1}
              </button>
            );
          })}
          <button
            className="bg-transparent border-transparent font-semibo text-lg px-4 py-2 rounded-xl  cursor-pointer hover:border hover:border-blue-500"
            onClick={nextPage}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryList;
