import React from 'react';
import { CelebrationDataTypes } from '@/types';
interface Celebrationcardprops {
  CelebrationData: CelebrationDataTypes;
}
const Celebration: React.FC<Celebrationcardprops> = ({ CelebrationData }) => {
  return (
    <div className="bg-white rounded-lg w-[373px] border border-gray-100 p-4.5 h-[472px]">
      <h3 className="text-lg font-semibold text-primary mb-4">Today&apos;s Celebration</h3>

      <div className="space-y-3">
        <div className="flex gap-3 items-center rounded-lg shadow-sm p-3">
          <img
            src={CelebrationData.image}
            className="w-10 h-10 rounded-full object-cover"
            alt="User"
          />
          <div>
            <h4 className="text-black font-medium text-xs">{CelebrationData.person}</h4>
            <p className="text-gray-v11 text-xs">{CelebrationData.Designation}</p>
            <p className="text-pink-v1 text-xs">Happy Birthday!</p>
          </div>
        </div>

        <div className="flex gap-3 items-center rounded-lg shadow-sm p-3">
          <img
            src={CelebrationData.image}
            className="w-10 h-10 rounded-full object-cover"
            alt="User"
          />
          <div>
            <h4 className="text-black font-medium text-xs">{CelebrationData.person}</h4>
            <p className="text-gray-v11 text-xs">{CelebrationData.Designation}</p>
            <p className="text-yellow-v1 text-xs">2nd Work Anniversary</p>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-primary mt-6 mb-3">Upcoming Celebrations</h3>
      <div className="space-y-3">
        <div className="flex gap-3 items-center rounded-lg shadow-sm p-3">
          <img
            src={CelebrationData.image}
            className="w-10 h-10 rounded-full object-cover"
            alt="User"
          />
          <div>
            <h4 className="text-black font-medium text-xs">{CelebrationData.person}</h4>
            <p className="text-gray-v11 text-xs">{CelebrationData.Designation}</p>
            <p className="text-pink-v1 text-xs">Happy Birthday!</p>
          </div>
        </div>

        <div className="flex gap-3 items-center rounded-lg shadow-sm p-3">
          <img
            src={CelebrationData.image}
            className="w-10 h-10 rounded-full object-cover"
            alt="User"
          />
          <div>
            <h4 className="text-black font-medium text-xs">{CelebrationData.person}</h4>
            <p className="text-gray-v11 text-xs">{CelebrationData.Designation}</p>
            <p className="text-yellow-v1 text-xs">2nd Work Anniversary</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Celebration;
