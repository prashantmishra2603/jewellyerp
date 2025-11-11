import { useERP } from "../context/ERPContext";
import Table from "../components/Table";

export default function Inventory() {
  const { inventory } = useERP();

  // Add sample data if inventory is empty
  const sampleInventory = [
    { Name: "Gold Necklace", Category: "Jewelry", Price: "₹85,000", Stock: 12 },
    { Name: "Silver Ring", Category: "Jewelry", Price: "₹2,500", Stock: 40 },
    { Name: "Diamond Earrings", Category: "Luxury", Price: "₹1,25,000", Stock: 5 },
    { Name: "Gold Bangles", Category: "Jewelry", Price: "₹55,000", Stock: 20 },
    { Name: "Platinum Chain", Category: "Luxury", Price: "₹95,000", Stock: 8 },
    { Name: "Silver Bracelet", Category: "Jewelry", Price: "₹3,000", Stock: 25 },
    { Name: "Gemstone Pendant", Category: "Precious Stones", Price: "₹18,000", Stock: 10 },
    { Name: "Wedding Ring", Category: "Special Collection", Price: "₹45,000", Stock: 6 },
  ];

  const displayInventory = inventory.length ? inventory : sampleInventory;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          Inventory Management
        </h2>
        <div className="bg-white shadow-xl rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <Table
            data={displayInventory}
            headers={["Name", "Category", "Price", "Stock"]}
          />
        </div>
      </div>
    </div>
  );
}
