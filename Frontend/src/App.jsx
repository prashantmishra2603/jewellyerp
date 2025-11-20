import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import Girwi from "./pages/Girwi";
import Stock from "./pages/Stock";
import Reports from "./pages/Reports";
import ResetPassword from "./pages/ResetPassword"; // <-- added

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* added route */}
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/girwi" element={<Girwi />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}

export default App;
