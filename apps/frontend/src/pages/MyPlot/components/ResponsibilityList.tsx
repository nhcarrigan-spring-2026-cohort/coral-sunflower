import type { Responsibility } from "../../../services/plotServices";
import ResponsibilityItem from "./ResponsibilityItem";

type ResponsibilityListProps = {
  responsibilities: Responsibility[];
};

export function ResponsibilityList({ responsibilities }: ResponsibilityListProps) {
  return (
    <div className="border-t border-gray-100 pt-8 text-left">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Communal Responsibilities</h3>
      <div className="space-y-3">
        {responsibilities.map((resp) => (
          <ResponsibilityItem
            id={resp.id}
            initialCompleted={resp.initialCompleted}
            key={resp.id}
            responsibility={resp.description}
          />
        ))}
      </div>
    </div>
  );
}
