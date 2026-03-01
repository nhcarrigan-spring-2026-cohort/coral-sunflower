type leaseInfoProps = {
  leaseStartDate: string;
  leaseEndDate: string;
};

export function LeaseInfo({ leaseStartDate, leaseEndDate }: leaseInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 text-left">
      <div className="space-y-1">
        <p className="text-gray-400 text-xs font-bold uppercase">Lease Started</p>
        <p className="text-lg text-gray-800 font-medium">{leaseStartDate}</p>
      </div>
      <div className="space-y-1">
        <p className="text-gray-400 text-xs font-bold uppercase">Lease Expires</p>
        <p className="text-lg text-gray-800 font-medium">{leaseEndDate}</p>
      </div>
    </div>
  );
}
