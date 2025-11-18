import { Button, Input } from '@fibonacci-innovative-solutions/hrms-design-library';
import { SignUpFormFields } from '../types';
import { Loader } from 'lucide-react';
// import useAdminStore from '@/store/admin-store';
interface SignUpProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  signUpFormFields: SignUpFormFields;
  setSignUpFormFields: (fields: SignUpFormFields) => void;
  handleNavigate: () => void;
  checkboxError: string;
  isLoading: boolean;
}

const SignUpForm = ({
  handleSubmit,
  signUpFormFields,
  setSignUpFormFields,
  handleNavigate,
  checkboxError,
  isLoading,
}: SignUpProps) => {

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-grow flex-col gap-10 justify-center items-center w-full"
    >
      <div className="flex flex-col gap-5 flex-grow w-[420px]">
        <Input
          theme={{
            labelStyle: 'text-primaryText font-normal',
          }}
          type="text"
          placeholder="Jon"
          value={signUpFormFields.firstName}
          label="First Name"
          onChange={e => setSignUpFormFields({ ...signUpFormFields, firstName: e.target.value })}
          className="text-primaryText font-semibold "
        />
        <Input
          theme={{
            labelStyle: 'text-primaryText font-normal',
          }}
          type="text"
          placeholder="Dow"
          value={signUpFormFields.lastName}
          label="Last Name"
          onChange={e => setSignUpFormFields({ ...signUpFormFields, lastName: e.target.value })}
          className="text-primaryText"
        />

        <Input
          type="text"
          theme={{
            labelStyle: 'text-primaryText font-normal',
          }}
          placeholder="youremail@gmail.com"
          value={signUpFormFields.emailAddress}
          label="Email Address"
          onChange={e => setSignUpFormFields({ ...signUpFormFields, emailAddress: e.target.value })}
          className="text-primaryText"
        />
        <Input
          theme={{
            labelStyle: 'text-primaryText font-normal',
          }}
          type="password"
          placeholder="*******"
          value={signUpFormFields.password}
          label="Password"
          onChange={e => setSignUpFormFields({ ...signUpFormFields, password: e.target.value })}
          className=" text-primaryText]"
        />

        <div className=" flex justify-start items-start text-sm gap-2 px-2">
          <div>
            <input
              type="checkbox"
              checked={signUpFormFields.termsAccepted || false}
              onChange={e =>
                setSignUpFormFields({
                  ...signUpFormFields,
                  termsAccepted: e.target.checked,
                })
              }
            />
          </div>
          <div className=" font-light  max-w-[80%]">
            By creating an account you agree to the{' '}
            <span className=" text-violetBlue underline"> terms of use </span> and our{' '}
            <span className=" text-violetBlue underline"> privacy policy.</span>
            {checkboxError && <div className="text-red-500 text-xs mt-1">{checkboxError}</div>}
          </div>
        </div>

        <Button type="submit" className="mt-4 w-full font-bold">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              Signing Up...
              <Loader className="w-4 h-4 animate-spin" />
            </div>
          ) : (
            'Sign Up'
          )}
        </Button>
        <div className="flex gap-2 items-center">
          <span> Already have an account?</span>
          <span
            onClick={handleNavigate}
            className="text-gradient-primary font-medium cursor-pointer"
          >
            Log in
          </span>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
