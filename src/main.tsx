import { ClerkProvider } from '@clerk/clerk-react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './router';
import './utils/newrelic';
import { loadNewRelicScript } from './utils/newrelic';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-loading-skeleton/dist/skeleton.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file');
}
loadNewRelicScript();

createRoot(document.getElementById('root')!).render(
  <ClerkProvider
    appearance={{
      layout: {
        socialButtonsPlacement: 'bottom',
        socialButtonsVariant: 'blockButton',
      },
    }}
    publishableKey={PUBLISHABLE_KEY}
  >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ClerkProvider>
);
