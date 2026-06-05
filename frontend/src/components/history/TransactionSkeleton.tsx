// components/history/TransactionSkeleton.tsx
export function TransactionSkeleton() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-subtle">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-subtle bg-surface-sunken">
            <th className="h-10 px-4 text-left">Type</th>
            <th className="h-10 px-4 text-right">Amount</th>
            <th className="h-10 px-4 text-center">Status</th>
            <th className="h-10 px-4 text-left">Description</th>
            <th className="h-10 px-4 text-right">Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className="border-b border-subtle">
              <td className="h-12 px-4">
                <div className="h-4 w-16 animate-pulse rounded bg-surface-sunken" />
              </td>
              <td className="h-12 px-4 text-right">
                <div className="ml-auto h-4 w-20 animate-pulse rounded bg-surface-sunken" />
              </td>
              <td className="h-12 px-4 text-center">
                <div className="mx-auto h-5 w-14 animate-pulse rounded-full bg-surface-sunken" />
              </td>
              <td className="h-12 px-4">
                <div className="h-4 w-32 animate-pulse rounded bg-surface-sunken" />
              </td>
              <td className="h-12 px-4 text-right">
                <div className="ml-auto h-3 w-16 animate-pulse rounded bg-surface-sunken" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
