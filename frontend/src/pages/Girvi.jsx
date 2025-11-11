// src/pages/Girvi.jsx
import { useState, useMemo } from "react";

const DEFAULT_RATE = 12; // annual interest rate percent

function daysBetween(dateA, dateB = new Date()) {
  const msPerDay = 24 * 60 * 60 * 1000;
  const a = new Date(dateA);
  const b = new Date(dateB);
  return Math.max(0, Math.floor((b - a) / msPerDay));
}

function calcInterest(principal, ratePercent = DEFAULT_RATE, daysHeld) {
  // simple interest based on days/365
  return (principal * (ratePercent / 100) * daysHeld) / 365;
}

export default function Girvi() {
  const [rate, setRate] = useState(DEFAULT_RATE);
  const [query, setQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [entries, setEntries] = useState([
    {
      id: 1,
      customer: "Amit Verma",
      item: "Gold Necklace",
      principal: 40000,
      pledgedOn: "2025-10-10",
      tenureDays: 90,
      status: "active", // active | returned | overdue
      notes: "Karat 22",
    },
    {
      id: 2,
      customer: "Priya Sharma",
      item: "Diamond Ring",
      principal: 65000,
      pledgedOn: "2025-09-01",
      tenureDays: 180,
      status: "active",
      notes: "Certificate provided",
    },
    {
      id: 3,
      customer: "Rahul Singh",
      item: "Silver Bracelet",
      principal: 8000,
      pledgedOn: "2025-07-01",
      tenureDays: 120,
      status: "returned",
      notes: "Returned 2025-10-05",
    },
  ]);

  const [form, setForm] = useState({
    customer: "",
    item: "",
    principal: "",
    pledgedOn: "",
    tenureDays: 90,
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEntry = (e) => {
    e.preventDefault();
    if (!form.customer || !form.item || !form.principal || !form.pledgedOn) return;

    const newEntry = {
      id: Date.now(),
      customer: form.customer,
      item: form.item,
      principal: Number(form.principal),
      pledgedOn: form.pledgedOn,
      tenureDays: Number(form.tenureDays),
      status: "active",
      notes: form.notes || "",
    };

    setEntries((s) => [newEntry, ...s]);
    setForm({ customer: "", item: "", principal: "", pledgedOn: "", tenureDays: 90, notes: "" });
  };

  const markReturned = (id) => {
    setEntries((s) =>
      s.map((en) =>
        en.id === id ? { ...en, status: "returned", returnedOn: new Date().toISOString().slice(0, 10) } : en
      )
    );
  };

  const removeEntry = (id) => {
    setEntries((s) => s.filter((en) => en.id !== id));
  };

  // compute dynamic fields
  const processed = useMemo(() => {
    return entries.map((en) => {
      const daysHeld = daysBetween(en.pledgedOn);
      const interest = calcInterest(en.principal, rate, daysHeld);
      const dueAmount = en.principal + interest;
      const isOverdue = daysHeld > en.tenureDays && en.status === "active";
      return { ...en, daysHeld, interest: Math.round(interest), dueAmount: Math.round(dueAmount), isOverdue };
    });
  }, [entries, rate]);

  // filters and search
  const visible = processed.filter((en) => {
    if (filterStatus === "active" && en.status !== "active") return false;
    if (filterStatus === "returned" && en.status !== "returned") return false;
    if (filterStatus === "overdue" && !en.isOverdue) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      en.customer.toLowerCase().includes(q) ||
      en.item.toLowerCase().includes(q) ||
      String(en.id).includes(q)
    );
  });

  const totals = useMemo(() => {
    const totalLocked = processed.filter((p) => p.status === "active").reduce((a, b) => a + b.principal, 0);
    const totalInterest = processed.filter((p) => p.status === "active").reduce((a, b) => a + b.interest, 0);
    const totalEntries = processed.length;
    const activeCount = processed.filter((p) => p.status === "active").length;
    return { totalLocked, totalInterest, totalEntries, activeCount };
  }, [processed]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-amber-700 mb-1">Girvi Management</h1>
          <p className="text-gray-600">Manage pawned items, track tenure and interest, and record returns.</p>
        </header>

        {/* Top summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white shadow rounded-xl p-4 border-l-4 border-amber-500">
            <div className="text-sm text-gray-500">Total Locked Value</div>
            <div className="text-2xl font-semibold mt-1">₹{totals.totalLocked.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">Active items: {totals.activeCount}</div>
          </div>

          <div className="bg-white shadow rounded-xl p-4 border-l-4 border-green-500">
            <div className="text-sm text-gray-500">Estimated Interest (so far)</div>
            <div className="text-2xl font-semibold mt-1">₹{totals.totalInterest.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">Rate: {rate}% p.a.</div>
          </div>

          <div className="bg-white shadow rounded-xl p-4 border-l-4 border-gray-400">
            <div className="text-sm text-gray-500">Total Entries</div>
            <div className="text-2xl font-semibold mt-1">{totals.totalEntries}</div>
            <div className="text-xs text-gray-400 mt-1">Manage history and returns</div>
          </div>

          <div className="bg-white shadow rounded-xl p-4 border-l-4 border-yellow-500">
            <div className="text-sm text-gray-500">Interest Rate</div>
            <div className="flex items-center gap-3 mt-1">
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-20 border rounded-lg p-1 text-sm"
                min="0"
                step="0.1"
                title="Annual interest rate percent"
              />
              <div className="text-sm text-gray-600"> % p.a.</div>
            </div>
            <div className="text-xs text-gray-400 mt-1">Changes apply to interest calculation</div>
          </div>
        </div>

        {/* Form + controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <form onSubmit={addEntry} className="bg-white p-5 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Add New Girvi</h2>
            <div className="grid grid-cols-1 gap-3">
              <input
                name="customer"
                placeholder="Customer name"
                value={form.customer}
                onChange={handleChange}
                className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-amber-300"
              />
              <input
                name="item"
                placeholder="Item description"
                value={form.item}
                onChange={handleChange}
                className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-amber-300"
              />
              <input
                name="principal"
                type="number"
                placeholder="Principal amount (₹)"
                value={form.principal}
                onChange={handleChange}
                className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-amber-300"
              />
              <input
                name="pledgedOn"
                type="date"
                value={form.pledgedOn}
                onChange={handleChange}
                className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-amber-300"
              />
              <input
                name="tenureDays"
                type="number"
                placeholder="Tenure (days)"
                value={form.tenureDays}
                onChange={handleChange}
                className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-amber-300"
              />
              <textarea
                name="notes"
                placeholder="Notes (optional)"
                value={form.notes}
                onChange={handleChange}
                className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-amber-300"
                rows="2"
              />
              <button className="bg-amber-600 text-white rounded-lg py-2 mt-2 hover:bg-amber-700 transition">
                Add Girvi
              </button>
            </div>
          </form>

          <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search by name, item or id"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="border rounded-lg p-2 outline-none focus:ring-2 focus:ring-amber-300 w-full md:w-80"
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border rounded-lg p-2 outline-none"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="returned">Returned</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              <div className="text-sm text-gray-500">Showing {visible.length} results</div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-amber-600 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Customer</th>
                    <th className="py-3 px-4 text-left">Item</th>
                    <th className="py-3 px-4 text-right">Principal</th>
                    <th className="py-3 px-4 text-right">Interest</th>
                    <th className="py-3 px-4 text-right">Due</th>
                    <th className="py-3 px-4 text-center">Days</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((en, idx) => (
                    <tr
                      key={en.id}
                      className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-amber-50 transition`}
                    >
                      <td className="py-2 px-4">{en.id}</td>
                      <td className="py-2 px-4 font-medium">{en.customer}</td>
                      <td className="py-2 px-4">{en.item}</td>
                      <td className="py-2 px-4 text-right">₹{en.principal.toLocaleString()}</td>
                      <td className="py-2 px-4 text-right">₹{en.interest.toLocaleString()}</td>
                      <td className="py-2 px-4 text-right font-semibold text-amber-700">₹{en.dueAmount.toLocaleString()}</td>
                      <td className="py-2 px-4 text-center">
                        <div className="text-sm">{en.daysHeld}d</div>
                        <div className="text-xs text-gray-400">tenure {en.tenureDays}d</div>
                      </td>
                      <td className="py-2 px-4">
                        {en.status === "returned" ? (
                          <span className="text-sm text-green-700 font-medium">Returned</span>
                        ) : en.isOverdue ? (
                          <span className="text-sm text-red-600 font-medium">Overdue</span>
                        ) : (
                          <span className="text-sm text-yellow-700 font-medium">Active</span>
                        )}
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex gap-2">
                          {en.status !== "returned" && (
                            <button
                              onClick={() => markReturned(en.id)}
                              className="text-sm bg-green-600 text-white px-3 py-1 rounded-lg hover:opacity-90"
                            >
                              Mark returned
                            </button>
                          )}
                          <button
                            onClick={() => removeEntry(en.id)}
                            className="text-sm bg-red-600 text-white px-3 py-1 rounded-lg hover:opacity-90"
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {visible.length === 0 && (
                    <tr>
                      <td colSpan="9" className="py-8 px-4 text-center text-gray-500">
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <footer className="text-xs text-gray-400 mt-4">Tip: set interest rate to match your shop policy</footer>
      </div>
    </div>
  );
}
