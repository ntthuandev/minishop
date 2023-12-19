import React from "react";

import {AiOutlineArrowRight} from "react-icons/ai"

import { TopProduct, RecentOrder } from "../../components";
import { Link } from "react-router-dom";
const Resport = () => {
  return (
    <div className="m-2 md:m-10 mt-24 flex flex-col gap-10 ">
      <div className="p-2 md:p-10 bg-white rounded-3xl">
        <div className="flex  justify-between gap-5">

          {/* start doanh so */}
          <div className="bg-white w-1//3 p-5 flex flex-1 flex-col justify-around rounded-lg border-2 border-solid border-[#fff7e8]">
            <h2 className="text-xl font-bold">Doanh Số</h2>
            <div className="flex flex-col gap-5 mt-3">
              <p className="mr-[10px] text-4xl">15%</p>
              <p className="text-base">Tăng so với tuần trước</p>
            </div>
            <div className="flex item-center mt-5">
              <p className="text-base text-[#b59f78]">Báo cáo doanh số</p>
              <AiOutlineArrowRight className=" ml-5 text-base w-[24px] h-[24px] text-green-700" />
            </div>
          </div>
           {/* endl doanh so */}

          {/* start tong so don hang */}
          <div className="bg-white w-1//3 p-5 flex  flex-1 flex-col justify-around rounded-lg border-2 border-solid border-[#fff7e8]">
            <h2 className="text-xl font-bold">Số Đơn Hàng</h2>
            <div className="flex flex-col gap-5 mt-3">
              <p className="mr-[10px] text-4xl">100</p>
              <p className="text-base">Tổng số đơn hàng tuần này</p>
            </div>
           
              <Link to="/orders" className="flex item-center mt-5">
                <p className="text-base text-[#b59f78]">Danh sách đơn hàng </p>
                <AiOutlineArrowRight className=" ml-5 text-base w-[24px] h-[24px]" />
              </Link>
           
          </div>
          {/* end tong so don hang */}

          <div className="bg-white w-1//3 p-5 flex flex-1 flex-col justify-around rounded-lg border-2 border-solid border-[#fff7e8]">
            <h2 className="text-xl font-bold">Khách Hàng Mới</h2>
            <div className="flex flex-col gap-5 mt-3">
              <p className="mr-[10px] text-4xl">11</p>
              <p className="text-base">Khách hàng mới tuần này</p>
            </div>
            
              <Link to="/users" className="flex item-center mt-5">
                <p className="text-base text-[#b59f78]">Danh sách khách hàng </p>
              <AiOutlineArrowRight className=" ml-5 text-base w-[24px] h-[24px]" />
              </Link>
          </div>
        </div>
      </div>

      <div className="p-2 md:p-10 bg-white rounded-3xl">
        <h2 className="text-2xl font-bold text-red-600">Các sản phẩm có lượt mua nhiều nhất</h2>
        <TopProduct />
      </div>

      <div className="p-2 md:p-10 bg-white rounded-3xl">
       
          <h2 className="text-xl font-bold text-sky-400" >Đơn hàng gần đây: </h2>
          <RecentOrder />
       
      </div>
    </div>
  );
};

export default Resport;
