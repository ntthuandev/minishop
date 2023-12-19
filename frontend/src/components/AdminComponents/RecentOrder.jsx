import React, { useState } from "react";
import useFetch from "../../hook/useFetch";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RecentOrder = () => {
  const [orderRecent, setOrderRecent] = useState([]);

  const { data , loading, error } = useFetch("/orders//top/resent");

  const navigate = useNavigate();
  const handleViewOrders = () => {
    navigate("/admin/orders");
  };


  useEffect(() => {
    if (loading) return;
    setOrderRecent(data?.orderRecent);
  }, [loading]);
  return (
    <div className="relative flex-1 flex flex-col gap-5 mt-5 rounded-xl shadow-lg p-10">
      <p className="text-xl font-semibold">Đơn hàng gần đây</p>

      {orderRecent?.map((item) => (
        <div
          key={item._id}
          className=" relative flex gap-10 px-3 py-2 items-center border rounded-lg"
        >
          <span className="absolute top-[-20%] right-0 bg-green-400 text-white text-sm border rounded-full font-semibold p-2">
            Gần đây
          </span>
          <img
            src={item?.user?.photo}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p>{item?.user?.fullname}</p>
            <span>{item?.user?.username}</span>
          </div>
          <span className={`px-2 py-1 font-semibold leading-tight ${
            item.status !== "Chưa thanh toán"
              ? "bg-red-100 text-red-700"
              : " text-green-700 bg-green-100 "
          } rounded-full`}>{item.status}</span>
        </div>
      ))}

      <button
        className="bg-blue-500 text-white px-5 py-2 rounded-xl hover:opacity-90"
        onClick={handleViewOrders}
      >
        Danh sách đơn hàng
      </button>
    </div>
  );
};

export default RecentOrder;
