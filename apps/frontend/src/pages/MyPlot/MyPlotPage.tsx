import PlotCard from "./components/PlotCard";
import PlotFooterNote from "./components/PlotFooterNote";
import PlotHeader from "./components/PlotHeader";

export type PlotData = {
  userId: string;
  plotId: string;
  size: string;
  leaseStartDate: string;
  leaseEndDate: string;
  leaseStatus: "Active" | "Warning" | "Overdue";
  responsibilities: string[];
};

export default function MyPlot() {
  const dummyPlot: PlotData = {
    userId: "t12457",
    plotId: "B-14",
    size: "10x10 In-Ground",
    leaseStartDate: "2025-03-01",
    leaseEndDate: "2026-10-31",
    leaseStatus: "Active",
    responsibilities: [
      "Mow shared path (Section B) by Sunday",
      "Clean communal tool shed on Wednesday",
      "Ensure water spigot B is turned off daily",
    ],
  };

  const statusColor = {
    Active: "bg-green-100 text-green-800 border-green-200",
    Warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    Overdue: "bg-red-100 text-red-800 border-red-200",
  }[dummyPlot.leaseStatus];

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <PlotHeader statusColor={statusColor} leaseStatus={dummyPlot.leaseStatus} />
        {/* Main Card */}
        <PlotCard plot={dummyPlot} />

        <PlotFooterNote />
      </div>
    </div>
  );
}
