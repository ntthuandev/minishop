import React from "react";
import { useParams } from "react-router-dom";
import { formatNumber } from "../../utils";
import { Header } from "../../components";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
const OrderDetail = () => {
  const { id } = useParams();
  
  const { data: order, loading, error } = useFetch(`/api/orders/${id}`);
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-1">
      <Header title="Chi Tiết Đơn Hàng" />

      <div className="flex flex-col w-full">
        <div className="flex flex-row gap-10">
          <div className="flex flex-col w-1/2 p-5 bg-white shadow-md rounded-2xl">
            <p className="text-2xl font-bold ml-5 mb-4 text-emerald-400">
              Thông Tin người đặt
            </p>
            <div className="flex gap-10 ">
              <div className="">
                <img
                  src={order?.user?.photo}
                  alt="user-img"
                  className="rounded-3xl w-[250px] h-auto"
                />
              </div>

              <div className="w-full flex flex-col justify-center">
                <p className="mb-4 text-lg">
                  Họ tên người đặt:{" "}
                  <span className="ml-4">{order?.user?.fullname}</span>
                </p>
                <p className="mb-4 text-lg">
                  Địa chỉ nhận:{" "}
                  <span className="ml-4">{order?.user?.address}</span>
                </p>
                <p className="mb-4 text-lg">
                  Số điện thoại:{" "}
                  <span className="ml-4">{order?.user?.phone}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-1/2 p-5 bg-white shadow-md rounded-2xl ">
            <div>
              <p className="text-xl text-cyan-500 font-bold mb-4">
                Thông tin đơn hàng
              </p>
            </div>

            <div>
              <p className="mb-3 text-lg">
                Mã Đơn Hàng :{" "}
                <span className="ml-3 font-semibold">{order._id}</span>
              </p>

              <p className="mb-3 text-lg">
                Ngày đặt hàng :{" "}
                <span className="ml-3">{order?.createdAt?.slice(0,10)}</span>
              </p>
              <p className="mb-3 text-lg">
                Tổng Tiền:{" "}
                <span className="ml-3 font-medium text-red-600">{`${formatNumber(
                  order.subtotal
                )} Vnd`}</span>
              </p>
              <p className="mb-3 text-lg">
                Phí Vân Chuyển:{" "}
                <span className="ml-3 font-medium text-red-600">{`${formatNumber(
                  order.shippingFee
                )} Vnd`}</span>
              </p>
              <p className="mb-3 text-lg">
                Số Tiền Thanh Toán:{" "}
                <span className="ml-3 font-medium text-red-600">{`${formatNumber(
                  order.total
                )} Vnd`}</span>
              </p>

              <div className="mt-10">
                <p className="font-bold text-">
                  Tình Trạng Đơn Hàng:{" "}
                  <span className="px-4 py-2 ml-5 font-medium blue_gradient rounded-lg">
                    {order.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col p-5 mt-10 bg-white shadow-lg rounded-2xl">
          <p className="text-2xl font-bold ml-5 mb-4 text-rose-700">
            Danh Sách Các Sản Phẩm
          </p>

          <div className="flex  gap-5">
            {order?.orderItems?.map((item) => (
              <div className=" flex flex-3 flex-col border rounded-lg p-2" key={item.product}>
                <div className="p-5 bg-white rounded-lg m-5">
                  <Link to={`/products/${item.product}`}>
                    <img
                      src={item.image}
                      alt="produc-images"
                      className="w-full h-[200px]"
                    />
                  </Link>
                </div>
                <div className="px-5">
                  <p>
                    Mã SP: <span className="ml-3">{item.product}</span>
                  </p>
                  <p>
                    Số lượng: <span className="ml-3">X {item.amount}</span>
                  </p>
                  <p>
                    Giá bán:{" "}
                    <span className="ml-3">
                      {" "}
                      {formatNumber(item.price)} Vnd
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
