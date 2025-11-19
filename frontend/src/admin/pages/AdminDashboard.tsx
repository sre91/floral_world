import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#16a34a", "#facc15", "#ef4444", "#3b82f6"];

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    admins: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "https://floral-world.onrender.com/api/admin/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };
    fetchStats();
  }, []);

  const chartData = [
    { name: "Users", value: stats.users },
    { name: "Admins", value: stats.admins },
    { name: "Products", value: stats.products },
  ];

  return (
    <div className="p-8 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        📊 Admin Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-green-700 text-2xl font-bold">{stats.users}</h2>
          <p className="text-gray-600">Total Users</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-green-700 text-2xl font-bold">{stats.admins}</h2>
          <p className="text-gray-600">Admins</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-green-700 text-2xl font-bold">
            {stats.products}
          </h2>
          <p className="text-gray-600">Products</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">
          Data Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
