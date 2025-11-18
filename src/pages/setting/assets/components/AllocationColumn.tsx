import { formatDateDMY } from '@/utils/formatDate';
import { TableColumn, Tooltip, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';

const formateName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export const AllocationColumn: TableColumn<any>[] = [
  {
    key: 'employee.name',
    title: 'Employee Name',
    render: (row) => {
      return <div className='cursor-pointer'>
        {formateName(row.employee.name)}
      </div>
    }

  },
  {
    key: 'id',
    title: 'Employee ID',
    render: (row) => {
      return <div
        title={row.employee.id}
        className="max-w-[140px] cursor-pointer"
      >
        <Tooltip content={row.employee.id}>
          <Typography tag="t4" className="font-normal truncate">
            {row.employee.id}
          </Typography>
        </Tooltip>
      </div>
    }
  },
  {
    key: 'asset_type',
    title: 'Asset Name',
    render: (row) => {
      return <div className='cursor-pointer'>
        {formateName(row.asset_type)}
      </div>
    }
  },
  {
    key: 'category.name',
    title: 'Asset Category',
    render: (row) => {
      return <div className='cursor-pointer'>
        {formateName(row.category.name)}
      </div>
    }
  },
  {
    key: 'created_at',
    title: 'Assigned Date',
    render: (row) => {
      return <div className='cursor-pointer'>
        {formatDateDMY(row.created_at)}
      </div>
    }
  },
  {
    key: 'status',
    title: 'Status',
    render: (row) => {
      const status = formateName(row.status);
      const statusColor = status.toLowerCase() === 'approved' 
        ? 'text-green-v2' 
        : status.toLowerCase() === 'rejected'
          ? 'text-danger-red-v2'
          : 'text-gray-500';
      return <div className={`${statusColor} cursor-pointer`}>
        {status}
      </div>
    }
  }
];
