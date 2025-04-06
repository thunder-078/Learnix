'use client';
import { useEffect, useState } from 'react';
import SignIn from '@/app/signin/page';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // replace with real auth check
  const router = useRouter();

  useEffect(() => {
    // Simulated auth check (replace with actual check logic)
    const user = localStorage.getItem('user'); 
    if (user) {
      setIsLoggedIn(true);
      router.push('/dashboard');
    }
  }, []);

  return (
    <main>
      {!isLoggedIn && <SignIn />}
    </main>
  );
}
