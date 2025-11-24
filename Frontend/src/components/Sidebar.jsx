import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Package,
  Database,
  LineChart,
  LogOut,
  Menu,
  X
} from "lucide-react";

// Reusable NavLink component for styling
const NavItem = ({ to, icon, children, onClick }) => {
  const commonClasses = "flex items-center px-4 py-3 text-gray-700 rounded-lg";

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `${commonClasses} ${
          isActive
            ? "bg-brand-gold bg-opacity-20 text-brand-gold font-bold"
            : "hover:bg-gray-200"
        }`
      }
    >
      {icon}
      <span className="ml-3">{children}</span>
    </NavLink>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("auth");
      window.location.href = "/login";
    }
  };

  return (
    <>
      {/* MOBILE HEADER BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        onClick={() => setOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* OVERLAY (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-white border-r shadow-lg z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Close button mobile */}
        <div className="md:hidden flex justify-end p-3">
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-2">
            <NavItem
              to="/"
              icon={<LayoutDashboard size={20} />}
              onClick={() => setOpen(false)}
            >
              Dashboard
            </NavItem>

            <NavItem
              to="/billing"
              icon={<FileText size={20} />}
              onClick={() => setOpen(false)}
            >
              Billing
            </NavItem>

            <NavItem
              to="/girwi"
              icon={<Database size={20} />}
              onClick={() => setOpen(false)}
            >
              Girwi
            </NavItem>

            <NavItem
              to="/stock"
              icon={<Package size={20} />}
              onClick={() => setOpen(false)}
            >
              Stock
            </NavItem>

            <NavItem
              to="/reports"
              icon={<LineChart size={20} />}
              onClick={() => setOpen(false)}
            >
              Reports
            </NavItem>
          </nav>
        </div>

        <div className="p-4 border-t">
          <NavItem
            to="#"
            icon={<LogOut size={20} />}
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
          >
            Logout
          </NavItem>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
