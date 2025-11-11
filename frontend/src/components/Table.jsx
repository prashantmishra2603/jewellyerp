export default function Table({ data, headers }) {
  return (
    <table className="w-full border-collapse bg-white shadow-sm rounded-xl">
      <thead>
        <tr className="bg-gray-100 text-left">
          {headers.map((h, i) => (
            <th key={i} className="p-3 border-b text-gray-600">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr><td className="p-3 text-center text-gray-500" colSpan={headers.length}>No records found</td></tr>
        ) : (
          data.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {headers.map((h, j) => (
                <td key={j} className="p-3 border-b">{row[h.toLowerCase()]}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
