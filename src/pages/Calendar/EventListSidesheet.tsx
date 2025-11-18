import { Close, Drawer, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import { calendersheet, holidaydata, workanniversary } from '../user-profile/mockData';

type EventListSidesheetProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedDate: string | null;
};

const EventListSidesheet = ({ isOpen, setIsOpen }: EventListSidesheetProps) => {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={handleClose}
      position="right"
      width="35%"
      className="rounded-tl-[20px] rounded-bl-[20px] flex flex-col justify-start pl-6 py-6 pr-3"
    >
      <div className="flex justify-end">
        <div className="cursor-pointer hover:bg-[#F4F9FD] p-2 rounded-[14px]" onClick={handleClose}>
          <Close />
        </div>
      </div>

      <div className="flex flex-col gap-4 overflow-y-auto pr-2">
        <Typography tag="h3" className="font-semibold text-pink-v2 text-2xl pt-4">
          Birthdays
        </Typography>
        <div>
          {calendersheet.map((data, index) => (
            <div
              key={index}
              className="flex gap-5 justify-between items-center border-b-1 p-2 border-[#E4E6E8]"
            >
              <div key="index">
                <div className="flex gap-1 items-center">
                  <div>
                    <img src={data.image} className="rounded-full w-10"></img>
                  </div>
                  <div>
                    <h3 className="text-xs">{data.label}</h3>
                    <h3 className="text-xs text-grey-text">{data.title}</h3>
                  </div>
                </div>
              </div>
              <h3 className={`text-xs ${data.duration == 'today' ? 'text-pink-v2' : 'text-black'}`}>
                {data.duration}
              </h3>
            </div>
          ))}
        </div>
        <Typography tag="h3" className="font-semibold text-blue-text text-2xl pt-4">
          On Leave
        </Typography>
        <div>
          {calendersheet.map((data, index) => (
            <div
              key={index}
              className="flex gap-5 justify-between items-center border-b-1 p-2 border-[#E4E6E8]"
            >
              <div key="index">
                <div className="flex gap-1 items-center">
                  <div>
                    <img src={data.image} className="rounded-full w-10"></img>
                  </div>
                  <div>
                    <h3 className="text-xs">{data.label}</h3>
                    <h3 className="text-xs text-grey-text">{data.title}</h3>
                  </div>
                </div>
              </div>
              <h3
                className={`text-xs ${data.duration == 'today' ? 'text-blue-text' : 'text-black'}`}
              >
                {data.duration}
              </h3>
            </div>
          ))}
        </div>
        <Typography tag="h3" className="font-semibold text-green-v2 text-2xl pt-4">
          Holidays
        </Typography>
        <div>
          {holidaydata.map((data, index) => (
            <div
              key={index}
              className="flex gap-5 justify-between items-center border-b-1 p-2 border-[#E4E6E8]"
            >
              <div key="index">
                <h3 className="">{data.Occasion}</h3>
                <h3 className="text-xs text-grey-text">{data.Duration}</h3>
              </div>
              <h3 className="text-black">{data.time}</h3>
            </div>
          ))}
        </div>
        <Typography tag="h3" className="font-semibold text-yellow-v1 text-2xl pt-4">
          Work Anniversary
        </Typography>
        <div>
          {workanniversary.map((data, index) => (
            <div
              key={index}
              className="flex gap-5 justify-between items-center border-b-1 p-2 border-[#E4E6E8]"
            >
              <div className="flex gap-1 items-center ">
                <img src={data.image} className="rounded-full w-10"></img>
                <div key="index">
                  <h3 className="text-xs">{data.label}</h3>
                  <h3 className="text-grey-text text-xs">{data.title}</h3>
                </div>
              </div>
              <h3 className="text-xs text-yellow-v1">{data.duration}</h3>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default EventListSidesheet;
