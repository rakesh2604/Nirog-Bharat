import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure, protectedProcedure } from '../trpc';

export const patientRouter = router({
    getProfile: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ ctx, input }) => {
            return ctx.prisma.patientProfile.findUnique({
                where: { userId: input.userId },
                include: { medicalRecords: true }
            });
        }),

    createProfile: publicProcedure
        .input(z.object({
            userId: z.string(),
            name: z.string(),
            age: z.number(),
            gender: z.string(),
            bloodGroup: z.string(),
            allergies: z.string(),
            emergencyContact: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            // Connect to User if exists, or assume created separate
            // For now, ensuring User exists for the relation might be needed or handled in Auth

            return ctx.prisma.patientProfile.create({
                data: input
            });
        }),

    getRecords: protectedProcedure
        .input(z.object({ patientId: z.string() }))
        .query(async ({ ctx, input }) => {
            const { role, id: requesterId } = ctx.user;

            // 1. Patient Access: Can only view own records
            if (role === 'PATIENT') {
                if (input.patientId !== requesterId) {
                    throw new TRPCError({ code: 'FORBIDDEN', message: 'You can only view your own records.' });
                }
            }

            // 2. Doctor Access: Must have GRANTED consent
            if (role === 'DOCTOR') {
                const consent = await ctx.prisma.consent.findUnique({
                    where: {
                        patientId_doctorId: {
                            patientId: input.patientId,
                            doctorId: requesterId
                        }
                    }
                });

                if (!consent || consent.status !== 'GRANTED') {
                    throw new TRPCError({ code: 'FORBIDDEN', message: 'Access denied. No valid consent found.' });
                }
            }

            return ctx.prisma.medicalRecord.findMany({
                where: { patientId: input.patientId }
            });
        }),

    uploadRecord: publicProcedure
        .input(z.object({
            patientId: z.string(),
            title: z.string(),
            type: z.string(),
            ipfsHash: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            return ctx.prisma.medicalRecord.create({
                data: {
                    patientId: input.patientId,
                    ipfsHash: input.ipfsHash,
                    recordType: input.type
                    // Date defaults to now
                }
            });
        }),

    giveConsent: protectedProcedure
        .input(z.object({ doctorId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            if (ctx.user.role !== 'PATIENT') {
                throw new TRPCError({ code: 'FORBIDDEN', message: 'Only patients can grant consent.' });
            }

            return ctx.prisma.consent.upsert({
                where: {
                    patientId_doctorId: {
                        patientId: ctx.user.id,
                        doctorId: input.doctorId
                    }
                },
                update: { status: 'GRANTED' },
                create: {
                    patientId: ctx.user.id,
                    doctorId: input.doctorId,
                    status: 'GRANTED'
                }
            });
        }),

    revokeConsent: protectedProcedure
        .input(z.object({ doctorId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            if (ctx.user.role !== 'PATIENT') {
                throw new TRPCError({ code: 'FORBIDDEN', message: 'Only patients can revoke consent.' });
            }

            return ctx.prisma.consent.update({
                where: {
                    patientId_doctorId: {
                        patientId: ctx.user.id,
                        doctorId: input.doctorId
                    }
                },
                data: { status: 'REVOKED' }
            });
        }),

    getConsents: protectedProcedure
        .query(async ({ ctx }) => {
            if (ctx.user.role !== 'PATIENT') {
                throw new TRPCError({ code: 'FORBIDDEN', message: 'Only patients can see their own consents.' });
            }

            return ctx.prisma.consent.findMany({
                where: { patientId: ctx.user.id },
                include: {
                    doctor: true
                }
            });
        }),

    generateEligibilityProof: protectedProcedure
        .input(z.object({ criterion: z.string() }))
        .mutation(async ({ ctx, input }) => {
            if (ctx.user.role !== 'PATIENT') {
                throw new TRPCError({ code: 'FORBIDDEN', message: 'Only patients can generate personal proofs.' });
            }

            const profile = await ctx.prisma.patientProfile.findUnique({
                where: { userId: ctx.user.id }
            });

            if (!profile) throw new TRPCError({ code: 'NOT_FOUND', message: 'Profile not found' });

            let eligible = false;
            if (input.criterion === 'AGE_GT_18') {
                eligible = profile.age >= 18;
            } else if (input.criterion === 'MALE') {
                eligible = profile.gender.toLowerCase() === 'male';
            } else if (input.criterion === 'FEMALE') {
                eligible = profile.gender.toLowerCase() === 'female';
            }

            // Simulated Latency
            await new Promise(resolve => setTimeout(resolve, 1000));

            return {
                eligible,
                proof: {
                    type: "ZK_RANGE_PROOF",
                    criterion: input.criterion,
                    hash: "0x" + Math.random().toString(16).slice(2, 42),
                    verified: true
                }
            };
        }),

    optIntoStudy: protectedProcedure
        .input(z.object({ studyId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            if (ctx.user.role !== 'PATIENT') {
                throw new TRPCError({ code: 'FORBIDDEN', message: 'Only patients can opt-in to studies.' });
            }

            // Simulate Opt-In by incrementing study participant count
            return ctx.prisma.marketplaceStudy.update({
                where: { id: input.studyId },
                data: {
                    participants: { increment: 1 }
                }
            });
        })
});
