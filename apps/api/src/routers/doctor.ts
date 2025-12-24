import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const doctorRouter = router({
    searchPatients: publicProcedure
        .input(z.object({ query: z.string() }))
        .query(async ({ ctx, input }) => {
            // Search by Name or ID in PatientProfile
            // Prisma doesn't have partial text search on SQLite easily without raw query or iterating,
            // but 'contains' works for strings.

            const patients = await ctx.prisma.patientProfile.findMany({
                where: {
                    OR: [
                        { name: { contains: input.query } },
                        { userId: { contains: input.query } } // Assuming userId is public relevant ID
                    ]
                }
            });

            return patients;
        }),

    getConsentedPatients: protectedProcedure
        .query(async ({ ctx }) => {
            if (ctx.user.role !== 'DOCTOR') {
                throw new TRPCError({ code: 'FORBIDDEN', message: 'Restricted to Doctors.' });
            }

            const consents = await ctx.prisma.consent.findMany({
                where: {
                    doctorId: ctx.user.id,
                    status: 'GRANTED'
                },
                include: {
                    patient: true
                }
            });

            return consents.map(c => c.patient);
        })
});
