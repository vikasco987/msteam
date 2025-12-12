







'use client';

import { ReactNode } from 'react';
import ClientLayout from '../app/ClientLayout'; // ✅ CORRECT PATH
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@radix-ui/react-tooltip';

const queryClient = new QueryClient();

export default function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ClientLayout>{children}</ClientLayout>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

