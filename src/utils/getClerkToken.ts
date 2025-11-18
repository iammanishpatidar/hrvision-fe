// src/utils/clerkToken.ts
import { Clerk } from '@clerk/clerk-js';
const clerk = new Clerk(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
export const getClerkToken = async (): Promise<string | null> => {
  await clerk.load();
  const session = await clerk.session;

  if (!session) {
    throw new Error('No active session found. User might not be logged in.');
  }

  const token = await session.getToken();
  return token;
};
