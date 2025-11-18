import { Calendar } from '@fibonacci-innovative-solutions/hrms-design-library';
import React from 'react';
import Celebration from './Components/cards/Celebration';
import ProfileCards from './Components/cards/ProfileCards';
import Timecard from './Components/cards/Timecard';
import FileRepository from './Components/FileRepositorytable/FileRepository';
import Leaveprogress from './Components/LeaveProgress/Leaveprogress';
import HolidayList from './Holidays/HolidayList';
import { CelebrationData, profileData } from './mockData';

export const DashboardLandingPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full p-6 gap-6">
      <h5 className="text-gray-v1 text-sm font-normal">Dashboard</h5>
      {/* Main Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Left Column */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile + Timecard */}
            <div className="flex flex-col gap-6">
              <ProfileCards ProfileData={profileData} />
              <Timecard />
            </div>
            {/* Celebration Section */}
            <div className=" md:w-1/2">
              <Celebration CelebrationData={CelebrationData} />
            </div>
          </div>
          <Leaveprogress />
          <FileRepository />
        </div>
        {/* Right Column */}
        <div className="w-[500px] h-[1173px] rounded-lg border p-3 border-gray-100 flex flex-col gap-7">
          <h2 className="text-lg font-semibold text-primary">Holidays</h2>
          <div className="rounded-lg border border-gray-200 flex items-center justify-center">
            <Calendar className="p-2" />
          </div>
          <HolidayList />
        </div>
      </div>
    </div>
  );
};
