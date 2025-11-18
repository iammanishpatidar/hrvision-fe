import { Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import Skeleton from 'react-loading-skeleton';

const AssetsLoading = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <Typography tag="t1" className="text-primary">
        <Skeleton count={10} />
      </Typography>
    </div>
  );
};

export default AssetsLoading; 