import { ProfileDataTypes } from '@/types';
import React from 'react';
import { MapPin } from 'lucide-react';
import useAdminStore from '@/store/admin-store';

interface ProfileDataProps {
  ProfileData: ProfileDataTypes;
}

const ProfileCards: React.FC<ProfileDataProps> = ({ ProfileData }) => {
  const { onboardingDetails } = useAdminStore();

  // Get the name from onboardingDetails, fallback to ProfileData if not available
  const userName = onboardingDetails?.employeeData?.name || ProfileData.firstName;

  // Get the location from permanent address, fallback to ProfileData if not available
  const userLocation = onboardingDetails?.employeeData?.permanent_address
    ? `${onboardingDetails.employeeData.permanent_address.city}, ${onboardingDetails.employeeData.permanent_address.state}`
    : ProfileData.location;

  return (
    <div className="bg-white rounded-lg border w-[262px] h-[276px] border-gray-100 p-7">
      <h2 className="text-3xl font-semibold text-primary mb-1">Hi {userName},</h2>
      <p className="text-gray-v10 mb-5 text-sm">What would you like to explore today?</p>
      <div className="flex items-center gap-4 mb-4">
        <img src={ProfileData.image} className="w-16 h-16 rounded-full object-cover" alt="User" />
        <div>
          <p className="text-dark-1 font-semibold text-base">
            {userName} 
          </p>
          <p className="text-gray-500 text-sm">{ProfileData.title}</p>
        </div>
      </div>
      <hr className="border-t border-gray-200 " />
      <div className="flex items-center justify-center mt-3 gap-2 text-sm text-gray-v10">
        <MapPin className="text-gray-v4 w-6" />
        <p>{userLocation}</p>
      </div>
    </div>
  );
};
export default ProfileCards;