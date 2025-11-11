import DashboardCard from "../components/DashboardCard";
import { useERP } from "../context/ERPContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const { inventory, sales, customers, suppliers } = useERP();

  // --- Basic analytics ---
  const totalSales = sales.reduce((sum, s) => sum + (s.amount || 0), 0);
  const totalProfit = sales.reduce((sum, s) => sum + (s.profit || 0), 0);
  const totalStock = inventory.reduce((sum, item) => sum + (item.stock || 0), 0);

  // --- Sales chart data (monthly) ---
  const monthlyData = [
    { month: "Jan", sales: 42000 },
    { month: "Feb", sales: 37000 },
    { month: "Mar", sales: 48000 },
    { month: "Apr", sales: 52000 },
    { month: "May", sales: 46000 },
    { month: "Jun", sales: 61000 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-amber-700 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 text-sm">
            Get a quick summary of your jewelry shop’s performance and activity.
          </p>
        </header>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <DashboardCard
            title="Inventory Items"
            count={inventory.length}
            subtitle={`${totalStock} total pieces in stock`}
            color="bg-yellow-100"
          />
          <DashboardCard
            title="Total Sales"
            count={`₹${totalSales.toLocaleString()}`}
            subtitle={`Profit ₹${totalProfit.toLocaleString()}`}
            color="bg-green-100"
          />
          <DashboardCard
            title="Customers"
            count={customers.length}
            subtitle="Active registered buyers"
            color="bg-blue-100"
          />
          <DashboardCard
            title="Suppliers"
            count={suppliers.length}
            subtitle="Linked product vendors"
            color="bg-pink-100"
          />
        </div>

        {/* Sales chart */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Monthly Sales Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick summaries */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Top-Selling Items
            </h3>
            <ul className="text-gray-600 text-sm space-y-2">
              <li>• Gold Necklace Set (₹12,000 profit)</li>
              <li>• Diamond Ring (₹9,500 profit)</li>
              <li>• Silver Bracelet (₹4,200 profit)</li>
              <li>• Platinum Pendant (₹3,800 profit)</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Active Customers
            </h3>
            <ul className="text-gray-600 text-sm space-y-2">
              {customers.slice(0, 5).map((c, i) => (
                <li key={i}>
                  • {c.name || "Unknown"}{" "}
                  <span className="text-gray-400">({c.phone || "N/A"})</span>
                </li>
              ))}
              {customers.length === 0 && (
                <li className="text-gray-400 italic">No customer records yet</li>
              )}
            </ul>
          </div>
        </div>

        <footer className="text-xs text-gray-400 mt-6 text-center">
          Last updated {new Date().toLocaleDateString()}
        </footer>
      </div>
    </div>
  );
}
