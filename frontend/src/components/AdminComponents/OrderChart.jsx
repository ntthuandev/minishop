import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Thang 1',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Thang 2',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Thang 3',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Thang 4',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Thang 5',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  }
  
];




const OrderChart = () => {
    const [data, setData] = useState([]);
    const [order, setOrder] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
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
            const res = await axios.get("/orders/order/data/year/income");
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
        
        data?.map(item =>setOrder((prev) => [
            ...prev,
            {name: MONTHS[item._id -1], "Sản phẩm đã bán": item.totalSale, "Số đơn hàng": item.totalOrder, "Doanh thu": item.totalIncome}
        ]))
      }, [loading]);


  return (
    <div className='w-ful h-full'>
        <h3 className="text-lg font-semibold mb-5">Bảng phân tích đơn hàng</h3>
        <ResponsiveContainer width="100%" height="80%">
        <LineChart
        data={order}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Sản phẩm đã bán" stroke="#DC8686" yAxisId="left" />
        <Line type="monotone" dataKey="Số đơn hàng" stroke="#7C93C3" yAxisId="left" />
        <Line type="monotone" dataKey="Doanh thu" stroke="#7ED7C1" yAxisId="right"/>
        </LineChart>
    </ResponsiveContainer>

    </div>

);
  
}

export default OrderChart