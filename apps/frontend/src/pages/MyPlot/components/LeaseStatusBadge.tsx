type StatusBadgeProps = {
  status: "Active" | "Warning" | "Overdue";
};

export default function LeaseStatusBadge({ status }: StatusBadgeProps) {
  const statusColor = {
    Active: "bg-green-100 text-green-800 border-green-200",
    Warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Overdue: "bg-red-100 text-red-800 border-red-200",
  }[status];

  return (
    <div className={`px-4 py-1.5 rounded-full border text-sm font-bold uppercase tracking-wider ${statusColor}`}>
      {status}
    </div>
  );
}
