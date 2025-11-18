type LegendProps = {
  data: {
    name: string;
    value: number;
    fill: string;
  }[];
};

export const Legend = ({ data }: LegendProps) => {
  return (
    <div className="rounded-md w-fit min-w-[240px] px-2 py-[6px]">
      <div className="flex justify-between px-3 py-2 text-sm font-medium text-gray-500 border-b border-amber-400">
        <div className="text-[#737373] text-xs font-medium">Leave Type</div>
        <div className="text-[#737373] text-xs font-medium">Consumed</div>
      </div>

      {data.map((item, index) => (
        <div key={index} className="flex justify-between items-center px-3 py-2 text-sm">
          <div className="flex items-center gap-3">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: item.fill }}
            ></span>
            <span className="text-[#404040] text-sm">{item.name}</span>
          </div>
          <div className="font-semibold text-[#0A0A0A] text-sm">{item.value}</div>
        </div>
      ))}
    </div>
  );
};
