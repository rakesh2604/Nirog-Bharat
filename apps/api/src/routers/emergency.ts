import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

// In a real app, this would integrate with the Blockchain event listener
// For now we keep the mock logic but moved here.

export const emergencyRouter = router({
    getEmergencyData: publicProcedure
        .input(z.object({ abhaId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            // 1. Log Access to Database
            if (ctx.user?.id) {
                await ctx.prisma.emergencyAccessLog.create({
                    data: {
                        patientId: input.abhaId,
                        accessedBy: ctx.user.id,
                        reason: "CRITICAL_EMERGENCY_OVERRIDE"
                    }
                });
            }

            // 2. Lookup Patient Profile
            const profile = await ctx.prisma.patientProfile.findFirst({
                where: { userId: input.abhaId }
            });

            if (!profile) {
                // Fallback for Demo Safety if ID doesn't exist in DB but matches pattern
                // This ensures the demo doesn't "crash" if someone types a random valid-looking ID
                if (input.abhaId.startsWith("NB-") || input.abhaId.includes("PATIENT")) {
                    return {
                        bloodGroup: "Unknown",
                        allergies: "Unknown",
                        chronicConditions: "No record found on chain.",
                        emergencyContact: "Unknown",
                        medications: [],
                        recentProcedures: [],
                        status: "EMERGENCY_ACCESS_LOGGED"
                    };
                }
                throw new Error("Patient Not Found in National Registry");
            }

            // 3. Return Restricted Data
            return {
                bloodGroup: profile.bloodGroup,
                allergies: profile.allergies,
                chronicConditions: profile.chronicConditions || "None recorded",
                emergencyContact: profile.emergencyContact,
                medications: [], // Schema update required for real meds
                recentProcedures: [], // Schema update required for real procedures
                status: "EMERGENCY_ACCESS_LOGGED"
            };
        }),

    getEmergencyLogs: protectedProcedure
        .query(async ({ ctx }) => {
            // In a real app, patients only see their own logs, admins/doctors see more.
            // For hackathon demo, we return logs where the user is either the patient or the accessor (if info is available).

            if (ctx.user.role === 'PATIENT') {
                return ctx.prisma.emergencyAccessLog.findMany({
                    where: { patientId: ctx.user.id },
                    orderBy: { timestamp: 'desc' }
                });
            }

            return ctx.prisma.emergencyAccessLog.findMany({
                orderBy: { timestamp: 'desc' }
            });
        })
});
