import React, { useEffect, useState } from "react";
import useFetch from "../../../hook/useFetch";
import { formatCurrency } from "../../../utils/formatCurrency";
import useFetchPaginate from "../../../hook/useFetchPaginate";
import CreateNewProduct from "./CreateNewProduct";
import axios from "axios";
import UpdateProduct from "./UpdateProduct";
import ProductDetailAdmin from "./ProductDetailAdmin";
import Loading from "../../../components/commom/Loading";
import ProductLIstGrid from "../../../components/AdminComponents/ProductLIstGrid";

import { IoGridOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { API_URL } from "../../../config/Url";
const ItemTable = ({ data, handleDeleteProduct, handUpdateProduct, handleViewDetail }) => {
  return (
    <tr className="text-gray-700 ">
      <td className="px-4 py-3">
        <div className="flex items-center text-sm">
          <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
            <img
              className="object-cover w-full h-full rounded-full"
              src={data.image}
              alt="image"
            />
            <div
              className="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            ></div>
          </div>
          <div>
            <p className="font-semibold">{data.name}</p>
            <p className="text-xs text-gray-600">
              {formatCurrency(data.price)}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-3 text-sm text-center">{data.sales}</td>
      <td className="px-4 py-3 text-sm">
        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
          {data.inventory}
        </span>
      </td>

      <td className="px-4 py-3 text-sm">{data.category}</td>

      <td className="px-4 py-3">
        <div className="flex items-center space-x-4 text-sm">
          <button onClick={() => handleViewDetail(data._id)} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-blue-600 rounded-lg focus:outline-none focus:shadow-outline-gray">
            Xem
          </button>
          <button onClick={() => handUpdateProduct(data._id)} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray">
            Cập nhật
          </button>
          <button onClick={() => handleDeleteProduct(data._id)} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg focus:outline-none focus:shadow-outline-gray">
            Xoá
          </button>
        </div>
      </td>
    </tr>
  );
};
const ProductListAdmin = () => {
  const [products, setProducts] = useState([]); // set product list
  const [page, setPage] = useState(0); // set page pagination
  const { data, loading, error, reFetch } = useFetchPaginate(`${API_URL}/products`);

  const [isOpen, setIsOpen]  = useState(false); // open create product page
  const [isOpenUpdate, setIsOpenUpate] = useState(false) // open update product page
  const [idProductUpdate, setIdProductUpdate] = useState() // set id product for update
  const [isOpenDetail, setIsOpenDetail] = useState(false) // open view detail product
  const [idProductDetail, setIdProudctDetail] = useState() // set id product for view detail

  const [searchText, setSearchText] = useState(""); // set text seach
  const [searchTimeout, setSearchTimeout] = useState(null); // set time search product

  const [active, setActive] = useState("table");


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
        regex.test(item.name) ||
        regex.test(item.category) ||
        regex.test(item._id)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setProducts(searchResult);
      }, 500)
    );
  };

  useEffect(() => {
    if (loading) return;
    setProducts(data[page]);
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

  // handle toggle create product page
  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }
  const handleToggleUpdate = () => {
    setIsOpenUpate(prev => !prev)
  }
  const handleToggleDetail = () => {
    setIsOpenDetail(prev => !prev)
  }
  // handle delete product

  const handleDeleteProduct = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/products/${id}`)
      if(res) {
        alert("San pham da xoa")
        reFetch();
      }
    } catch (error) {
      alert(error)
    }
  }
  
  // handle update product 
  const handleUpdateProduct = (id) => {
    setIdProductUpdate(id);
    handleToggleUpdate();
  }
  // handle view product detail
  const handleViewDetail = (id) => {
    setIdProudctDetail(id);
    handleToggleDetail();
  }
  if (error)
    return (
      <p className="text-red-400 font-semibold">
        Không thể lấy được danh sách sản phẩm!!!
      </p>
    );
  return (
    <div className="flex flex-col mt-5 px-5 pb-20">
      <div>
        <p className="text-xl font-bold">Danh sách sản phẩm</p>

        <div className="mt-2 flex justify-between">
          <input
            placeholder="Tìm kiếm sản phẩm..."
            className="px-4 py-2 rounded-xl w-2/3  outline-none border border-blue-500"
            onChange={(e) => handleSearchChange(e)}
          />

          <button className="px-8 bg-green-500 text-white rounded-lg hover:opacity-90" onClick={handleToggle}>
            Thêm sản phẩm
          </button>
        </div>
        <div className="flex justify-end mt-3 mr-10 gap-5">
          <button className={`px-4 py-2 rounded-xl ${active === "table" ? "bg-blue-400 text-white" : ""}`} onClick={() => setActive("table")}><FaList /></button>
          <button className={`px-4 py-2 rounded-xl ${active === "grid" ? "bg-blue-400 text-white" : ""}`} onClick={() => setActive("grid")}><IoGridOutline /></button>
        </div>
      </div>

      {loading && <Loading />}
      {!loading && active === "table" && (
         <div className="w-full overflow-hidden rounded-lg shadow-xs mt-5">
         <div className="w-full overflow-x-auto ">
           <table className="w-full whitespace-nowrap">
             <thead>
               <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b ">
                 <td className="px-4 py-3">Sản Phẩm</td>
                 <td className="px-4 py-3">Số lượng bán</td>
                 <td className="px-4 py-3">Số lượng còn</td>
                 <td className="px-4 py-3">Loại Sản Phẩm</td>
                 <td className="px-4 py-3"></td>
               </tr>
             </thead>

             <tbody className="bg-white divide-y ">
               {products?.map((product) => (
                 <ItemTable key={product._id} data={product} handleDeleteProduct={handleDeleteProduct} handUpdateProduct={handleUpdateProduct} handleViewDetail={handleViewDetail}/>
               ))}
             </tbody>
           </table>
         </div>
       </div>
      )}
     
      {
        !loading && active === "grid" && (
          <ProductLIstGrid products={products} handleDelete={handleDeleteProduct} handleEdit={handleUpdateProduct} handleView={handleViewDetail}/>
        )
      }

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

      {isOpen && (<CreateNewProduct isOpen={isOpen} handleClose={handleToggle} reFetchProduct={reFetch} />)}
      {isOpenUpdate && (<UpdateProduct isOpen={isOpenUpdate} handleClose={handleToggleUpdate} reFetchProduct={reFetch} idProduct={idProductUpdate}/>)}
      {isOpenDetail && (<ProductDetailAdmin isOpen={isOpenDetail} handleClose={handleToggleDetail} idProduct={idProductDetail} />)}
    </div>
  );
};

export default ProductListAdmin;
