import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../../apps/api/src/router'; // Direct import for type-sharing (Monorepo benefit)

export const trpc = createTRPCReact<AppRouter>();
