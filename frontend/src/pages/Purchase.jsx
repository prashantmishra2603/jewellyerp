import { useState } from "react";

export default function Purchase() {
  const [purchases, setPurchases] = useState([
    {
      id: 1,
      supplier: "Raj Jewel Suppliers",
      item: "Gold Necklace",
      quantity: 5,
      price: 42000,
      date: "2025-11-02",
      status: "Delivered",
    },
    {
      id: 2,
      supplier: "Sparkle Gems",
      item: "Diamond Earrings",
      quantity: 3,
      price: 65000,
      date: "2025-11-04",
      status: "Pending",
    },
    {
      id: 3,
      supplier: "Silver Craft",
      item: "Silver Bangles",
      quantity: 10,
      price: 12000,
      date: "2025-11-09",
      status: "Delivered",
    },
  ]);

  const [newPurchase, setNewPurchase] = useState({
    supplier: "",
    item: "",
    quantity: "",
    price: "",
    date: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setNewPurchase({ ...newPurchase, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newPurchase.supplier || !newPurchase.item) return;
    setPurchases([
      ...purchases,
      { id: Date.now(), ...newPurchase, quantity: Number(newPurchase.quantity), price: Number(newPurchase.price) },
    ]);
    setNewPurchase({ supplier: "", item: "", quantity: "", price: "", date: "", status: "Pending" });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          Purchase Management
        </h2>

        {/* Add Purchase Form */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Add New Purchase</h3>
          <form
            onSubmit={handleAdd}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <input
              type="text"
              name="supplier"
              placeholder="Supplier Name"
              value={newPurchase.supplier}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              type="text"
              name="item"
              placeholder="Item Name"
              value={newPurchase.item}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={newPurchase.quantity}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              type="number"
              name="price"
              placeholder="Price (₹)"
              value={newPurchase.price}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <input
              type="date"
              name="date"
              value={newPurchase.date}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
            <select
              name="status"
              value={newPurchase.status}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-lg p-2 hover:bg-indigo-700 transition"
            >
              Add Purchase
            </button>
          </form>
        </div>

        {/* Purchase Table */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Recent Purchases
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Supplier</th>
                  <th className="py-3 px-4 text-left">Item</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Price (₹)</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((purchase, index) => (
                  <tr
                    key={purchase.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-indigo-50 transition`}
                  >
                    <td className="py-2 px-4">{purchase.supplier}</td>
                    <td className="py-2 px-4">{purchase.item}</td>
                    <td className="py-2 px-4">{purchase.quantity}</td>
                    <td className="py-2 px-4 font-medium text-indigo-700">
                      ₹{purchase.price.toLocaleString()}
                    </td>
                    <td className="py-2 px-4">{purchase.date}</td>
                    <td
                      className={`py-2 px-4 font-medium ${
                        purchase.status === "Delivered"
                          ? "text-green-600"
                          : purchase.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {purchase.status}
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
