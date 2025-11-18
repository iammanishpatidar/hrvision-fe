import { handleToast } from '@/utils/toastUtils';
import { useSignUp } from '@clerk/clerk-react';
import { Button, OTPInput, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import React from 'react';

// Define OTPStatus type locally since it's not exported from the library
type OTPStatus = 'idle' | 'error' | 'success' | 'warning';

interface SignUpVerificationFormProps {
  code: string;
  setCode: (code: string) => void;
  handleVerify: (e: React.FormEvent<HTMLFormElement>) => void;
  status?: OTPStatus;
  statusMessage?: string;
  onComplete?: (value: string) => void;
  email: string;
}

const SignUpVerificationForm = ({
  code,
  setCode,
  handleVerify,
  status = 'idle',
  statusMessage,
  onComplete,
  email,
}: SignUpVerificationFormProps) => {
  const { isLoaded, signUp } = useSignUp();
  const [isResending, setIsResending] = React.useState(false);

  const handleResendCode = async () => {
    if (!isLoaded || isResending) return;

    setIsResending(true);
    const toastId = handleToast({
      message: 'Sending verification code again...',
      status: 'loading',
    });

    try {
      await signUp?.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      handleToast({
        message: 'Verification code sent successfully!',
        status: 'success',
        id: toastId,
      });
      // Clear the current code inputs
      setCode('');
    } catch (error) {
      handleToast({
        message: 'Failed to resend verification code. Please try again.',
        status: 'error',
        id: toastId,
      });
      console.error('Error resending code:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <form
      onSubmit={handleVerify}
      className="flex flex-grow flex-col gap-10 justify-center items-center w-full"
    >
      <div className="flex flex-col gap-5 flex-grow w-[420px]">
        <div className="flex flex-col gap-3">
          <Typography tag="t3" className="text-base font-semibold">
            Please verify your email address
          </Typography>
          <Typography tag="t4" className=" ">
            We’ve sent an email to {email}, please enter the code below.
          </Typography>
        </div>

        <OTPInput
          length={6}
          value={code}
          onChange={setCode}
          onComplete={onComplete}
          label="Enter Code"
          placeholder="-"
          numbersOnly={true}
          autoFocus={true}
          className="text-primaryText gap-4"
          status={status}
          statusMessage={statusMessage}
          required={true}
          autoSubmit={true}
        />

        <Button type="submit" className="mt-4" disabled={status === 'success'}>
          Create Account
        </Button>

        <div className="text-sm text-gray-500 mt-2">
          Didn&apos;t receive the code?{' '}
          <span
            onClick={handleResendCode}
            className={`${isResending || status === 'success' ? 'text-gray-400' : 'text-blue-600'} underline cursor-pointer`}
            style={{
              pointerEvents: isResending || status === 'success' ? 'none' : 'auto',
            }}
          >
            {isResending ? 'Sending...' : 'Resend Code'}
          </span>
        </div>
      </div>
    </form>
  );
};

export default SignUpVerificationForm;
