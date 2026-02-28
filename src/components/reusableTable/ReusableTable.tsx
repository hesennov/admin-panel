import type { Column } from "../../types/user";

interface ReusableTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading: boolean;
}

export default function ReusableTable<T extends { id: number | string }>({
  data,
  columns,
  loading,
}: ReusableTableProps<T>) {
  //have to created loading and error components
  if (loading) return <div>Loading...</div>;
  if (!Array.isArray(data)) return <div>No data</div>;
  // if (data.length === 0) return <div>no tnego data amigo</div>;
  return (
    <div>
      <table className="table-auto w-full border">
        <thead>
          <tr className="border px-4 py-2">
            {columns.map((col) => (
              <th key={String(col.key)}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => {
                const value = row[col.key];
                return (
                  <td
                    className="px-4 py-2 border"
                    key={`${row.id}-${String(col.key)}`}
                  >
                    {col.render ? col.render(value, row) : String(value)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
