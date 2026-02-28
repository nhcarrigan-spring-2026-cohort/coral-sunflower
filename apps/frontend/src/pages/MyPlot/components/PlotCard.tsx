import type { PlotData } from "../MyPlotPage";
import { LeaseInfo } from "./LeaseInfo";
import { PlotCardHeader } from "./PlotCardHeader";
import { ResponsibilityList } from "./ResponsibilityList";

type PlotCardProps = {
  plot: PlotData;
};

export default function PlotCard({ plot }: PlotCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <PlotCardHeader plotId={plot.plotId} size={plot.size} />

      <div className="p-8">
        <LeaseInfo leaseStartDate={plot.leaseStartDate} leaseEndDate={plot.leaseEndDate} />

        <ResponsibilityList responsibilities={plot.responsibilities} />
      </div>
    </div>
  );
}
