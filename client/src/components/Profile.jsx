import React from "react";
import useFetch from "../hooks/useFetch";
import { Button } from "../components";
import { useParams, useNavigate } from "react-router-dom";
const Profile = ({ data }) => {
  const { id } = useParams();
  const {
    data: orderData,
    loading,
    error,
  } = useFetch(`/api/orders/order/${id}`);

  const navigate = useNavigate();
  //console.log(orderData.orders);
  return (
    <div className=" flex w-full flex-col">
      <div className="flex m-10 flex-row gap-10">
        <div className=" flex flex-col justify-center item-center">
          <img
            src={data.photo}
            alt="avatar"
            className="w-[100px] h-[100px] object-cover rounded-full"
          />
          <span className="mt-5">Tên Đăng Nhập</span>
          <span className="  font-bold text-center text-cyan-500">
            {data.username}
          </span>
        </div>

        <div className=" flex flex-col w-[50%] gap-5">
          <div className=" border-b-1 border-black px-4 py-5">
            <p className="font-bold text-red-500">
              Họ Tên:{" "}
              <span className="text-black text-base ml-5 font-light">
                {data.fullname}
              </span>
            </p>
          </div>
          <div className="border-b-1 border-black px-4 py-5">
            <p className="font-bold text-red-500">
              Số Điện Thoại:{" "}
              <span className="text-black text-base ml-5 font-light">
                {data.phone}
              </span>
            </p>
          </div>
          <div className="border-b-1 border-black px-4 py-5">
            <p className="font-bold text-red-500">
              Địa Chỉ:{" "}
              <span className="text-black text-base ml-5 font-light">
                {data.address}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="">
        <p className="text-xl font-semibold mb-5">Các Đơn Đặt Hàng</p>
        {orderData.count > 0 ? (
          <div className="flex  gap-10 ">
            {orderData?.orders?.map((order) => (
              <div className="bg-white shadow-lg w-1/2 rounded-lg p-5  overflow-hidden" key={order._id}>
                <div className="border-b-1 p-2">
                  <p>Mã đơn: <span className="ml-2 blue_gradient">{order._id}</span></p>  
                 </div>

                 <div className="mt-3 border-b-1 p-2 h-[200px] overflow-scroll">
                {order.orderItems.map((item) => (
                  <div key={item.product} >
                    <div className="flex gap-5 m-2">
                      <img src={item?.image} className="w-[50px] h-[50px]" />
                      <div>
                        <p>
                          Tên SP: <span>{item.name}</span>
                        </p>
                        <p>
                          Số lượng: <span>X {item.amount}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                 </div>
                <div className="flex justify-center mt-5">
                  <Button
                    title="Xem Chi Tiết"
                    width="w-full"
                    handleClick={() => {
                      navigate(`/orders/${order._id}`);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-2xl text-red-700 font-bold">Chưa có đơn hàng nào</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
