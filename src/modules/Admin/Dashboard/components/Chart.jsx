import React from 'react';
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Chart({ listDataApp12Month }) {
  return (
    <div sx={chart}>
      <h3 sx={chartTitle}>Biểu đồ tổng lịch hẹn theo tháng</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={listDataApp12Month}>
          <XAxis dataKey="month" stroke="#5550bd" />
          <Line type="monotone" dataKey="total" stroke="#5550bd" />
          <Tooltip />
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
const chart = {
  margin: '20px',
  padding: '20px',
  WebkitBoxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.75)',
  boxShadow: '0px 0px 15px -10px rgba(0, 0, 0, 0.75)',
};
const chartTitle = {
  marginBottom: '20px',
};
