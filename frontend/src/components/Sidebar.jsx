import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/inventory", label: "Inventory" },
   { to: "/girvi", label: "Girvi" },
  { to: "/sales", label: "Sales" },
  { to: "/purchase", label: "Purchase" },
  { to: "/customers", label: "Customers" },
  { to: "/suppliers", label: "Suppliers" },
  { to: "/reports", label: "Reports" },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="w-64 bg-white border-r shadow-sm">
      <div className="p-6 font-bold text-2xl text-yellow-600">💎 JewelERP</div>
      <nav className="flex flex-col gap-2 px-4">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`p-2 rounded-lg ${
              pathname === link.to
                ? "bg-yellow-100 text-yellow-700 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
