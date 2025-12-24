"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import { trpc } from '../utils/trpc';

export function TrpcProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/trpc`,
                    headers() {
                        let userId = 'NB-PATIENT-1234';
                        let userRole = 'PATIENT';

                        // Dynamic Header Injection for Demo
                        if (typeof window !== 'undefined') {
                            const role = new URLSearchParams(window.location.search).get('role');
                            if (role === 'doctors') { userId = 'NB-DOC-555'; userRole = 'DOCTOR'; }
                            else if (role === 'pharma') { userId = 'NB-PHARMA-CORP'; userRole = 'PHARMA'; }
                            else if (role === 'researchers') { userId = 'NB-RES-888'; userRole = 'RESEARCHER'; }
                        }

                        return {
                            'x-user-id': userId,
                            'x-user-role': userRole,
                        };
                    }
                }),
            ],
        }),
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}
