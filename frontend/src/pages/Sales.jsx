import { useState } from "react";

export default function Sales() {
  const [sales, setSales] = useState([
    {
      id: 1,
      customer: "Amit Verma",
      item: "Gold Necklace",
      quantity: 1,
      total: 48000,
      date: "2025-11-01",
      status: "Completed",
    },
    {
      id: 2,
      customer: "Priya Sharma",
      item: "Diamond Ring",
      quantity: 1,
      total: 75000,
      date: "2025-11-03",
      status: "Pending",
    },
    {
      id: 3,
      customer: "Rahul Singh",
      item: "Silver Bracelet",
      quantity: 2,
      total: 30000,
      date: "2025-11-06",
      status: "Completed",
    },
  ]);

  const totalSales = sales.reduce((acc, s) => acc + s.total, 0);
  const completedSales = sales.filter((s) => s.status === "Completed").length;
  const pendingSales = sales.filter((s) => s.status === "Pending").length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-700 mb-6 border-b pb-2">
          Sales Overview
        </h1>
        <p className="text-gray-600 mb-8">
          Track, record, and analyze jewelry sales performance.
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-xl p-5 border-l-4 border-amber-500">
            <h3 className="text-gray-500 text-sm font-medium">Total Sales</h3>
            <p className="text-2xl font-semibold text-gray-800 mt-2">
              ₹{totalSales.toLocaleString()}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-5 border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-medium">
              Completed Orders
            </h3>
            <p className="text-2xl font-semibold text-gray-800 mt-2">
              {completedSales}
            </p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-5 border-l-4 border-yellow-500">
            <h3 className="text-gray-500 text-sm font-medium">Pending Orders</h3>
            <p className="text-2xl font-semibold text-gray-800 mt-2">
              {pendingSales}
            </p>
          </div>
        </div>

        {/* Sales Table */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Sales
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-amber-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Customer</th>
                  <th className="py-3 px-4 text-left">Item</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Total (₹)</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, index) => (
                  <tr
                    key={sale.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-amber-50 transition`}
                  >
                    <td className="py-2 px-4">{sale.customer}</td>
                    <td className="py-2 px-4">{sale.item}</td>
                    <td className="py-2 px-4">{sale.quantity}</td>
                    <td className="py-2 px-4 font-medium text-amber-700">
                      ₹{sale.total.toLocaleString()}
                    </td>
                    <td className="py-2 px-4">{sale.date}</td>
                    <td
                      className={`py-2 px-4 font-medium ${
                        sale.status === "Completed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {sale.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
