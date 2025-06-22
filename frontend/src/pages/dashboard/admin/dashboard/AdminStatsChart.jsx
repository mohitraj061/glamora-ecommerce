import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const AdminStatsChart = ({ stats }) => {
  // Data for Pie Chart
  const pieData = {
    labels: ['Total Orders', 'Total Products', 'Total Reviews', 'Total Users'],
    datasets: [
      {
        label: 'Admin Stats',
        data: [
          stats.totalOrders,
          stats.totalProducts,
          stats.totalReviews,
          stats.totalUsers,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Initialize the data array with 12 zeros
  const data = new Array(12).fill(0);

  // Map earnings to the correct month
  stats?.monthlyEarnings.forEach(entry => {
    data[entry.month - 1] = entry.earnings; // Subtract 1 because months are 0-indexed in the data array
  });

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Monthly Earnings',
        data,
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        tension: 0.1,     // Optional: Add some tension to smooth the line
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="mt-12 space-y-8">
      <h2 className="text-xl font-semibold mb-4">
        Admin Stats Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="max-h-96 w-full">
          <Pie data={pieData} options={options} />
        </div>

        {/* Line Chart */}
        <div className="max-h-96 md:h-96 w-full">
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AdminStatsChart;
