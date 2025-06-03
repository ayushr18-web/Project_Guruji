'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdminSidebar from '../components/AdminSidebar';
import Header from '../components/Header';

const queryClient = new QueryClient();

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        {/* <Header /> */}
      </div>
      <div className='h-screen flex overflow-hidden'>
        <AdminSidebar />
        <main className='flex-1 p-4 bg-gray-100 overflow-y-auto'>
          {children}
        </main>
      </div>
    </QueryClientProvider>
  );
}
