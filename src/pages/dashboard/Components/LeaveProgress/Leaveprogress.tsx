import { useState, useEffect } from 'react';
interface Leavedata {
  type: string;
  percentage: number;
  used: number;
  total: number;
}
const Leaveprogress = () => {
  const [leavedata, setleavedata] = useState<Leavedata[]>([]);
  useEffect(() => {
    const fetchdata = async () => {
      const data = [
        { type: 'Casual Leave', percentage: 30, used: 12, total: 55 },
        { type: 'Sick Leave', percentage: 62.5, used: 10, total: 45 },
        { type: 'Maternity Leave', percentage: 0, used: 0, total: 20 },
        { type: 'Short Leave', percentage: 70, used: 15, total: 60 },
      ];
      setleavedata(data);
    };
    fetchdata();
  }, []);
  return (
    <div className="bg-white rounded-lg border border-gray-100 w-[660px] h-[296px] ml-3 p-6">
      <h3 className="text-primary text-lg font-semibold mb-6">Leave Summary</h3>
      <div className="space-y-4">
        {leavedata.map((leave, index) => (
          <div key={index} className="flex items-center">
            <div className="w-40 text-xs font-medium text-gray-600">{leave.type}</div>
            <div className="flex-1 mx-4">
              <div
                className=" bg-gray-200 rounded-full h-3 rounded-l-none border-blue-v1 border"
                style={{ width: `${leave.total * 1.5}%` }}
              >
                <div
                  className="bg-blue-v1 h-3 rounded-full rounded-l-none"
                  style={{ width: `${leave.percentage}%` }}
                ></div>
              </div>
            </div>
            <div className="w-8 text-right text-sm font-semibold text-gray-700">{leave.used}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaveprogress;
