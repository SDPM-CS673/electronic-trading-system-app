// components/ChartSection.js
"use client";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const ChartSection = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Stock Price',
        data: [100, 200, 150, 220, 300, 280, 350, 400, 420],
        borderColor: '#4A90E2',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <section className="py-12 bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-300 text-center">Live Stock Chart</h2>
        <div className="mt-8">
          <Line data={data} options={options} />
        </div>
      </div>
    </section>
  );
};

export default ChartSection;
