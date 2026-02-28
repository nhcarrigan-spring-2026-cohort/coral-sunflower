import ResponsibilityItem from "./ResponsibilityItem";

type ResponsibilityListProps = {
  responsibilities: string[];
};

export function ResponsibilityList({ responsibilities }: ResponsibilityListProps) {
  return (
    <div className="border-t border-gray-100 pt-8 text-left">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Communal Responsibilities</h3>
      <div className="space-y-3">
        {responsibilities.map((resp, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: temporary mock data
          <ResponsibilityItem key={index} responsibility={resp} initialCompleted={false} id={String(index)} />
        ))}
      </div>
    </div>
  );
}
