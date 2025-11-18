import React from 'react';
import { notifications, profileImageUrl } from '@/pages/user-profile/mockData';
import { Close, Drawer, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import { getFormattedNotificationTime } from '@/utils/getFormattedNotificationTime';

interface NotificationsSheetProps {
  isOpen: boolean;
  onClose: (sheetName: string) => void;
  toggleDrawer: (sheetName: string) => void;
}

const NotificationsSheet: React.FC<NotificationsSheetProps> = ({
  isOpen,
  onClose,
  toggleDrawer,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => onClose('notifications')}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col justify-between p-6 overflow-y-auto"
    >
      <div className="flex justify-end">
        <div
          className="cursor-pointer hover:bg-custom-blue-v2 p-2 rounded-[14px]"
          onClick={() => toggleDrawer('notifications')}
        >
          <Close />
        </div>
      </div>
      <div className="flex flex-col gap-6 px-6 pb-6">
        <Typography tag="h3" className="text-primary">
          Notifications
        </Typography>
      </div>
      <div className="flex flex-col overflow-y-auto">
        {notifications.map(notification => (
          <div key={notification.id} className="p-6 border-t border-gray-v2 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img
                src={profileImageUrl}
                alt={notification.userName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex flex-wrap">
                {notification.userName && (
                  <Typography tag="h5" className="capitalize">
                    {notification.userName}
                  </Typography>
                )}
                <Typography tag="t3" className="ml-1">
                  {notification.action}
                </Typography>

                {notification.task && (
                  <Typography tag="h5" className="ml-1">
                    {notification.task}
                  </Typography>
                )}
                <Typography className="ml-1" tag="t3">
                  {notification.taskType}
                </Typography>
                {notification.taskStatus && (
                  <Typography className="ml-1 text-primary capitalize" tag="h5">
                    {notification.taskStatus}
                  </Typography>
                )}
              </div>
              <div className="text-gray-500 text-sm mt-1">
                {getFormattedNotificationTime(notification.time)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default NotificationsSheet;
