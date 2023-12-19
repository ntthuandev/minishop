import React from "react";
import { useNavigate } from "react-router-dom";
import { Header, Button, DataTable } from "../../components";
import { useState, useEffect } from "react";

import { Pagination } from "@mui/material";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

// icon
import {AiOutlineClose} from "react-icons/ai"
import CreateUser from "./CreateUser";

const UserItem = ({ data, handleView, handleDelete }) => {
  return (
    <div className="table-row-group border-t-1">
      <div className="table-cell p-2">
        <div className="relative top-3 p-2 h-full whitespace-nowrap flex items-center justify-start gap-5">
          <img
            className="rounded-full w-[40px] h-[40px] object-cover"
            src={data.photo}
            alt="user"
          />
          <p className="font-medium text-center text-gray-800 ml-3">
            {" "}
            {data.fullname}
          </p>
        </div>
      </div>

      <div className="table-cell p-2 ">
        <p className="text-left">{data.username}</p>
      </div>
      <div className="table-cell p-2">
        <p className="text-left font-medium text-green-500">{data.address}</p>
      </div>
      <div className="table-cell p-2">
        {" "}
        <p className="text-base text-center border rounded-lg p-2">
          {data.phone}
        </p>
      </div>
      <div className="table-cell p-2">
        <div className="p-2 h-full whitespace-nowrap flex items-center gap-5 ">
          <p
            className=" text-sm blue_gradient cursor-pointer"
            onClick={() => handleView(data._id)}
          >
            Xem chi tiết
          </p>
          <p
            className="text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete(data._id)}
          >
            Xoá
          </p>
        </div>
      </div>
    </div>
  );
};

const UserLists = () => {
  const [dataUser, setDataUser] = useState([]);
  const [dataFetch, setDataFetch] = useState({});
  const [open, setOpen] = useState(false)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);


  const [searchUserData, setSearchUserData] = useState([]); // data search

  const pageSize = 8;


  const url = `/api/users?page=${page}&limit=${pageSize}`;

  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url);
        setDataFetch(res.data);
        
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  useEffect(() => {
    setDataUser(dataFetch.users);
  }, [dataFetch.users]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setDataFetch(res.data)
    } catch (err) {
      setError(err);
    }
    setLoading(false);
    setOpen(false)
  };

  const totalUser = dataFetch.totalUser;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      alert("Đã xoá thành công");
      reFetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handleView = (id) => {
    navigate(`/users/${id}`);
  };
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen((prev => !prev))
  };

  const handleChange = (even, value) => {
    setPage(value);
  };

  const { data: searchData } = useFetch(
    `/api/users/user/search?searchText=${searchText}`
  );

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        setSearchUserData(searchData);
      }, 500)
    );
  };

  const handleClose= () => {
    setOpen((prev => !prev))
  }
  if (error) return <p>Somethink went wrong</p>;
  if (loading) return <p>Loading ...</p>;
  return (
    <div className="relative m-2 md:m-10 mt-10 p-2  rounded-3xl">
      <Header category="Trang" title="Danh Sách Khách Hàng" />
      <div className="flex justify-between">
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Tìm kiếm tên khách hàng..."
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
        </form>
        <Button title="+ Thêm Khách Hàng" handleClick={handleClick} />
      </div>

      <div className="mt-5 px-5 py-3 rounded-lg">
        <div className="bg-white rounded-xl p-3 shadow-lg table table-auto w-full border-collapse">
          <div className="table-header-group border-b-1 h-[50px] ">
            <div className="table-cell text-base p-2 text-[#888da9]">
              <p className="font-semibold ">Tên người dùng</p>
            </div>
            <div className=" table-cell text-base p-2 text-[#888da9]">
              <p className="font-semibold ">Tên tài khoản</p>
            </div>
            <div className="table-cell text-base p-2 text-[#888da9]">
              <p className="font-semibold ">Địa Chỉ</p>
            </div>
            <div className="table-cell text-base p-2 text-[#888da9]">
              <p className="font-semibold text-center">Điện Thoại</p>
            </div>
            <div className="table-cell text-base p-2 text-[#888da9]"></div>
          </div>

          {searchText ? (
            <>
              {searchUserData.length < 1 ? (
                <div className="flex justify-center mt-10 w-full">
                  <p className=" text-xl font-bold text-red-400">
                    Không tìm thấy thông tin người dùng
                  </p>
                </div>
              ) : (
                <>
                  {searchUserData?.map((item) => (
                    <UserItem
                      key={item._id}
                      data={item}
                      handleView={handleView}
                      handleDelete={handleDelete}
                    />
                  ))}
                </>
              )}
            </>
          ) : (
            <>
              {dataUser?.map((item) => (
                <UserItem
                  key={item._id}
                  data={item}
                  handleView={handleView}
                  handleDelete={handleDelete}
                />
              ))}
            </>
          )}
        </div>
        {!searchText && (
          <div className="mt-5 flex justify-center">
            <Pagination
              size="large"
              count={Math.round(totalUser / pageSize) || 0}
              color="primary"
              shape="rounded"
              page={page}
              onChange={handleChange}
            />
          </div>
        )}
      </div>

      <div className={`absolute ${open ? "block" : "hidden"} top-[-100px] right-0 bottom-0 left-0  rounded-lg`}>
        <div className="relative bg-green-100 m-[50px] px-20 py-10 rounded-xl shadow-xl">
          <div className="flex justify-between mb-5">
            <h3 className="text-2xl font-bold">Thêm khách hàng</h3>
            <div>
              <AiOutlineClose className="text-3xl" onClick={handleClose}/>
            </div>
          </div>
          <CreateUser reFetchUser={reFetch} />
         
        </div>
      </div>
    </div>
  );
};

export default UserLists;
