import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis, Tooltip } from 'recharts';
import { CustomTooltip } from './CustomTootip';
import { Legend } from './legend';

// Define the prop types for LeaveChart
interface LeaveChartProps {
  startMonthIndex: number | null;
  endMonthIndex: number | null;
  originalData: {
    name: string;
    value: number;
    full: number;
    fill: string;
  }[];
}

const LeaveChart = ({ startMonthIndex, endMonthIndex, originalData }: LeaveChartProps) => {
  const monthsInRange =
    startMonthIndex !== null && endMonthIndex !== null ? endMonthIndex - startMonthIndex + 1 : 12; // Default to 12 months if no range is selected

  const filteredData = originalData.map(item => {
    const adjustedValue =
      startMonthIndex !== null && endMonthIndex !== null
        ? (item.value / item.full) * ((100 * monthsInRange) / 12) // Adjust the value by the selected months
        : item.value;

    // Round the value to the nearest integer (you can change this to a specific number of decimals if needed)
    const roundedValue = Math.round(adjustedValue);

    return {
      ...item,
      value: roundedValue,
    };
  });

  const data = filteredData;

  const barSize = 12;
  const gap = 2;
  const baseRadius = 30;

  return (
    <div className="flex justify-between items-center h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="40%"
          outerRadius={`${baseRadius + originalData.length * (barSize + gap)}%`}
          barSize={barSize}
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
          <RadialBar
            dataKey="value"
            cornerRadius={10}
            isAnimationActive={false}
            background={{ fill: '#f0f0f0' }}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
        </RadialBarChart>
      </ResponsiveContainer>
      <Legend data={data} />
    </div>
  );
};

export default LeaveChart;
