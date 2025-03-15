'use client';
import { Chart, registerables } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import Sidebar from "../../components/SideBar";

Chart.register(...registerables);

const participantData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Active",
      data: [1.5, 2.1, 2.4, 3.0, 2.9, 4.1, 3.8, 4.5, 3.2, 4.0, 3.6, 4.8],
      backgroundColor: "#4A56E2",
    },
    {
      label: "Offline",
      data: [0.8, 1.0, 1.2, 1.5, 1.3, 1.8, 1.7, 2.0, 1.4, 1.9, 1.6, 2.2],
      backgroundColor: "#FBBF24",
    },
  ],
};

const monthlyData = {
  labels: [1, 5, 10, 15, 20, 25, 30],
  datasets: [
    {
      label: "Total Participation",
      data: [20, 40, 35, 50, 45, 60, 67],
      borderColor: "#4A56E2",
      fill: false,
      tension: 0.1,
    },
  ],
};

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FC] text-black">
      <Sidebar />

      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-semibold mb-8">Overview</h1>

        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="p-6 bg-[#D8E2FC] rounded-2xl shadow h-44">
            <p className="text-lg font-semibold">Total Families</p>
            <p className="text-3xl">23,000</p>
            <p className="text-sm text-blue-600">Since last month +13%</p>
          </div>

          <div className="p-6 bg-[#E2DEEF] rounded-2xl shadow h-44">
            <p className="text-lg font-semibold">Total Activities</p>
            <p className="text-3xl">2,878,000</p>
            <p className="text-sm text-purple-600">Since last month -4.6%</p>
          </div>

          <div className="p-6 bg-[#DAEAEA] rounded-2xl shadow h-44">
            <p className="text-lg font-semibold">Active Families</p>
            <p className="text-3xl">13,986</p>
            <p className="text-sm text-green-600">Since last month +45%</p>
          </div>

          <div className="p-6 bg-[#F4E6CC] rounded-2xl shadow h-44">
            <p className="text-lg font-semibold">Average Participation</p>
            <p className="text-3xl">45%</p>
            <p className="text-sm text-yellow-600">Since last month +45%</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Total Participants</h2>
          <p className="text-2xl mb-4">12,000</p>
          <Bar data={participantData} options={{ responsive: true }} />
        </div>

        <div className="p-6 bg-white rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Monthly Participation</h2>
          <Line data={monthlyData} options={{ responsive: true }} />
        </div>
      </main>
    </div>
  );
}