import { Input, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';

const Bonus = () => {
  return (
    <div className="bg-white rounded-2xl p-6 size-full shadow-sm border border-gray-v2">
      <div className="flex items-center justify-between mb-2.5">
        <Typography tag="h4" className="text-primary">
          Bonus
        </Typography>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          label="Annual Bonus"
          type="text"
          placeholder="Enter annual bonus"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
          }}
          value="₹XX,XXX"
          disabled
        />
        <Input
          label="Performance Bonus"
          type="text"
          placeholder="Enter performance bonus"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
          }}
          value="₹XX,XXX"
          disabled
        />
        <Input
          label="Joining Bonus"
          type="text"
          placeholder="Enter joining bonus"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
          }}
          value="₹XX,XXX"
          disabled
        />
        <Input
          label="Relocation Bonus"
          type="text"
          placeholder="Enter relocation bonus"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
          }}
          value="₹XX,XXX"
          disabled
        />
      </div>
    </div>
  );
};

export default Bonus;
