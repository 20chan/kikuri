'use client';

import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

function AuthProxy({ children, fallback }: { children: React.ReactNode, fallback?: React.ReactNode }) {
  const { data: session } = useSession();
  console.log(session);

  if (!session) {
    redirect('/');
  }

  return <>{children}</>;
}

const dynamicWrapped = dynamic(() => Promise.resolve(AuthProxy), {
  ssr: false,
});

export {
  dynamicWrapped as AuthProxy,
}