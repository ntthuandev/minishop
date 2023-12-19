import React, { useEffect, useState } from "react";

import ProductItemClient from "../commom/ProductItemClient";
import Loading from "../../components/commom/Loading"
import useFetchPaginate from "../../hook/useFetchPaginate";
import { API_URL } from "../../config/Url";
const ProductList = () => {
  const [products, setProducts] = useState([]); // set product list
  const [page, setPage] = useState(0); // set page pagination
  const { data, loading, error} = useFetchPaginate(`${API_URL}/products`);

  const [searchText, setSearchText] = useState(""); // set text seach
  const [searchTimeout, setSearchTimeout] = useState(null); // set time search product

  useEffect(() => {
    if (loading) return;
    setProducts(data[page]);
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
  if (loading) return <Loading />;
  if (error) return <p>Có lôi xảy ra: {error}</p>;

  return (
    <div className="flex flex-col mt-5 px-5 pb-20">
       <div>
        <p className="text-xl font-bold">Danh sách sản phẩm</p>

        <div className="mt-2 flex justify-center">
          <input
            placeholder="Tìm kiếm sản phẩm..."
            className="px-4 py-2 rounded-xl w-2/3  outline-none border border-blue-500"
            onChange={(e) => handleSearchChange(e)}
          />
         
        </div>
      </div>
      <div className="md:grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-5 gap-6 mx-14 mt-10">
        {products?.map((item) => (
          <div key={item._id} className="col-span-1">
            <ProductItemClient data={item} />
          </div>
        ))}
      </div>

      {!loading && !searchText && (
        <div className="flex justify-center flex-wrap gap-5 mt-5">
          <button className="bg-transparent border-transparent font-semibo text-lg px-4 py-2 rounded-xl  cursor-pointer hover:border hover:border-blue-500" onClick={prevPage}>
            Trước
          </button>
          {data?.map((item, index) => {
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

    </div>
  );
};

export default ProductList;
