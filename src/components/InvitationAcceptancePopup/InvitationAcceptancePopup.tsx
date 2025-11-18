import React from 'react';
import { Button, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import { X } from 'lucide-react';

interface InvitationAcceptancePopupProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  handleCancel: () => void;
}

const InvitationAcceptancePopup: React.FC<InvitationAcceptancePopupProps> = ({
  isOpen,
  onAccept,
  onDecline,
  handleCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col relative p-6">
          <button
            onClick={handleCancel}
            className="w-8 h-8 absolute top-4 right-4 cursor-pointer hover:bg-gray-50 rounded-lg flex items-center justify-center"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          
          <div className="flex flex-col gap-4 mt-2 text-center">
            <Typography tag="h3" className="text-black text-xl font-semibold">
              Welcome!
            </Typography>
            
            <Typography tag="h4" className="text-black text-base">
              You have been invited to join our team.
            </Typography>
            
            <Typography tag="h4" className="text-black text-base">
              Would you like to join?
            </Typography>
            
            <div className="flex gap-3 justify-center mt-4">
              <Button
                variant="outline"
                onClick={onDecline}
                className="px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                No
              </Button>
              <Button
                variant="primary"
                onClick={onAccept}
                className="px-4 py-2 cursor-pointer hover:opacity-90 transition-opacity"
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationAcceptancePopup;