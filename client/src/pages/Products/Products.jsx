import React from "react";
import { Header, Button, ProductItem, Modal } from "../../components";
import { useState, useEffect } from "react";
import axios from "axios";
import fetchData from "../../hooks/fetchData";
import Pagination from "@mui/material/Pagination";
import CreateProduct from "./CreateProduct";

const ProductCardList = ({ data, handleDelete }) => {
  return (
    <div className="mt-5 prompt_layout">
      {data?.map((item) => (
        <ProductItem key={item._id} data={item} handleDelete={handleDelete} />
      ))}
    </div>
  );
};
// api/products/pagination/list?page=2&limit=3
const Products = () => {
 
  const [productPagination, setProductPagination] = useState([]); // du dieu hien thi pagination
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]); // du lieu tim kiem

 const [isOpen, setIsOpen] = useState(false)


  const [page, setPage] = useState(1);
  const pageSize = 8;
  
  const {data, loading, error, reFetch} = fetchData(`api/products/pagination/list?page=${page}&limit=${pageSize}`)
  //setDataFetch(data);
  //setProductPagination(data.products)
  console.log(data)
  //setProductPagination(data.products)
  const totalProduct = data.totalProduct;


  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout( async () => {
        const res =  await axios.get(`/api/products/search/result?searchProduct=${searchText}`)
        setSearchedResults(res.data);
        
      }, 500)
    );
  };


  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      alert("Sản phẩm đã xoá thành công");
      reFetch()
      setSearchedResults(searchedResults.filter((item) => item._id !== id))
    } catch (err) {
      console.log(err);
    }
  };
  const handleToggle = () => {
    setIsOpen(prev => !prev)
  };
  
  const handleChange = (event, value)  => {
    setPage(value);
  }
   if(loading) return (<p>Loading</p>)
   if(error) return (<p className='text-red-500'>Somethink went wrong !!!</p>)
  return (
    <div className=" relative m-10  p-5  bg-white rounded-3xl">
      <Header category="Trang" title="Danh Sách Sản Phẩm" />
      <div className="flex justify-end">
        <form className="relative w-full flex-center">
          <input
            type="text"
            placeholder="Tìm kiếm tên hoặc loại sản phẩm..."
            value={searchText}
            onChange={handleSearchChange}
            required
            className="search_input peer"
          />
          
        </form>
        <Button title="Thêm Sản Phẩm Mới" handleClick={handleToggle} />
      </div>

      {searchText ? (
        <ProductCardList data={searchedResults} handleDelete={handleDelete} />
      ) : (
        <>
          <ProductCardList data={data.products} handleDelete={handleDelete} />
        
          <div className="flex justify-center mt-10">
                <Pagination size="large" count={Math.round(totalProduct / pageSize) || 0}   color="primary" shape="rounded" page={page} onChange={handleChange} />
          </div>
        </>
      )}


     

      <Modal isOpen={isOpen} handleClose={handleToggle}>
        <CreateProduct reFetch={reFetch} handleToggle={handleToggle} />
      </Modal>
    </div>
  );
};

export default Products;
