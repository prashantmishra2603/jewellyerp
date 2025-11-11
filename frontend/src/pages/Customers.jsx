import { useState } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Amit Verma",
      phone: "9876543210",
      email: "amit.verma@example.com",
      purchase: "Gold Necklace",
      totalSpent: 48000,
    },
    {
      id: 2,
      name: "Priya Sharma",
      phone: "9123456780",
      email: "priya.sharma@example.com",
      purchase: "Diamond Ring",
      totalSpent: 75000,
    },
    {
      id: 3,
      name: "Rahul Singh",
      phone: "9898989898",
      email: "rahul.singh@example.com",
      purchase: "Silver Bracelet",
      totalSpent: 15000,
    },
  ]);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    purchase: "",
    totalSpent: "",
  });

  const handleChange = (e) => {
    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.phone) return;
    setCustomers([
      ...customers,
      { id: Date.now(), ...newCustomer, totalSpent: Number(newCustomer.totalSpent) },
    ]);
    setNewCustomer({ name: "", phone: "", email: "", purchase: "", totalSpent: "" });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          Customer Management
        </h2>

        {/* Add Customer Form */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Add New Customer
          </h3>
          <form
            onSubmit={handleAdd}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Customer Name"
              value={newCustomer.name}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={newCustomer.phone}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={newCustomer.email}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              type="text"
              name="purchase"
              placeholder="Last Purchase"
              value={newCustomer.purchase}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              type="number"
              name="totalSpent"
              placeholder="Total Spent (₹)"
              value={newCustomer.totalSpent}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-lg p-2 hover:bg-indigo-700 transition"
            >
              Add Customer
            </button>
          </form>
        </div>

        {/* Customer Table */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Customer List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Last Purchase</th>
                  <th className="py-3 px-4 text-left">Total Spent (₹)</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((cust, index) => (
                  <tr
                    key={cust.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-indigo-50 transition`}
                  >
                    <td className="py-2 px-4">{cust.name}</td>
                    <td className="py-2 px-4">{cust.phone}</td>
                    <td className="py-2 px-4">{cust.email}</td>
                    <td className="py-2 px-4">{cust.purchase}</td>
                    <td className="py-2 px-4 font-medium text-indigo-700">
                      ₹{cust.totalSpent.toLocaleString()}
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
