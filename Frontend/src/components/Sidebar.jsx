import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Package,
  Database,
  LineChart,
  LogOut,
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
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("auth");
      window.location.href = "/login";
    }
  };

  return (
    <div className="flex flex-col w-64 bg-white border-r shadow-lg">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-2">
          <NavItem to="/" icon={<LayoutDashboard size={20} />}>
            Dashboard
          </NavItem>
          <NavItem to="/billing" icon={<FileText size={20} />}>
            Billing
          </NavItem>
          <NavItem to="/girwi" icon={<Database size={20} />}>
            Girwi
          </NavItem>
          <NavItem to="/stock" icon={<Package size={20} />}>
            Stock
          </NavItem>
          <NavItem to="/reports" icon={<LineChart size={20} />}>
            Reports
          </NavItem>
        </nav>
      </div>

      <div className="p-4 border-t">
        <NavItem
          to="#"
          icon={<LogOut size={20} />}
          onClick={handleLogout}
        >
          Logout
        </NavItem>
      </div>
    </div>
  );
};

export default Sidebar;
