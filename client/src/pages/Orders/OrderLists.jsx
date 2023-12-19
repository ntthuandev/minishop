import React from "react";
import { Header, Button, DataTable } from "../../components";
import { useState, useEffect } from "react";
import { formatNumber } from "../../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import useFetch from "../../hooks/useFetch";

import { data } from "autoprefixer";
const OrderItem = ({ data, handleView, handleDelete }) => {
  const handleExport = () => {
    return axios({
      url: `/api/orders/export/detail/${data._id}`,
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
  return (
    <div className="table-row-group text-center h-[50px]">
      <div className="relative top-3 p-2 flex items-center">
        <img
          className="rounded-full w-[40px] h-[40px]"
          src={data?.user?.photo}
          alt="user"
        />
        <p className="font-medium text-gray-800 ml-3"> {data?.user?.fullname}</p>
      </div>
      <div className="table-cell p-2">
        <p className="text-left align-middle">{data?.user?.address}</p>
      </div>
      <div className="table-cell p-2">
        <p className="text-left align-middle">{data?.user?.phone}</p>
      </div>
      <div className="table-cell p-2">
        <p className="text-left align-middle font-medium text-green-500">
          {formatNumber(data.total)} Vnd
        </p>
      </div>
      <div className="table-cell p-2">
        {" "}
        <p className="text-base text-center border rounded-lg p-2">
          {data.status}
        </p>
      </div>
      <div className="table-cell p-2">
        <div className="p-2 h-full whitespace-nowrap flex items-center gap-5 ">
          <p
            className=" text-sm blue_gradient cursor-pointer"
            onClick={() => handleView(data._id)}
          >
            Xem
          </p>
          <p
            className="text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete(data._id)}
          >
            Xoá
          </p>

          <p
            className="text-sm green_gradient cursor-pointer"
            onClick={() => handleExport()}
          >
            Xuất Excel
          </p>
        </div>
      </div>
    </div>
  );
};
const OrderLists = () => {
  const [paginationOrder, setPaginationOrder] = useState({});
  const [page, setPage] = useState(1);
  const [dataOrder, setDataOrder] = useState([]);
  const pageSize = 4;

  const [searchText, setSearchText] = useState("");
  const [dataSearch, setDataSearch] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const url = `/api/orders?page=${page}&limit=${pageSize}`;



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setPaginationOrder(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  useEffect(() => {
    setDataOrder(paginationOrder.orders);
  }, [paginationOrder.orders]);

  const count = paginationOrder.count;
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/orders/${id}`);
      setDataOrder(dataOrder.filter((item) => item._id !== id));
      setDataSearch(dataSearch.filter((item) => item._id !== id))
    } catch (err) {
      console.log(err);
    }
  };
  const handleView = (id) => {
    navigate(`/orders/${id}`);
  };
  const handleChange = (even, value) => {
    setPage(value);
  };

  const { data: orderDataSearch } = useFetch(
    `/api/orders/searchorder/result?searchOrder=${searchText}`
  );
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        setDataSearch(orderDataSearch);
      }, 500)
    );
  };

  const handlDownload =  () => {
    return axios({
      url: "/api/orders/export/order",
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
  if (error) return <p>Somethink went wrong</p>;
  if (loading) return <p>Loading ...</p>;
  return (
    <div className="flex flex-col  m-2 md:m-10 ">
      <Header category="Trang" title="Danh Sách Đơn Hàng" />
      <div className="flex justify-between mx-5">
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng ..."
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>

        <Button  title="Xuất Báo Cáo" bgColor="bg-green-400" handleClick={handlDownload}/>
      </div>
      <div className="mt-5 px-5 py-3 rounded-lg">
        <div className="bg-white rounded-xl p-3 shadow-lg table table-auto w-full">
          <div className="table-header-group">
            <div className="table-cell text-base p-2 text-[#888da9]">
              <p className="font-semibold">Tên người dùng</p>
            </div>
            <div className=" table-cell text-base p-2 text-[#888da9]">
              <p className="font-semibold ">Địa chỉ nhận hàng</p>
            </div>
            <div className=" table-cell text-base p-2 text-[#888da9]">
              <p className="font-semibold ">Số điện thoại</p>
            </div>
            <div className="table-cell text-base p-2 text-[#888da9]">
              <p className="font-semibold ">Tổng đơn hàng</p>
            </div>
            <div className="table-cell text-base p-2 text-[#888da9]">
              <p className="font-semibold text-center">Tình trạng đơn hàng</p>
            </div>
            <div className="table-cell text-base p-2 text-[#888da9]"></div>
          </div>
          {searchText ? (
            <>
              {dataSearch?.map((item) => (
                <OrderItem
                  key={item._id}
                  data={item}
                  handleView={handleView}
                  handleDelete={handleDelete}
                />
              ))}
            </>
          ) : (
            <>
              {dataOrder?.map((item) => (
                <OrderItem
                  key={item._id}
                  data={item}
                  handleView={handleView}
                  handleDelete={handleDelete}
                />
              ))}
            </>
          )}
        </div>
      </div>
      {!searchText && (
        <div className="mt-5 flex justify-center">
          <Pagination
            size="large"
            count={Math.round(count / pageSize) || 0}
            color="primary"
            shape="rounded"
            page={page}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default OrderLists;
