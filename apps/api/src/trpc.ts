import { initTRPC, TRPCError } from '@trpc/server';
import { PrismaClient } from '@prisma/client';
import * as trpcExpress from '@trpc/server/adapters/express';

// Context
export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    const prisma = new PrismaClient();

    // Hackathon Auth: Read headers directly
    const userId = req.headers['x-user-id'] as string | undefined;
    const userRole = req.headers['x-user-role'] as string | undefined;

    return {
        req,
        res,
        prisma,
        user: userId ? { id: userId, role: userRole || 'PATIENT' } : null
    };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Secure Procedure
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
    if (!ctx.user) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Missing x-user-id header' });
    }
    return next({
        ctx: {
            ...ctx,
            user: ctx.user
        }
    });
});
