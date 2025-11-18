// CustomTooltip.tsx
type CustomTooltipProps = {
  payload?: any[];
  active?: boolean;
};

export const CustomTooltip = ({ payload, active }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  const activeData = payload[0].payload; // Extract the payload data
  const fill = activeData.fill;

  return (
    <div className="bg-[#F5F5F5] shadow-md rounded-md text-sm">
      <div
        className="text-sm px-2 py-1 rounded-t-md"
        style={{ backgroundColor: fill, color: 'white' }}
      >
        {activeData.name}
      </div>
      <div className="text-gray-600 mt-1 px-2 pb-2 flex gap-[14px] items-center">
        <div className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: fill }}></div>
        <div className="flex items-center gap-2">
          <div className="text-xs font-medium">{activeData.value}</div>
          <div className="w-[1px] h-4 bg-gray-400"></div>
          <div className="text-xs font-medium">{activeData.full}</div>
        </div>
      </div>
    </div>
  );
};
