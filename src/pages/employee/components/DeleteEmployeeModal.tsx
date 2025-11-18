import {
  Button,
  Input,
  Modal,
  Typography,
} from '@fibonacci-innovative-solutions/hrms-design-library';
import crossIcon from '../../../../assets/temp/crossIcon.svg';

const DeleteEmployeeModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col relative">
        <img
          src={crossIcon}
          alt="crossIcon"
          className="w-8 h-8 sticky top-0 right-0 cursor-pointer"
          onClick={onClose}
        />
        <div className="flex flex-col gap-4 mt-5">
          <Typography tag="h3" className="text-black">
            Are you sure you want to delete?
          </Typography>
          <Typography tag="t5" className="text-black">
            Please type "Delete" to confirm
          </Typography>
          <Input
            placeholder="Type 'Delete' to confirm"
            className="w-full"
            theme={{
              inputStyle: 'w-full',
            }}
          />
          <Button
            variant="error"
            className="!w-fit !h-fit bg-danger-red !px-6 !py-3 !rounded-[14px] text-[16px]"
          >
            Delete Employee
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteEmployeeModal;
