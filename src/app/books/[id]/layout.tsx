'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>

      <div className="relative min-h-screen">
        <div className='fixed inset-0 bg-[url("../../images/site-background-texture.jpg")] bg-cover bg-center bg-no-repeat z-[-1]' />
        <div className='flex h-screen overflow-hidden'>
          <main className='flex-1 p-4 overflow-y-auto'>
            {children}
          </main>
        </div>
      </div>

    </QueryClientProvider>
  );
}
