export default function DashboardCard({ title, count, color }) {
  return (
    <div className={`${color} rounded-xl p-5 shadow-sm`}>
      <p className="text-sm text-gray-600">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800 mt-2">{count}</h3>
    </div>
  );
}
