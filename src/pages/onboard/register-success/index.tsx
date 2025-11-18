import useAdminStore from '@/store/admin-store';
import { ICompany, IEmployee } from '@/types';
import { Button, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import { useNavigate, useParams } from 'react-router-dom';
import RegisterSuccessImage from '../../../../assets/RegisterSuccessImg.svg';

const RegisterSuccess = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const { setAdminDetails, setBusinessDetails } = useAdminStore();

  const handleStart = () => {
    setAdminDetails(null as unknown as IEmployee);
    setBusinessDetails(null as unknown as ICompany);
    navigate(`/user-profile/details/${employeeId}`);
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-full w-full bg-[image:var(--image-auth-background)] bg-sidePanel-backgorund bg-contain bg-center bg-no-repeat rounded-3xl shadow-boxShadow">
      <img src={RegisterSuccessImage} alt="Register Success" />
      <Typography tag="h5" className="text-gradient-primary p-2">
        You are successfully registered!
      </Typography>
      <Button variant="primary" className="w-[300px] cursor-pointer" onClick={handleStart}>
        Let&apos;s Start
      </Button>
    </div>
  );
};

export default RegisterSuccess;
