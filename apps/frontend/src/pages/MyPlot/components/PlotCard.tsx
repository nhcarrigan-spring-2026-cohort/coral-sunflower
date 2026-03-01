import type { PlotData } from "../../../services/plotServices";
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
        <LeaseInfo leaseEndDate={plot.leaseEndDate} leaseStartDate={plot.leaseStartDate} />

        <ResponsibilityList responsibilities={plot.responsibilities} />
      </div>
    </div>
  );
}
