import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

export const authRouter = router({
    me: protectedProcedure
        .query(async ({ ctx }) => {
            const user = await ctx.prisma.user.findUnique({
                where: { id: ctx.user.id },
                include: {
                    patientProfile: true,
                    doctorProfile: true
                }
            });
            return user;
        }),

    register: publicProcedure
        .input(z.object({
            walletAddress: z.string(),
            role: z.enum(["PATIENT", "DOCTOR", "RESEARCHER", "PHARMA"])
        }))
        .mutation(async ({ ctx, input }) => {
            const existing = await ctx.prisma.user.findUnique({
                where: { walletAddress: input.walletAddress }
            });

            if (existing) return { status: "EXISTS", user: existing };

            const user = await ctx.prisma.user.create({
                data: {
                    walletAddress: input.walletAddress,
                    role: input.role,
                    // Auto-create profiles for relevant roles
                    ...(input.role === 'PATIENT' && {
                        patientProfile: {
                            create: {
                                name: "New Patient",
                                age: 0,
                                gender: "Unknown",
                                bloodGroup: "Unknown",
                                allergies: "None",
                                emergencyContact: "None"
                            }
                        }
                    }),
                    ...(input.role === 'DOCTOR' && {
                        doctorProfile: {
                            create: {
                                name: "New Doctor",
                                specialization: "General",
                                licenseNumber: "PENDING",
                                hospital: "Clinic"
                            }
                        }
                    })
                },
                include: {
                    patientProfile: true,
                    doctorProfile: true
                }
            });

            return { status: "CREATED", user };
        })
});
