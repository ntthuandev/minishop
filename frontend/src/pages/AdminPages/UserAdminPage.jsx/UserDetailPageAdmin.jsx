import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import useFetch from "../../../hook/useFetch";
import OrderDetailAdminPage from "../OrderAdminPage/OrderDetailAdminPage";
import { useOrderDetail } from "../../../context/OrderDetailContext";
import Loading from "../../../components/commom/Loading";


const OrderItem = ({order, index}) => {
    const {setIdOrder, openOrderDetail} = useOrderDetail()
    const handleViewDetail = (id, e) => {
        e.stopPropagation()
        setIdOrder(id)
        openOrderDetail()

    }
    return (
        <div className="flex gap-10 border p-2 pl-10 rounded-xl" onClick={(e) => handleViewDetail(order._id, e)}>
            <div className="flex items-center justify-center">
                <span className="text-xl font-semibold border border-blue-400 px-4 py-2 rounded-full ">{index+1}</span>
            </div>
            <div className="flex flex-col gap-2">
                <p>Mã đơn hàng: <span className="text-base font-semibold">{order._id}</span></p>
                <p>Số lượng sản phẩm: <span >{order.orderItems.length}</span></p>
                <p>Tình trạng: <span  className={`px-2 py-1 font-semibold leading-tight ${
            order.status !== "Chưa thanh toán"
              ? "bg-red-100 text-red-700"
              : " text-green-700 bg-green-100 "
          } rounded-full`}>{order.status}</span></p>
            </div>

            
        </div>
    )
}


const UserDetailPageAdmin = ({ isOpen, handleClose , idUser}) => {
    const {data, loading, error} = useFetch(`/orders/order/${idUser}`)
    
  return (
    <div
      className={`fixed inset-0 justify-center items-center z-50 ${
        isOpen ? "flex" : "hidden"
      }`}
    >
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={handleClose}
      ></div>

      <div className="fixed  p-10 max-w-full max-h-[90vh] w-2/3 bg-white shadow-sm rounded-lg overflow-y-auto">
        <div className="flex flex-col">
          <div className="cursor-pointer text-black px-3 py-2 flex justify-end">
            <IoCloseOutline
              onClick={handleClose}
              className="text-4xl hover:bg-gray-100 rounded-lg"
            />
          </div>
          <div>
            <p className="text-2xl font-semibold">Thông tin khách hàng</p>

            {loading ? (<Loading />): (
                <div className="flex flex-col">
                    <div className="mt-4 flex gap-4 border p-2 rounded-lg">
                        <img src={data?.user?.photo} className="w-[64px] h-[64px] object-cover rounded-lg"/>
                        <div className="">
                            <p className="font-semibold">{data?.user?.fullname}</p>
                            <span>{data?.user?.username}</span>
                            <p>{data?.user?.phone}</p>
                        </div>
                    </div>

                    <div className="mt-5 ">
                        <p className="text-xl font-semibold">Các đơn hàng gần đây</p>

                        {
                            data.count > 0 ? (
                                <div >
                                    <p>Số lượng đơn hàng: <span>{data.count}</span></p>

                                  <div className="flex flex-col gap-3 ">
                                    {data.orders.map((order, index)=> (
                                        <OrderItem key={order._id} order={order} index={index} />
                                    ))}
                                  </div>
                                </div>

                            ) :
                            (
                                <p className="text-xl text-center">Chưa có đơn hàng nào</p>
                            )
                        }
                    </div>
                </div>

            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailPageAdmin;
