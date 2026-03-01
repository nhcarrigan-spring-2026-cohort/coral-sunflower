import { useEffect, useState } from "react";
import type { PlotData } from "../../services/plotServices";
import { fetchMyPlotData } from "../../services/plotServices";
import PlotCard from "./components/PlotCard";
import PlotFooterNote from "./components/PlotFooterNote";
import PlotHeader from "./components/PlotHeader";

export default function MyPlotPage() {
  const [plotData, setPlotData] = useState<PlotData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPlotData = async () => {
      try {
        const plotData = await fetchMyPlotData();
        setPlotData(plotData);
      } catch (error) {
        console.error("Failed to fetch plot data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPlotData();
  }, []);

  //  Handle the loading state
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium animate-pulse">Loading Your Garden Data... 🪴</p>
      </div>
    );
  }

  // handle case where the data failed to load
  if (!plotData) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <p className="text-red-500 font-medium ">Failed to Load Plot Data </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <PlotHeader leaseStatus={plotData.leaseStatus} />
        {/* Main Card */}
        <PlotCard plot={plotData} />

        <PlotFooterNote />
      </div>
    </div>
  );
}
