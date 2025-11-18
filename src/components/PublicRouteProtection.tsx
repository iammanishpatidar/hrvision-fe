import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProtectionProps {
  children: React.ReactNode;
}

const PublicRouteProtection = ({ children }: PublicRouteProtectionProps) => {
  return (
    <>
      <SignedOut>{children}</SignedOut>
      <SignedIn>
        <Navigate to="/dashboard" replace />
      </SignedIn>
    </>
  );
};

export default PublicRouteProtection;
