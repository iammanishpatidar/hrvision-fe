import SidePanel from '@/components/SidePanel/SidePanel';
import { handleToast } from '@/utils/toastUtils';
import { useSignIn } from '@clerk/clerk-react';
import { OAuthStrategy } from '@clerk/types';
import { Button, Input, Typography } from '@fibonacci-innovative-solutions/hrms-design-library';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logBusinessConsultingLogo from '../../../assets/BusinessConsultingLogo.svg';
import facebookLogo from '../../../assets/facebookLogo.svg';
import googleLogo from '../../../assets/googleLogo.svg';
import logo from '../../../assets/logo.png';

const CustomSignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/signup');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    if (!isLoaded) return;
    if (!email || !password) {
      handleToast({
        message: 'Please enter both email and password.',
        status: 'error',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      handleToast({
        message: 'Please enter a valid email address.',
        status: 'error',
      });
      return;
    }
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });

        handleToast({
          message: 'Login successful!',
          status: 'success',
        });

        navigate('/');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        handleToast({
          message: 'Sign-in not completed. Please check your credentials.',
          status: 'error',
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const errorMessage = err?.errors?.[0]?.message || 'Sign-in failed. Please try again later.';
      handleToast({
        message: errorMessage,
        status: 'error',
      });
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsPending(false);
    }
  };

  const signInWith = (strategy: OAuthStrategy) => {
    if (!signIn) return null;
    return signIn
      .authenticateWithRedirect({
        strategy,
        redirectUrl: 'authcallback',
        redirectUrlComplete: '/',
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.log(err.errors);
        console.error(err, null, 2);
      });
  };

  if (!isLoaded) return null;

  return (
    <div className="flex gap-4 w-screen h-screen p-4  bg-background">
      {/* Left section */}

      <div className="w-[40%]">
        <SidePanel
          logoSrc={logo}
          headingTop="Empowering Visionaries, Enabling Innovation"
          subheadingTop="Sign in to Shape the Future with FibonacciX."
          illustrationSrc={logBusinessConsultingLogo}
        />
      </div>

      {/* Right section */}
      <div className="w-[60%] bg-white flex flex-col justify-center items-center shadow-boxShadow rounded-2xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-7 w-[40%]
          "
        >
          <Typography tag="h2" className="text-center text-gradient-primary p-2">
            Sign In to FibonacciX
          </Typography>

          <div className="flex justify-center gap-8">
            <div
              onClick={() => signInWith('oauth_google')}
              className="flex justify-center items-center gap-2 bg-[#F7F7F8] px-10 py-3 rounded-md cursor-pointer"
            >
              <img src={googleLogo} className="size-[18px]" />
              <span className="text-base font-light">Google</span>
            </div>
            <div className="flex justify-center items-center gap-2 bg-[#F7F7F8] px-10 py-3 rounded-md cursor-pointer">
              <img src={facebookLogo} className="size-[18px]" />
              <span className="text-base font-light">Facebook</span>
            </div>
          </div>

          <div>or use your email account</div>
          <div className="w-full flex flex-col gap-5">
            <Input
              type="text"
              theme={{
                labelStyle: 'text-primaryText font-normal',
              }}
              placeholder="youremail@gmail.com"
              value={email}
              label="Email Address"
              onChange={e => setEmail(e.target.value)}
              className="text-primaryText"
            />
            <Input
              type="password"
              theme={{
                labelStyle: 'text-primaryText font-normal',
              }}
              placeholder="*******"
              value={password}
              label="Password"
              onChange={e => setPassword(e.target.value)}
              className=" text-primaryText]"
            />
          </div>
          <div className="flex justify-between w-full  text-primaryText">
            <label className="flex gap-2 items-center">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <Typography tag="t3" className="cursor-pointer text-primary">
              Forgot Password?
            </Typography>
          </div>

          <Button
            type="submit"
            className="mt-4 w-full font-bold"
            variant="primary"
            disabled={isPending}
          >
            {isPending ? 'Logging In...' : 'Login Now'}
          </Button>

          <div className="flex gap-2 items-center">
            <span>Don&apos;t have an account?</span>
            <span
              onClick={handleNavigate}
              className="text-gradient-primary font-medium cursor-pointer"
            >
              Create New
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomSignIn;
