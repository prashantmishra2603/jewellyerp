import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Reports() {
  const salesData = [
    { month: "Jan", sales: 42000, profit: 12000 },
    { month: "Feb", sales: 38000, profit: 10000 },
    { month: "Mar", sales: 46000, profit: 14000 },
    { month: "Apr", sales: 52000, profit: 17000 },
    { month: "May", sales: 49000, profit: 15000 },
    { month: "Jun", sales: 56000, profit: 19000 },
  ];

  const categoryData = [
    { name: "Gold", value: 55 },
    { name: "Silver", value: 25 },
    { name: "Diamond", value: 15 },
    { name: "Platinum", value: 5 },
  ];

  const COLORS = ["#fbbf24", "#9ca3af", "#60a5fa", "#d1d5db"];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          Business Reports & Analytics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sales vs Profit Line Chart */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Monthly Sales & Profit
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#4f46e5"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#16a34a"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Category Pie Chart */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Product Category Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Sales Bar Chart */}
          <div className="bg-white shadow-lg rounded-2xl p-6 col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Sales Overview
            </h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#4f46e5" />
                <Bar dataKey="profit" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
