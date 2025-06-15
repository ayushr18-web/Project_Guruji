'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminSidebar from '../../../../components/AdminSidebar';


const queryClient = new QueryClient();

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>

      <div className="relative min-h-screen w-full">
        {/* Background Image */}
        <div className='fixed inset-0 bg-[url("../../images/site-background-texture.jpg")] bg-cover bg-center bg-no-repeat z-[-1]' />

        {/* Header (if needed) */}
        {/* <Header /> */}

        {/* Sidebar + Main Content */}
        <div className='flex h-screen overflow-hidden'>
          <AdminSidebar />
          <main className='flex-1 p-4 overflow-y-auto'>
            {children}
          </main>
        </div>
      </div>

    </QueryClientProvider>
  );
}
