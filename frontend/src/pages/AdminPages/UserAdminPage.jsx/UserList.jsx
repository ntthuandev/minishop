import React, {useState, useEffect} from "react";
import useFetch from "../../../hook/useFetch";
import useFetchPaginate from "../../../hook/useFetchPaginate";

import CreateUserAdminPage from "./CreateUserAdminPage";
import axios from "axios";
import UserDetailPageAdmin from "./UserDetailPageAdmin";
import Loading from "../../../components/commom/Loading";
import { API_URL } from "../../../config/Url";


const UserItem = ({ data, handleDeleteUser, handleViewDetail }) => {
  return (
    <tr className="text-gray-700 ">
      <td className="px-4 py-3">
        <div className="flex items-center text-sm">
          <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
            <img
              className="object-cover w-full h-full rounded-full"
              src={data.photo}
              alt="image"
            />
          </div>
        </div>
      </td>

      <td className="px-4 py-3 text-sm text-center">{data.username}</td>
      <td className="px-4 py-3 text-sm text-center">
        <p className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
          {data.fullname}
        </p>
      </td>

      <td className="px-4 py-3 text-sm text-center">{data.phone}</td>

      <td className="px-4 py-3">
        <div className="flex items-center space-x-4 text-sm">
          <button onClick={() => handleViewDetail(data._id)} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-blue-600 rounded-lg focus:outline-none focus:shadow-outline-gray">
            Xem
          </button>
          <button onClick={() => handleDeleteUser(data._id)} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg focus:outline-none focus:shadow-outline-gray">
            Xoá
          </button>
        </div>
      </td>
    </tr>
  );
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState(""); // set text seach
  const [searchTimeout, setSearchTimeout] = useState(null); // set time search product

  const [isOpenCreateUser, setIsOpenCreateUser] = useState(false); // set open create user
  const [isOpenDetailUser, setIsOpenDetailUser] = useState(false); // set open detail user
  const [idDetailUser, setIdDetailUser] = useState() // set id for view detail user
  const { data, loading, error, reFetch } = useFetchPaginate(`${API_URL}/users`,);
  useEffect(() => {
    if (loading) return;
    setUsers(data[page]);
  }, [loading, page]);


  const handleData = (list)  => {
    let newData = [];
    list.forEach((item) => {
      newData = [...newData, ...item]
    })

    return newData
  }

  const dataForSearch = handleData(data);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return dataForSearch.filter(
      (item) =>
        regex.test(item.username) ||
        regex.test(item.fullname) ||
        regex.test(item._id) ||
        regex.test(item.phone)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setUsers(searchResult);
      }, 500)
    );
  };


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

  const handleDeleteUser = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/users/${id}`)
      if(res.data) alert(res.data)
      reFetch()
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const handeToggoleViewDetailUser = () => {
    setIsOpenDetailUser(prev => !prev)
  }

  const handleViewDetail = (id) => {
    setIdDetailUser(id);
    handeToggoleViewDetailUser()
  }

  const handleToggleCreateUserPage = () => {
    setIsOpenCreateUser(prev => !prev)
  }

  if(error) return (<p className="text-xl text-red-500">Không thể lấy danh sách khách hàng</p>)
  return (
    <div className=" px-10 bg-gray-50 mt-6 mb-5">
      <div className="flex flex-col">
        <p className="text-2xl font-semibold">Danh sách khách hàng</p>

        <div className="mt-2 flex justify-between">
          <input
            type="text"
            placeholder="Tìm kiếm khách hàng"
            className="px-4 py-2 border outline-none rounded-lg focus:border-blue-400 w-3/4"
            onChange={(e) => handleSearchChange(e)}
          />

          <button className="px-3 bg-green-500 text-white rounded-lg opacity-90" onClick={handleToggleCreateUserPage}>
            Thêm khách hàng
          </button>
        </div>
      </div>


      {/* user list */}
      {loading && (<Loading />)}
      {!loading && (
        <div className="w-full overflow-hidden rounded-lg shadow-xs mt-5">
            <div className="w-full overflow-x-auto ">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b ">
                    <td className="px-4 py-3 text-center">Ảnh</td>
                    <td className="px-4 py-3 text-center">Tên tài khoản</td>
                    <td className="px-4 py-3 text-center">Tên khách hàng</td>
                    <td className="px-4 py-3 text-center">Số điện thoại</td>
                    <td className="px-4 py-3"></td>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y ">
                  {users?.map((user) => (
                    <UserItem key={user._id} data={user} handleDeleteUser={handleDeleteUser}  handleViewDetail={handleViewDetail}/>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

      )}

        {!loading && !searchText && (
        <div className="flex justify-center flex-wrap gap-5">
          <button className="bg-transparent border-transparent font-semibo text-lg px-4 py-2 rounded-xl  cursor-pointer hover:border hover:border-blue-500" onClick={prevPage}>
            Trước
          </button>
          {data.map((item, index) => {
            return (
              <button
                key={index}
                className={`px-4 py-2 rounded-xl hover:border hover:border-blue-500 ${index === page ? "bg-blue-500 text-white" : null}`}
                onClick={() => handlePage(index)}
              >
                {index + 1}
              </button>
            );
          })}
          <button className="bg-transparent border-transparent font-semibo text-lg px-4 py-2 rounded-xl  cursor-pointer hover:border hover:border-blue-500" onClick={nextPage}>
            Sau
          </button>
        </div>
      )}

      {isOpenCreateUser && <CreateUserAdminPage isOpen={isOpenCreateUser} handleClose={handleToggleCreateUserPage} reFetchUsers={reFetch} />}
      {isOpenDetailUser && <UserDetailPageAdmin isOpen={isOpenDetailUser} handleClose={handeToggoleViewDetailUser} idUser={idDetailUser} />}
    </div>
  );
};

export default UserList;
