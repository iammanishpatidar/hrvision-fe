import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InvitationAcceptancePopup from '@/components/InvitationAcceptancePopup/InvitationAcceptancePopup';
import { handleToast } from '@/utils/toastUtils';
import { EmployeeService } from '@/apis/services/EmployeeService';
import useAdminStore from '@/store/admin-store';
import { IOnboardingDetails } from '@/types';
import Loader from '@/components/common/loader/Loader';

interface InvitationData {
  email: string;
  business_id: string;
  role_id: string;
  expires_at: string;
  token?: string;
}

const InvitationAcceptance: React.FC = () => {
  const { onboardingDetails, setOnboardingDetails } = useAdminStore();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [invitationData, setInvitationData] = useState<InvitationData>({
    email: '',
    business_id: '',
    role_id: '',
    expires_at: '',
    token: ''
  });

  useEffect(() => {
    const email = searchParams.get('email');
    const business_id = searchParams.get('business_id');
    const role_id = searchParams.get('role_id');
    const expires_at = searchParams.get('expires_at');
    const token = searchParams.get('token'); // Extract token from URL

    

    if (!email || !business_id || !role_id || !expires_at) {
      handleToast({
        message: 'Invalid invitation link. Please contact your administrator.',
        status: 'error',
      });
      navigate('/signin');
      return;
    }

    const tokenData = {
      email,
      business_id,
      role_id,
      expires_at,
      token, // Include token if available
    };

    setInvitationData({
      email: email || '',
      business_id: business_id || '',
      role_id: role_id || '',
      expires_at: expires_at || '',
      token: token || '', // Store token in state
    });

    validateTokenWithBackend(tokenData);

  }, [searchParams, navigate]);

  const validateTokenWithBackend = async (tokenData: object) => {
    try {
      await EmployeeService.validateInvitationToken(tokenData);
      
      setTimeout(() => {
        setShowPopup(true);
        setIsLoading(false);
      }, 100);
    } catch (error: any) {
      handleToast({
        message: error?.response?.data?.message || 'Invalid invitation link. Please contact your administrator.',
        status: 'error',
      });
      navigate('/signin');
    }
  };

  const handleAccept = async () => {
    

    try {
      if (invitationData.email) {
        handleToast({
          message: 'Invitation accepted successfully!',
          status: 'success',
        });
      } else {
       
        handleToast({
          message: 'Malformed Invite Link.',
          status: 'error',
        });
        return;
      }

     
      setShowPopup(false);
      setOnboardingDetails({
        businessData: onboardingDetails?.businessData || null,
        employeeData: {
          ...onboardingDetails?.employeeData,
          invited: true  // Correct: lowercase i, inside employeeData
        }
      } as IOnboardingDetails);

      

      navigate('/signup');
      
    } catch (error: any) {
      // Show specific error message if available
      const errorMessage = error?.response?.data?.message ||
                          error?.response?.data?.error ||
                          error?.message ||
                          'Failed to accept invitation. Please try again.';

      handleToast({
        message: errorMessage,
        status: 'error',
      });

    
      navigate('/signup');
    }
  };

  const handleDecline = async () => {
    

    try {
      // For declining, we don't need to call the API - just redirect
      // The backend doesn't necessarily need to know about declines
      setShowPopup(false);

      // Redirect outside the website - you can change this to any external URL
      // Options:
      // window.location.href = 'https://www.yourcompany.com'; // Company website
      // window.location.href = '/'; // Home page
      // window.close(); // Close the window/tab (may not work in all browsers)

      // For now, redirecting to home page
      window.location.href = '/';

    } catch (error: any) {
      console.error("Error in handleDecline:", error);
      // Even if there's an error, still redirect outside
      window.location.href = '/';
    }
  };

  const handleCancel = async () => {
    try {
      navigate('/signin')
    } catch (error: any) {
      handleToast({
        message: 'Some Error Occured. Please close the window',
        status: 'error',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          {/* <p className="mt-2 text-gray-600">Loading invitation...</p> */}
          <Loader containerStyle="h-[500px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      {showPopup && (
        <InvitationAcceptancePopup
          isOpen={showPopup}
          onAccept={handleAccept}
          onDecline={handleDecline}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default InvitationAcceptance;
