import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { formatCurrency } from "../../utils/formatCurrency";
const FeaturedInfo = () => {

  const [perc, setPerc] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [totalOrder, setTotalOrder] = useState(0);
  const [totalProductSale, setTotalProductSale] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/orders/order/data/income");
        setData(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (loading) return;
    if(data[1])
    {
      setPerc((data[1]?.totalIncome * 100) / data[0]?.totalIncome - 100);
      setTotalOrder((data[1]?.totalOrder * 100) / data[0]?.totalOrder - 100 );
      setTotalProductSale((data[1]?.totalSale * 100) / data[0]?.totalSale - 100);
      
    } else 
    {
      setPerc((data[0]?.totalIncome * 100) / data[0]?.totalIncome - 100);
      setTotalOrder((data[0]?.totalOrder * 100) / data[0]?.totalOrder - 100);
      setTotalProductSale((data[0]?.totalSale * 100)  / data[0]?.totalSale - 100);

    }
    
  }, [loading]);

  const date = new Date();
  const month = date.getMonth();

  return (

    <div className="mb-5">
      <p className="text-2xl font-semibold mb-5">Thống kê đơn hàng tháng {month +1}</p>
      <div className="flex justify-between gap-10">
        <div className="flex-1 flex flex-col gap-5 p-5 rounded-lg shadow-lg text-white border bg-[#7ED7C1]">
          <p className="text-lg font-semibold">Doanh thu</p>
          <div className="flex gap-5 text-lg">
            <span className="text-xl font-bold">{data[1] ? formatCurrency(data[1]?.totalIncome) : formatCurrency(data[0]?.totalIncome)}</span>
            <div className="flex items-center gap-10">
              %{Math.floor(perc)}{" "}
              {perc < 0 ? (
                <FaArrowDown className="text-red-700 text-4xl" />
              ) : (
                <FaArrowUp className="text-green-700 text-4xl" />
              )}
            </div>
          </div>
          <p className="text-gray-700 text-lg ml-5">so với tháng trước</p>
        </div>
        
        <div className="flex-1 flex flex-col gap-5 p-5 rounded-lg shadow-lg bg-[#DC8686] text-white border ">
          <p className="text-lg font-semibold">Số sản phẩm đã bán</p>
          <div className="flex gap-5 text-lg">
            <span className="text-xl font-bold">{data[1] ? data[1]?.totalSale : data[0]?.totalSale} sản phẩm</span>
            <div className="flex items-center gap-10">
              %{Math.floor(totalProductSale)}{" "}
              {totalProductSale < 0 ? (
                <FaArrowDown className="text-red-700 text-4xl" />
              ) : (
                <FaArrowUp className="text-green-700 text-4xl" />
              )}
            </div>
          </div>
          <p className="text-gray-700 text-lg ml-5">so với tháng trước</p>
        </div>
        
        <div className="flex-1 flex flex-col gap-5 p-5 rounded-lg shadow-lg bg-[#7C93C3] text-white border ">
          <p className="text-lg font-semibold">Số lượng đơn hàng</p>
          <div className="flex gap-5 text-lg">
            <span className="font-bold text-xl">{data[1] ? data[1]?.totalOrder : data[0]?.totalOrder} đơn</span>
            <div className="flex items-center gap-10">
              %{Math.floor(totalOrder)}{" "}
              {totalOrder < 0 ? (
                <FaArrowDown className="text-red-500 text-4xl" />
              ) : (
                <FaArrowUp className="text-green-600 text-4xl" />
              )}
            </div>
          </div>
          <p className="text-gray-700 ml-5 text-lg">so với tháng trước</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedInfo;
