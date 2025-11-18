import {
  MenuButton,
  MenuButtonItem,
  Table,
  ToggleButton,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import { Filter } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { departmentOptions, sampleEmployees } from '../constants';
import TableHeader from './CustomTableHeader';
import DeleteEmployeeModal from './DeleteEmployeeModal';
import { useNavigate } from 'react-router-dom';
import { EmployeeService } from '@/apis/services/EmployeeService';
import { useEmployeeStore } from '@/store/employee-store';
import { EmployeeMainColumns } from './components/coloumn';
import useAdminStore from '@/store/admin-store';

export const EmployeeMainTable: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { employees, setEmployees } = useEmployeeStore();
  const { onboardingDetails } = useAdminStore();

  const fetchEmployees = async () => {
    const response = await EmployeeService.getEmployeeBusinessInfo(
      onboardingDetails?.businessData?.id as string
    );
    setEmployees(response.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDepartmentFilter = (department: string) => {
    setSelectedDepartment(department);

    if (department === 'all') {
      setEmployees(sampleEmployees);
    } else {
      const filtered = sampleEmployees.filter(emp => emp.department === department);
      setEmployees(filtered);
    }
  };

  const filteredData = employees?.filter(employee => {
    const matchesSearch =
      searchQuery === '' ||
      employee?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee?.role?.role?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDepartment =
      selectedDepartment === 'all' || employee?.department?.name === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const isRowInactive = (employee: any): boolean => {
    return !!employee?.inactive;
  };

  const renderActionMenu = (employee: any) => {
    if (employee?.inactive) {
      return null;
    }

    const menuItems: MenuButtonItem[] = [
      {
        label: 'Make Owner',
        onClick: () => console.log('Make Owner', employee?.id),
      },
      {
        content: (
          <div className="flex items-center justify-between">
            <p>Active</p>
            <ToggleButton
              isOn={true}
              onToggle={() => console.log('Toggle', employee?.id)}
              size="sm"
            />
          </div>
        ),
      },
      {
        label: 'Make HR Manager',
        onClick: () => console.log('Make HR Manager', employee?.id),
      },
      {
        label: 'Time Off Approver',
        onClick: () => console.log('Time Off Approver', employee?.id),
      },
      {
        label: 'Terminate Employee',
        onClick: () => console.log('Terminate Employee', employee?.id),
      },

      {
        label: 'Delete Employee',
        variant: 'danger',
        onClick: () => setIsDeleteModalOpen(true),
      },
    ];

    return <MenuButton items={menuItems} position="right" menuWidth="300px" />;
  };

  const renderTableHeader = () => {
    return (
      <TableHeader
        totalCount={filteredData?.length}
        totalCountLabel="Total Employee"
        onSearch={setSearchQuery}
        rightContent={
          <MenuButton
            icon={<Filter className="w-4 h-4" />}
            items={departmentOptions.map(dept => ({
              label: dept.label,
              onClick: () => handleDepartmentFilter(dept.value),
              active: selectedDepartment === dept.value,
            }))}
            position="right"
          />
        }
      />
    );
  };

  return (
    <div className="bg-white overflow-hidden rounded-lg">
      <Table
        data={filteredData}
        columns={EmployeeMainColumns}
        keyExtractor={row => row.id}
        customHeader={renderTableHeader()}
        actionMenu={renderActionMenu}
        initialSort={{ key: 'name', direction: 'asc' }}
        pagination={{
          itemsPerPage,
          initialPage: currentPage,
          onPageChange: setCurrentPage,
          totalItems: filteredData?.length,
        }}
        onRowClick={row => navigate(`/user-profile/details/${row?.email}`)}
        isRowInactive={isRowInactive}
        hoverEffect={true}
        bordered={true}
      />
      <DeleteEmployeeModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} />
    </div>
  );
};
