import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FeaturedInfo from "../../components/AdminComponents/FeaturedInfo";
import UserChart from "../../components/AdminComponents/UserChart";
import OrderChart from "../../components/AdminComponents/OrderChart";
import { RecentUser } from "../../components/AdminComponents/RecentUser";
import RecentOrder from "../../components/AdminComponents/RecentOrder";
const HomePage = () => {
  return (
    <div className="flex flex-col mt-5 p-5">
      <FeaturedInfo />

      <div className="flex flex-col p-10">
        <p className="text-xl font-semibold">Bảng phân tích cửa hàng</p>
        <div className="mt-10 flex gap-10 justify-between rounded-lg shadow-lg h-[400px] p-5 bg-[#EEF5FF]" >
          <div className="flex-1">
            <UserChart
            />
          </div>
          <div className="flex-1">
            <OrderChart />  
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-10">
        <RecentUser />
        <RecentOrder />
      </div>
    </div>
  );
};

export default HomePage;
