type PlotCardHeaderProps = {
  plotId: string;
  size: string;
};

export function PlotCardHeader({ plotId, size }: PlotCardHeaderProps) {
  return (
    <div className="bg-green-700 px-8 py-6 text-white text-left">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-green-200 text-xs font-bold uppercase tracking-widest">Plot Identifier</span>
          <h2 className="text-3xl font-bold">{plotId}</h2>
        </div>
        <div className="text-right">
          <span className="text-green-200 text-xs font-bold uppercase tracking-widest">Dimensions</span>
          <p className="text-xl font-semibold">{size}</p>
        </div>
      </div>
    </div>
  );
}
