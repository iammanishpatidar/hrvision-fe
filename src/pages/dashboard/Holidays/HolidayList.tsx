import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import useAdminStore from '@/store/admin-store';
import { HolidayServices } from '@/apis/services/HolidayService';
import { groupHolidaysByMonthYear } from '@/utils/groupHolidaysByMonth';
import { HolidayInfo } from '@/pages/setting/holiday';

const HolidayList = () => {
  const [holidayData, setHolidayData] = useState<Record<string, HolidayInfo[]>>();
  const businessId = useAdminStore(state => state.onboardingDetails?.businessData?.id);

  const { mutate: fetchHolidays } = useMutation({
    mutationFn: async (businessId: string) => {
      const response = await HolidayServices.getHolidays(businessId);
      return response.data;
    },
    onSuccess: data => {
      const holidaysArr = data?.data || [];
      setHolidayData(groupHolidaysByMonthYear(holidaysArr));
    },
    onError: error => {
      console.error('Error fetching holidays:', error);
    },
  });

  useEffect(() => {
    if (businessId) {
      fetchHolidays(businessId);
    }
  }, [businessId, fetchHolidays]);

  const getHolidayColor = (type: string) => {
    switch (type) {
      case 'National Holiday':
        return 'bg-green-500';
      case 'Cultural/Religious Holiday':
        return 'bg-blue-500';
      case 'Optional/Restricted Holiday':
        return 'bg-yellow-500';
      case 'Company-Specific Holiday':
        return 'bg-orange-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getDayFromDate = (date: Date | string | null): string => {
    if (!date) return '--';

    const dateObj = typeof date === 'string' ? new Date(date) : date;

    if (isNaN(dateObj.getTime())) return '--';

    return dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  };

  if (!holidayData || Object.keys(holidayData).length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="text-center text-gray-500">No holidays found</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      {Object.entries(holidayData).map(([monthYear, holidays]) => (
        <div key={monthYear} className="mb-5">
          <h3 className="text-base font-medium text-gray-900 mb-3">{monthYear}</h3>
          {holidays.map((holiday, index) => (
            <div
              key={holiday.id || index}
              className="flex items-stretch bg-white rounded-lg border border-gray-200 shadow-sm mb-2 overflow-hidden h-[60px]"
            >
              <div className={`w-[6px] ${getHolidayColor(holiday.type)}`} />

              <div className="flex items-center p-3 w-full">
                <div className="w-1/3 font-semibold text-gray-8 text-lg">
                  {getDayFromDate(holiday.date)}
                </div>
                <div className="flex flex-col text-left text-[13px] text-gray-v10 w-2/3">
                  <span>Full Day</span>
                  <span className="text-[14px] font-semibold text-gray-900">{holiday.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HolidayList;
