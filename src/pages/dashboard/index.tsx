import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6 px-10 pb-10">
      <Outlet />
    </div>
  );
};

export default Dashboard;
