import { createContext, useContext, useState } from "react";

const ERPContext = createContext();

export const ERPProvider = ({ children }) => {
  const [inventory, setInventory] = useState([]);
  const [girvi, setGirvi] = useState([]);
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  return (
    <ERPContext.Provider
      value={{
        inventory,
        setInventory,
        girvi,
        setGirvi,
        sales,
        setSales,
        customers,
        setCustomers,
        suppliers,
        setSuppliers,
      }}
    >
      {children}
    </ERPContext.Provider>
  );
};

export const useERP = () => useContext(ERPContext);
