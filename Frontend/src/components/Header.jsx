import React from "react";
import { UserCircle } from "lucide-react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const goToReset = () => {
    navigate("/reset-password");
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border-b shadow-sm">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-10 mr-3" />
        <h1 className="text-2xl font-semibold text-gray-800">
          Shree Laxmi Jewellers and Sons
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="flex items-center cursor-pointer hover:opacity-80"
          onClick={goToReset}
        >
          <span className="mr-2 text-gray-700">Admin</span>
          <UserCircle className="h-7 w-7 text-gray-600" />
        </div>
      </div>
    </header>
  );
};

export default Header;
