import { CircularProgressBar } from '@fibonacci-innovative-solutions/hrms-design-library';
const leaveData = [
  { name: 'Bereavement', value: 6, full: 10 },
  { name: 'Sick ', value: 10, full: 10 },
  { name: 'Casual ', value: 8, full: 10 },
  { name: 'Birthday ', value: 10, full: 10 },
  { name: 'Vacation ', value: 9, full: 10 },
];

const TimeOffCircle = ({ value, full, name }: { value: number; full: number; name: string }) => {
  const percent = Math.round((value / full) * 100);
  return (
    <div className="flex flex-col items-center gap-2">
      <CircularProgressBar
        value={percent}
        label={`${value} of ${full} Available`}
        size={160}
        strokeWidth={14}
        type="full"
      />
      <div className=" text-black text-sm font-Poppins font-medium text-center ">{name}</div>
    </div>
  );
};

const TimeOffBalance = () => {
  return (
    <div className="p-2 w-full">
      <div className="text-primary font-Poppins text-lg font-semibold mb-4">Time Off Balance</div>
      <div className="flex justify-between items-center">
        {leaveData.map((item, index) => (
          <TimeOffCircle key={index} value={item.value} full={item.full} name={item.name} />
        ))}
      </div>
    </div>
  );
};

export default TimeOffBalance;
