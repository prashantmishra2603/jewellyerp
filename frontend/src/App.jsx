import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { ERPProvider } from "./context/ERPContext";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import Inventory from "./pages/Inventory";
import Purchase from "./pages/Purchase";
import Suppliers from "./pages/Suppliers";
import Girvi from "./pages/Girvi";
//import Settings from "./pages/Settings";

function App() {
  return (
    <ERPProvider>
      <BrowserRouter>
        <div className="flex h-screen bg-gray-50 text-gray-900">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <Navbar />

            <main className="flex-1 p-6 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/reports" element={<Reports />} />
                 <Route path="/customers" element={<Customers />} />
                 <Route path ="/purchase" element ={<Purchase/>}/>
                 <Route path="/suppliers" element={<Suppliers />} />
                 <Route path="/girvi" element={<Girvi />} />
               
               
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ERPProvider>
  );
}

export default App;
