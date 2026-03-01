import LeaseStatusBadge from "./LeaseStatusBadge";

type PlotHeaderProps = {
  leaseStatus: "Active" | "Warning" | "Overdue";
};

export default function PlotHeader({ leaseStatus }: PlotHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div className="text-left">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">My Plot</h1>
        <p className="text-gray-500 mt-1">Manage your garden space and communal duties</p>
      </div>
      <div className="flex flex-col items-start md:items-end ">
        <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Lease Status</p>
        <LeaseStatusBadge status={leaseStatus} />
      </div>
    </div>
  );
}
