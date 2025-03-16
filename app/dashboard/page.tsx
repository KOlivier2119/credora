'use client';

import { Chart, registerables } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import Sidebar from '../../components/SideBar';
import { TextField } from '@radix-ui/themes';

Chart.register(...registerables);

const participantData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Active',
      data: [1.5, 2.1, 2.4, 3.0, 2.9, 4.1, 3.8, 4.5, 3.2, 4.0, 3.6, 4.8],
      backgroundColor: '#4A56E2',
    },
    {
      label: 'Offline',
      data: [0.8, 1.0, 1.2, 1.5, 1.3, 1.8, 1.7, 2.0, 1.4, 1.9, 1.6, 2.2],
      backgroundColor: '#FBBF24',
    },
  ],
};

const monthlyData = {
  labels: [1, 5, 10, 15, 20, 25, 30],
  datasets: [
    {
      label: 'Total Participation',
      data: [20, 40, 35, 50, 45, 60, 67],
      borderColor: '#4A56E2',
      fill: false,
      tension: 0.1,
    },
  ],
};

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FC] text-black">
      <Sidebar />

      <main className="flex-1 p-8 overflow-auto h-screen">
      <nav className='h-14 border-b border-black flex justify-between items-center px-4'>
        <h1>Overview</h1>
        <div>
          <input type="text" placeholder="Search..." className="w-64 p-2 border rounded" />
        </div>
      </nav>
        <h1 className="text-4xl font-bold mb-10">Dashboard Overview</h1>

        <div className="grid grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Families', value: '23,000', trend: '+13%', color: 'text-blue-600', bg: 'bg-[#D8E2FC]' },
            { title: 'Total Activities', value: '2,878,000', trend: '-4.6%', color: 'text-purple-600', bg: 'bg-[#E2DEEF]' },
            { title: 'Active Families', value: '13,986', trend: '+45%', color: 'text-green-600', bg: 'bg-[#DAEAEA]' },
            { title: 'Average Participation', value: '45%', trend: '+45%', color: 'text-yellow-600', bg: 'bg-[#F4E6CC]' },
          ].map((item, index) => (
            <div key={index} className={`${item.bg} p-6 rounded-2xl shadow-lg h-44`}>
              <p className="text-lg font-semibold mb-2">{item.title}</p>
              <p className="text-4xl mb-2">{item.value}</p>
              <p className={`text-sm ${item.color}`}>Since last month {item.trend}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 h-[calc(100vh-20rem)]">
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Total Participants</h2>
            <p className="text-3xl mb-4">12,000</p>
            <div className="h-[400px]"> {/* Increased height */}
              <Bar
                data={participantData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Monthly Participation</h2>
            <div className="h-[400px]"> {/* Increased height */}
              <Line
                data={monthlyData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}