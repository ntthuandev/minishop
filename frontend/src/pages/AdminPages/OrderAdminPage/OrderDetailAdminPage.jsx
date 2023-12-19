import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import useFetch from "../../../hook/useFetch";
import { formatDay } from "../../../utils/formatDay";
import { formatCurrency } from "../../../utils/formatCurrency";
import { useOrderDetail } from "../../../context/OrderDetailContext";
import { API_URL } from "../../../config/Url";

const OrderItem = ({ orderItem }) => {
  return (
    <div className="flex items-center space-x-2 mb-5">
      <img
        src={orderItem.image}
        alt={orderItem.name}
        className="w-20 h-12 object-cover"
      />
      <div className="flex-grow">
        <div>
          {orderItem.name}{" "}
          {orderItem.amount > 1 && (
            <span className="text-lg text-gray-500">x{orderItem.amount}</span>
          )}
        </div>
        <div className="text-base text-gray-500">
          {formatCurrency(orderItem.price)}
        </div>
      </div>
      <div className="text-lg">
        {formatCurrency(orderItem.price * orderItem.amount)}
      </div>
    </div>
  );
};

const OrderDetailAdminPage = ({ isOpen, idOrder }) => {
  const {closeOrderDetail} = useOrderDetail()
  const { data, loading, error } = useFetch(`${API_URL}/orders/${idOrder}`);




  if (error)
    return (
      <p className="text-xl text-red-600">Không thể lấy dữ liệu đơn hàng</p>
    );
  return (
    <div
      className={`fixed inset-0 z-50 items-center flex justify-center ${
        isOpen ? "block" : "hidden"
      } `}
    >
      <div
        className="absolute inset-0 flex justify-center bg-black opacity-50"
        onClick={closeOrderDetail}
      ></div>

      <div className="fixed p-5 rounded-lg max-w-full w-2/3  bg-white shadow-lg">
        <div className="flex flex-col">
          <div className="cursor-pointer text-black px-3 py-2 flex justify-end">
            <IoCloseOutline
              onClick={closeOrderDetail}
              className="text-4xl hover:bg-gray-100 rounded-lg"
            />
          </div>
          <div className="">
            <p className="text-2xl font-semibold ">Chi tiết đơn hàng</p>

            {loading ? (
              <p>Đang thông tin đơn hàng...</p>
            ) : (
              <div className="mt-6 flex gap-10 pl-10">
                <div>
                  <p className="text-lg">
                    Mã đơn hàng:
                    <span className="font-semibold ml-3">{data._id}</span>
                  </p>
                  <div className="border rounded-lg p-2 flex mt-3">
                    <img
                      src={data?.user?.photo}
                      alt="user_phot"
                      className="w-[48px] h-[48px] object-cover rounded-full"
                    />
                    <div className="ml-5">
                      <p>{data?.user?.fullname}</p>
                      <span>{data?.user?.username}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-5 mt-4">
                    <p>Ngày đặt hàng: {formatDay(data.createdAt)}</p>
                    <p>
                      Tình trạng:{" "}
                      <span
                        className={`px-2 py-1 font-semibold leading-tight ${
                          data.status === "Chưa Thanh Toán"
                            ? "bg-red-100 text-red-700"
                            : " text-green-700 bg-green-100 "
                        } rounded-full`}
                      >
                        {data.status}
                      </span>{" "}
                    </p>
                    <p>Số điện thoại: {data.phoneOrder}</p>
                    <p>Địa chỉ nhận hàng: {data.addressOrder}</p>
                  </div>
                </div>
                <div>
                  <p className="text-lg font-semibold">Danh sách sản phẩm</p>
                  <div>
                    {data?.orderItems?.map((order) => (
                      <OrderItem key={order.product} orderItem={order} />
                    ))}
                  </div>

                  <div className="flex gap-3 flex-col items-end border p-4 rounded-lg shadow-md">
                    <p>Tổng tiền: {formatCurrency(data.subtotal)}</p>
                    <p>Phí vận chuyển: {formatCurrency(data.shippingFee)}</p>
                    <p className="bg-blue-600 rounded-lg text-white px-3 py-2">
                      Số tiền thanh toán: {formatCurrency(data.total)}
                    </p>
                  </div>
                </div>
                
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailAdminPage;
