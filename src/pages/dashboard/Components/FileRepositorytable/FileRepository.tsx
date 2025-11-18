import { Table } from '@fibonacci-innovative-solutions/hrms-design-library';
import { ArrowDownToLine } from 'lucide-react';

type FileData = {
  id: string;
  policyName: string;
  category: string;
};

const FileRepository = () => {
  const fileData: FileData[] = [
    { id: '1', policyName: 'Work From Home Policy', category: 'Operations / Remote' },
    { id: '2', policyName: 'Work From Home Policy', category: 'Operations / Remote' },
    { id: '3', policyName: 'Work From Home Policy', category: 'Operations / Remote' },
  ];

  const fileRepositoryColumns = [
    {
      key: 'policyName',
      title: 'Policy/File Name',
      render: (row: FileData) => row.policyName,
    },
    {
      key: 'category',
      title: 'Category',
      render: (row: FileData) => row.category,
    },
    {
      key: 'action',
      title: 'Action',
      render: () => (
        <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-100">
          <ArrowDownToLine className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <div className="bg-white border border-gray-100 w-[660px] h-[350px] p-3 rounded-lg">
      <h4 className="text-xl font-semibold text-primary">File Repository</h4>
      <div className="p-6 w-[630px] h-[20px]">
        <Table
          data={fileData}
          columns={fileRepositoryColumns}
          keyExtractor={(row: FileData) => row.id}
        />
      </div>
    </div>
  );
};

export default FileRepository;
