import { Button, Dropdown, SearchBar } from '@fibonacci-innovative-solutions/hrms-design-library';
import { useEffect, useState } from 'react';
import { HolidayList, HolidayType } from './components/HolidayList';
import { holidayTypeOptions } from './mockData';
import AddEditHolidaySheet from './components/AddEditHolidaySheet';
import { useMutation } from '@tanstack/react-query';
import { handleToast } from '@/utils/toastUtils';
import useAdminStore from '@/store/admin-store';
import { HolidayServices } from '@/apis/services/HolidayService';
import { groupHolidaysByMonthYear } from '@/utils/groupHolidaysByMonth';
import useLoaderStore from '@/store/loader-store';
import Loader from '@/components/common/loader/Loader';
import { localDateToISO } from '@/utils/formatDate';

export type HolidayInfo = {
  id?: string;
  name: string;
  date: Date | null;
  type: HolidayType;
  isMandatory: string;
  allowedEmployeeType: string[];
  region: string[];
};

const Holiday = () => {
  const [isEditHoliday, setIsEditHoliday] = useState<boolean>(false);
  const [showHolidaySheet, setShowHolidaySheet] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState<HolidayInfo | null>();
  const [holidayData, setHolidayData] = useState<Record<string, HolidayInfo[]>>();
  const businessId = useAdminStore(state => state.onboardingDetails?.businessData?.id);
  const { isLoading, setIsLoading } = useLoaderStore();

  const handleEdit = (holiday: HolidayInfo) => {
    setSelectedHoliday(holiday);
    setIsEditHoliday(true);
    setShowHolidaySheet(true);
  };

  const { mutate: fetchHolidays } = useMutation({
    mutationFn: async (businessId: string) => {
      setIsLoading(true);
      const response = await HolidayServices.getHolidays(businessId);
      return response.data;
    },
    onSuccess: data => {
      const holidaysArr = data?.data || [];
      setHolidayData(groupHolidaysByMonthYear(holidaysArr));
      setIsLoading(false);
    },
    onError: error => {
      console.error('Error fetching holidays:', error);
      handleToast({
        status: 'error',
        message: 'Failed to fetch holidays',
      });
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (businessId) {
      fetchHolidays(businessId);
    }
  }, [businessId, fetchHolidays]);

  const addHoliday = useMutation({
    mutationFn: async (holiday: HolidayInfo) => {
      setIsLoading(true);
      const payload = {
        ...holiday,
        date: holiday.date ? localDateToISO(holiday.date) : undefined,
        businessId: businessId,
      };
      const response = await HolidayServices.createHoliday(payload);
      return response.data;
    },
    onSuccess: () => {
      handleToast({
        status: 'success',
        message: 'Holiday added successfully',
      });
      setSelectedHoliday(null);
      // Refetch holidays after add
      if (businessId) fetchHolidays(businessId);
      setIsLoading(false);
    },
    onError: error => {
      console.error('Error adding holiday:', error);
      handleToast({
        status: 'error',
        message: 'Failed to add holiday',
      });
      setIsLoading(false);
    },
  });

  const editHoliday = useMutation({
    mutationFn: async (holiday: HolidayInfo) => {
      setIsLoading(true);
      const payload = {
        name: holiday.name,
        date: holiday.date,
        isMandatory: holiday.isMandatory,
        type: holiday.type,
        region: holiday.region,
        allowedEmployeeType: holiday.allowedEmployeeType,
      };

      const response = await HolidayServices.updateHoliday(payload, holiday.id!);
      return response.data;
    },
    onSuccess: () => {
      setSelectedHoliday(null);
      handleToast({
        status: 'success',
        message: 'Holiday updated successfully',
      });
      // Refetch holidays after edit
      if (businessId) fetchHolidays(businessId);
      setIsLoading(false);
    },
    onError: error => {
      console.error('Error updating holiday:', error);
      handleToast({
        status: 'error',
        message: 'Failed to update holiday',
      });
      setIsLoading(false);
    },
  });

  const handleAddHoliday = (newHoliday: HolidayInfo) => {
    if (!newHoliday.date) return;
    if (isEditHoliday) {
      editHoliday.mutate(newHoliday);
    } else {
      addHoliday.mutate(newHoliday);
    }
    setShowHolidaySheet(false);
    setIsEditHoliday(false);
    setSelectedHoliday(null);
  };

  const handleDelete = useMutation({
    mutationFn: async (holidayToDelete: HolidayInfo) => {
      setIsLoading(true);
      const response = await HolidayServices.deleteHoliday(holidayToDelete.id);
      return response.data;
    },
    onSuccess: () => {
      handleToast({
        status: 'success',
        message: 'Holiday deleted successfully',
      });
      // Refetch holidays after delete
      if (businessId) fetchHolidays(businessId);
      setIsLoading(false);
    },
    onError: () => {
      handleToast({
        status: 'error',
        message: 'Failed to delete holiday',
      });
      setIsLoading(false);
    },
  });

  const handleAddNew = () => {
    setSelectedHoliday(null);
    setIsEditHoliday(false);
    setShowHolidaySheet(true);
  };

  if (isLoading) {
    return <Loader containerStyle="w-4 h-4"/>;
  }

  // Show message if no holidays
  const isEmpty = !holidayData || Object.values(holidayData).every(arr => !arr || arr.length === 0);

  return (
    <div className="flex flex-col gap-6 px-10 pb-10">
      <div className="flex justify-end w-full">
        <Button onClick={handleAddNew} variant="primary">
          Add
        </Button>
      </div>

      <div className=" flex flex-col gap-6 border-1 border-[#E9EBEF] p-6 rounded-xl min-h-[300px]">
        <div className="flex items-center gap-4">
          <SearchBar className=" w-1/2 h-9" />
          <Dropdown
            options={holidayTypeOptions}
            onChange={selected => console.log('Selected:', selected)}
            label=""
            theme={{ inputStyle: 'w-fit !h-10' }}
            multi
          />
        </div>
        <div>
          {isEmpty ? (
            <div className="flex justify-center items-center h-40">
              <span className="text-lg text-gray-400 font-semibold">No holiday Added</span>
            </div>
          ) : (
            <HolidayList
              holidays={holidayData || {}}
              onEdit={handleEdit}
              onDelete={handleDelete.mutate}
            />
          )}
        </div>
      </div>
      <AddEditHolidaySheet
        showHolidaySheet={showHolidaySheet}
        setShowHolidaySheet={setShowHolidaySheet}
        onAddHoliday={handleAddHoliday}
        isEditHoliday={isEditHoliday}
        selectedHolidayItem={selectedHoliday}
      />
    </div>
  );
};

export default Holiday;
