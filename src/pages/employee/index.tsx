import InviteEmployeeDrawer from '@/components/InviteEmployeeDrawer/InviteEmployeeDrawer';
import { Button } from '@fibonacci-innovative-solutions/hrms-design-library';
import { useState } from 'react';
import { EmployeeMainTable } from './components/EmployeeMainTable';

const EmployeeMain = () => {
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);

  const tandleToggleAddEmployeeModal = () => {
    setIsAddEmployeeModalOpen(!isAddEmployeeModalOpen);
  };

  return (
    <div className="flex flex-col gap-6 px-10 pb-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-20 text-3xl font-bold text-primary">Employee</div>
        <Button
          variant="primary"
          className="min-w-[70px] h-[28px]"
          onClick={tandleToggleAddEmployeeModal}
        >
          Add Employee
        </Button>
      </div>
      <EmployeeMainTable />
      <InviteEmployeeDrawer
        isOpen={isAddEmployeeModalOpen}
        onClose={tandleToggleAddEmployeeModal}
        toggleDrawer={tandleToggleAddEmployeeModal}
      />
    </div>
  );
};

export default EmployeeMain;
