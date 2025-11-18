import { Input, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';

const Allowances = () => {
  return (
    <div className="bg-white rounded-2xl p-6 size-full shadow-sm border border-gray-v2">
      <div className="flex items-center justify-between mb-2.5">
        <Typography tag="h4" className="text-primary">
          Allowances
        </Typography>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          label="HRA"
          type="text"
          placeholder="Enter hra allowance"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
          }}
          value="₹XX,XXX"
          disabled
        />
        <Input
          label="Medical"
          type="text"
          placeholder="Enter medical allowance"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
          }}
          value="₹XX,XXX"
          disabled
        />
        <Input
          label="Transport"
          type="text"
          placeholder="Enter transport allowance"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
          }}
          value="₹XX,XXX"
          disabled
        />
        <Input
          label="Food"
          type="text"
          placeholder="Enter food allowance"
          theme={{
            labelStyle: 'text-primaryText text-xs',
            inputStyle: '!h-[35px] text-xs placeholder:text-xs focus:border-primary',
          }}
          value="₹XX,XXX"
          disabled
        />
        <Input
          label="Internet"
          type="text"
          placeholder="Enter internet allowance"
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

export default Allowances;
