'use client';

import Loader from '@/components/loader/loader';
import { isAuthenticated } from '@/utils/auth/auth';
import { useEffect, useState } from 'react';

export default function Home(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [authorized, setAuthorized] = useState<boolean>(false);

  useEffect((): void => {
    const checkAuth = async (): Promise<void> => {
      try {
        const result = await isAuthenticated;
        setAuthorized(result);
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h1>Home</h1>
      <p>authorized: {authorized}</p>
    </div>
  );
}
