import { useState } from "react";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "Raj Jewel Suppliers",
      contact: "9876543210",
      email: "raj.jewel@example.com",
      city: "Mumbai",
      materials: "Gold, Silver",
      rating: 4.7,
    },
    {
      id: 2,
      name: "Sparkle Gems Co.",
      contact: "9123456789",
      email: "sparklegems@example.com",
      city: "Jaipur",
      materials: "Diamonds, Platinum",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Silver Craft Pvt. Ltd.",
      contact: "9812345678",
      email: "silvercraft@example.com",
      city: "Delhi",
      materials: "Silver",
      rating: 4.5,
    },
  ]);

  const [newSupplier, setNewSupplier] = useState({
    name: "",
    contact: "",
    email: "",
    city: "",
    materials: "",
    rating: "",
  });

  const handleChange = (e) => {
    setNewSupplier({ ...newSupplier, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newSupplier.name || !newSupplier.contact) return;
    setSuppliers([
      ...suppliers,
      { id: Date.now(), ...newSupplier, rating: Number(newSupplier.rating) },
    ]);
    setNewSupplier({
      name: "",
      contact: "",
      email: "",
      city: "",
      materials: "",
      rating: "",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-amber-700 mb-6 border-b pb-2">
          Supplier Management
        </h1>
        <p className="text-gray-600 mb-8">
          Manage and track your jewelry material suppliers efficiently.
        </p>

        {/* Add Supplier Form */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Add New Supplier
          </h2>
          <form
            onSubmit={handleAdd}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Supplier Name"
              value={newSupplier.name}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
            />
            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={newSupplier.contact}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={newSupplier.email}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={newSupplier.city}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
            />
            <input
              type="text"
              name="materials"
              placeholder="Materials Provided"
              value={newSupplier.materials}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
            />
            <input
              type="number"
              name="rating"
              placeholder="Rating (1–5)"
              value={newSupplier.rating}
              onChange={handleChange}
              className="border rounded-lg p-2 focus:ring-2 focus:ring-amber-400 outline-none"
              min="1"
              max="5"
              step="0.1"
            />
            <button
              type="submit"
              className="bg-amber-600 text-white rounded-lg p-2 hover:bg-amber-700 transition"
            >
              Add Supplier
            </button>
          </form>
        </div>

        {/* Supplier Table */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Supplier List
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border">
              <thead className="bg-amber-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Contact</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">City</th>
                  <th className="py-3 px-4 text-left">Materials</th>
                  <th className="py-3 px-4 text-left">Rating</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier, index) => (
                  <tr
                    key={supplier.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-amber-50 transition`}
                  >
                    <td className="py-2 px-4 font-medium text-gray-800">
                      {supplier.name}
                    </td>
                    <td className="py-2 px-4">{supplier.contact}</td>
                    <td className="py-2 px-4">{supplier.email}</td>
                    <td className="py-2 px-4">{supplier.city}</td>
                    <td className="py-2 px-4">{supplier.materials}</td>
                    <td className="py-2 px-4 font-semibold text-amber-700">
                      ⭐ {supplier.rating.toFixed(1)}
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
