import SidePanel from '@/components/SidePanel/SidePanel';
import { handleToast } from '@/utils/toastUtils';
import { useSignUp } from '@clerk/clerk-react';
import { Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import SignUpImage1 from '../../../assets/SignUpImage1.svg';
import SignUpForm from './components/SignUpForm';
import SignUpVerificationForm from './components/SignUpVerificationForm';
import { SignUpFormFields } from './types';

// Define OTPStatus type locally since it's not exported from the library
type OTPStatus = 'idle' | 'error' | 'success' | 'warning';

const CustomSignUp: React.FC = () => {
  const [verifying, setVerifying] = React.useState<boolean>(false);
  const [otpStatus, setOtpStatus] = useState<OTPStatus>('idle');
  const [otpMessage, setOtpMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [checkboxError, setCheckboxError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [signUpFormFields, setSignUpFormFields] = useState<SignUpFormFields>({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    termsAccepted: false,
  });

  const [code, setCode] = useState<string>('');

  const navigate = useNavigate();

  const { isLoaded, signUp, setActive } = useSignUp();

  // Reset error message when code changes
  useEffect(() => {
    if (otpStatus === 'error') {
      setOtpStatus('idle');
      setOtpMessage('');
    }
  }, [code]);

  const handleNavigate = () => {
    navigate('/signin');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setCheckboxError('');
    if (!isLoaded) return;
    if (!signUpFormFields.termsAccepted) {
      setCheckboxError('Please accept the terms and conditions.');
      return;
    }

    if (
      !signUpFormFields.emailAddress ||
      !signUpFormFields.password ||
      !signUpFormFields.firstName
    ) {
      handleToast({
        message: 'Please fill in all required fields.',
        status: 'error',
      });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpFormFields.emailAddress)) {
      handleToast({
        message: 'Please enter a valid email address.',
        status: 'error',
      });
      return;
    }

    // Start the sign-up process using the email and password provided
    setIsLoading(true);
    try {
      await signUp.create({
        emailAddress: signUpFormFields.emailAddress,
        password: signUpFormFields.password,
        firstName: signUpFormFields.firstName,
        lastName: signUpFormFields.lastName,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      handleToast({
        message: 'Verification code sent to your email.',
        status: 'success',
      });

      setVerifying(true);
      setOtpStatus('idle');
      setOtpMessage('');
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err?.errors?.[0]?.message || 'Something went wrong during sign-up.';
      handleToast({
        message: errorMessage,
        status: 'error',
      });
      setIsLoading(false);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || isSubmitting) return;

    if (!code || code.length === 0) {
      setOtpStatus('error');
      setOtpMessage('Please enter the verification code.');
      return;
    }

    if (code.length !== 6) {
      setOtpStatus('error');
      setOtpMessage('Verification code must be 6 characters.');
      return;
    }

    try {
      setIsSubmitting(true);
      setOtpStatus('idle');
      setOtpMessage('Verifying code...');

      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        setOtpStatus('success');
        setOtpMessage('Verification successful!');

        await setActive({ session: signUpAttempt.createdSessionId });
        handleToast({
          message: 'Email verified and logged in successfully!',
          status: 'success',
        });

        // Short delay before navigation to show success state
        setTimeout(() => {
          navigate('/onboard');
        }, 1000);
      } else {
        setOtpStatus('warning');
        setOtpMessage('Verification incomplete. Please try again.');

        handleToast({
          message: 'Verification incomplete. Please try again.',
          status: 'error',
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage =
        err?.errors?.[0]?.longMessage ||
        'Something went wrong during verification. Please try again.';

      setOtpStatus('error');
      setOtpMessage(errorMessage);

      handleToast({
        message: errorMessage,
        status: 'error',
      });
      console.error('Error:', JSON.stringify(err, null, 2));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle when OTP code changes
  const handleOTPChange = (value: string) => {
    setCode(value);

    // Clear any previous error messages
    if (otpStatus === 'error') {
      setOtpStatus('idle');
      setOtpMessage('');
    }
  };

  // Function to handle when OTP code is completed
  const handleOTPComplete = (completedValue: string) => {
    setCode(completedValue);

    // Auto-submit the form when all 6 digits are entered
    if (completedValue.length === 6 && !isSubmitting) {
      const form = document.querySelector('form');
      if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="flex w-screen gap-4 h-screen p-4 bg-background">
      <div className="w-[40%]">
        <SidePanel
          logoSrc={logo}
          headingTop="Empowering Visionaries, Enabling Innovation"
          subheadingTop="Sign in to Shape the Future with FibonacciX."
          illustrationSrc={SignUpImage1}
        />
      </div>

      <div className="flex flex-grow flex-col justify-between items-center shadow-boxShadow rounded-3xl bg-white px-9 py-5 gap-10">
        <div className="mt-10 flex flex-col gap-3.5">
          <Typography tag="t4" className="text-base font-semibold text-blueCyan text-center">
            {verifying ? 'STEP 2/4' : 'STEP 1/4'}
          </Typography>
          <Typography tag="h2" className="text-center text-gradient-primary p-2">
            {verifying ? 'Verify Email' : 'Sign Up'}
          </Typography>
        </div>
        {verifying ? (
          <SignUpVerificationForm
            email={signUpFormFields.emailAddress}
            code={code}
            setCode={handleOTPChange}
            handleVerify={handleVerify}
            status={otpStatus}
            statusMessage={otpMessage}
            onComplete={handleOTPComplete}
          />
        ) : (
          <SignUpForm
            handleSubmit={handleSubmit}
            signUpFormFields={signUpFormFields}
            setSignUpFormFields={setSignUpFormFields}
            handleNavigate={handleNavigate}
            checkboxError={checkboxError}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default CustomSignUp;
