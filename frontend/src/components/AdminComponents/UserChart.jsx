
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
const UserChart = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState();
  const MONTHS = useMemo(
    () => [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    []
  );
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/users/user/stats");
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
    
    data.map(item =>setUser((prev) => [
        ...prev,
        {name: MONTHS[item._id -1], "Số người đăng ký": item.total}
    ]))
  }, [loading]);

if(error) return <p className="text-red-500">Có lỗi xảy ra</p>
  return (
    <div className=" w-full">
      <h3 className="text-lg font-semibold mb-5">Phân tích số khách hàng</h3>
      <ResponsiveContainer width="100%" height="50%" aspect={2 / 1}>
        <LineChart data={user}>
          <YAxis />
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line type="monotone" dataKey="Số người đăng ký" stroke="#5550bd" />
          <Tooltip />
          {true && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserChart;
