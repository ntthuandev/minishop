import React, { useState, useEffect } from "react";
import useFetch from "../../../hook/useFetch";
import useFetchPaginate from "../../../hook/useFetchPaginate";
import { formatDay } from "../../../utils/formatDay";
import axios from "axios";
import OrderDetailAdminPage from "./OrderDetailAdminPage";
import { useOrderDetail } from "../../../context/OrderDetailContext";
import Loading from "../../../components/commom/Loading";

const OrderItem = ({ data, handleDeleteOrder, handleViewDetail, handleExportOrderDetail, handleCheckOrder }) => {
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
            <div
              className="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            ></div>
          </div>
          <div>
            <p className="font-semibold">{data?.user?.fullname}</p>
            <p className="text-xs text-gray-600">{data?.user?.username}</p>
          </div>
        </div>
      </td>

      <td className="px-4 py-3 text-sm text-center">{data.phoneOrder}</td>
      <td className="px-4 py-3 text-sm">
        <span
          className={`px-2 py-1 font-semibold leading-tight ${
            data.status === "Chưa Thanh Toán"
              ? "bg-red-100 text-red-700"
              : " text-green-700 bg-green-100 "
          } rounded-full`}
        >
          {data.status}
        </span>
      </td>

      <td className="px-4 py-3 text-sm">{formatDay(data.createdAt)}</td>
          <td className="px-4 py-3">
            <div className="flex items-center text-sm">
              {data.isCheck ? (<span className="bg-blue-500 hover:opacity-90 text-white px-2 py-1 rounded-md">Đã duyệt</span>) : (
                <button className="font-bold text-blue-500 hover:opacity-90 px-2 py-1" onClick={() => handleCheckOrder(data._id)}>Duyệt đơn</button>
              )}
            </div>
          </td>
      <td className="px-4 py-3">
        <div className="flex items-center space-x-4 text-sm">
          <button 
            onClick={() => handleViewDetail(data._id)}
            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-blue-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
          >
            Xem
          </button>
          <button
            onClick={() => handleExportOrderDetail(data._id)}
            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
          >
            Xuất đơn hàng
          </button>
          <button
            onClick={() => handleDeleteOrder(data._id)}
            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
          >
            Xoá
          </button>
        </div>
      </td>
    </tr>
  );
};

const OrderListAdminPage = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);

  const [searchText, setSearchText] = useState(""); // set text seach
  const [searchTimeout, setSearchTimeout] = useState(null); // set time search product

    //const [isOpenDetail, setIsOpenDetail] = useState(false);
    //const [idOrderDetail, setIdOrderDetail] = useState();
    const {setIdOrder, openOrderDetail} = useOrderDetail()
  const { data, loading, error, reFetch } = useFetchPaginate("/orders");
  useEffect(() => {
    if (loading) return;
    setOrders(data[page]);
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

  const handleData = (list)  => {
    let newData = [];
    list.forEach((item) => {
      newData = [...newData, ...item]
    })

    return newData
  }

  const dataForSearch = handleData(data);
  const handleDeleteOrder = async (id) => {
    try {
      const res = await axios.delete(`/orders/${id}`);

      if (res) alert(res.data);
      reFetch();
    } catch (error) {
      alert(error);
    }
  };


  const handleViewDetail = (id) => {
    setIdOrder(id);
    openOrderDetail()
  };

  const handleCheckOrder = async (id) => {
    try {
      const res = await axios.put(`/orders/${id}`)
      if(res.data) {
        alert("Đơn hàng đã được duyệt");
        reFetch();
      }
    } catch (error) {
      alert(error.response.data)
    }
  }
  // handle search order
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return dataForSearch.filter(
      (item) =>
        regex.test(item?.user?.username) ||
        regex.test(item?.user?.fullname) ||
        regex.test(item._id) ||
        regex.test(item.phoneOrder)
 
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setOrders(searchResult);
      }, 500)
    );
  };

  // handle export order details
  const handleExportOrderDetail = (id) => {
    return axios({
      url: `/orders/export/detail/${id}`,
      method: 'GET',
      responseType: 'blob',
    })
      .then(response => {
        const href = window.URL.createObjectURL(response.data);
  
        const anchorElement = document.createElement('a');
  
        anchorElement.href = href;
        anchorElement.download = "chitiet_donhang.xlsx";
  
        document.body.appendChild(anchorElement);
        anchorElement.click();
  
        document.body.removeChild(anchorElement);
        window.URL.revokeObjectURL(href);
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }

  // handle export order
  const handleExportOrder =  () => {
    return axios({
      url: "/orders/export/order",
      method: 'GET',
      responseType: 'blob',
    })
      .then(response => {
        const href = window.URL.createObjectURL(response.data);
  
        const anchorElement = document.createElement('a');
  
        anchorElement.href = href;
        anchorElement.download = "donhang.xlsx";
  
        document.body.appendChild(anchorElement);
        anchorElement.click();
  
        document.body.removeChild(anchorElement);
        window.URL.revokeObjectURL(href);
      })
      .catch(error => {
        console.log('error: ', error);
      });
  }
  return (
    <div className=" px-10 bg-gray-50 mt-6 mb-5">
      <div className="flex flex-col">
        <p className="text-2xl font-semibold">Danh sách đơn hàng</p>

        <div className="mt-2 flex justify-between">
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            className="px-4 py-2 border outline-none rounded-lg focus:border-blue-400 w-3/4"
            onChange={(e) => handleSearchChange(e)}
          />

          <button className="px-3 bg-green-500 text-white rounded-lg opacity-90" onClick={handleExportOrder}>
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* order list */}
      {loading && <Loading />}
      {!loading && (
        <div className="w-full overflow-hidden rounded-lg shadow-xs mt-5">
          <div className="w-full overflow-x-auto ">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b ">
                  <td className="px-4 py-3">Khách hàng</td>
                  <td className="px-4 py-3">Số điện thoại</td>
                  <td className="px-4 py-3">Tình Trạng</td>
                  <td className="px-4 py-3">Ngày đặt</td>
                  <td className="px-4 py-3">Duyệt đơn</td>
                  <td className="px-4 py-3"></td>
                </tr>
              </thead>

              <tbody className="bg-white divide-y ">
                {orders?.map((order) => (
                  <OrderItem
                    key={order._id}
                    data={order}
                    handleDeleteOrder={handleDeleteOrder}
                    handleViewDetail={handleViewDetail}
                    handleExportOrderDetail={handleExportOrderDetail}
                    handleCheckOrder={handleCheckOrder}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      )}

      {/* pagination */}
      {!loading && !searchText && (
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

      {/* {isOpenDetail && <OrderDetailAdminPage isOpen={isOpenDetail} handleClose={handleToggle} idOrder={idOrderDetail}/>} */}
    </div>
  );
};

export default OrderListAdminPage;
