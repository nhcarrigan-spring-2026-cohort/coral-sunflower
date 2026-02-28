type PlotHeaderProps = {
  statusColor: string;
  leaseStatus: string;
};

export default function PlotHeader({ statusColor, leaseStatus }: PlotHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div className="text-left">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">My Plot</h1>
        <p className="text-gray-500 mt-1">Manage your garden space and communal duties</p>
      </div>
      <div className={`px-4 py-1.5 rounded-full border text-sm font-bold uppercase tracking-wider ${statusColor}`}>
        {leaseStatus}
      </div>
    </div>
  );
}
