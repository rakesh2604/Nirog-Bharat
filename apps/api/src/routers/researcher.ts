
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';

export const researcherRouter = router({
    runZkQuery: protectedProcedure
        .input(z.object({ query: z.string(), proofType: z.string().optional() }))
        .mutation(async ({ ctx, input }) => {
            // Simulated Latency for ZK-Proof Generation
            await new Promise(resolve => setTimeout(resolve, 1500));

            const queryUpper = input.query.toUpperCase();
            let whereClause = {};
            let aggregationType = "TOTAL_COUNT";

            // Simple "Parser" for keywords
            if (queryUpper.includes("AGE > 60")) {
                whereClause = { age: { gt: 60 } };
                aggregationType = "AGE_GT_60";
            } else if (queryUpper.includes("DIABETES")) {
                whereClause = { chronicConditions: { contains: "Diabetes" } };
                aggregationType = "CONDITION_DIABETES";
            } else if (queryUpper.includes("FEMALE")) {
                whereClause = { gender: "Female" };
                aggregationType = "GENDER_FEMALE";
            }

            const count = await ctx.prisma.patientProfile.count({
                where: whereClause
            });

            // Structured ZK-Proof Simulation
            const proof = {
                proofId: "ZK-" + Math.random().toString(36).substring(7).toUpperCase(),
                proofType: "SIMULATED_SNARK",
                verified: false, // Initially unverified until verifyProof is called
                timestamp: new Date().toISOString(),
                inputHash: "0x" + Math.random().toString(16).slice(2, 42),
                result: {
                    query: input.query,
                    aggregation: aggregationType,
                    value: count
                }
            };

            return {
                success: true,
                count: count,
                proof: proof,
                message: "ZK Proof generated. Ready for on-chain verification."
            };
        }),

    verifyProof: protectedProcedure
        .input(z.object({ proofId: z.string() }))
        .mutation(async () => {
            // Simulated Verifier Latency
            await new Promise(resolve => setTimeout(resolve, 800));
            return {
                verified: true,
                verificationId: "V-" + Math.random().toString(36).substring(7).toUpperCase(),
                onChainTx: "0x" + Math.random().toString(16).slice(2, 66)
            };
        }),
    getQueryStats: protectedProcedure.query(() => {
        return { totalQueries: 150, avgTime: "1.2s" };
    }),

    createStudy: protectedProcedure
        .input(z.object({
            title: z.string(),
            description: z.string(),
            price: z.string()
        }))
        .mutation(async ({ ctx, input }) => {
            if (ctx.user.role !== 'RESEARCHER') {
                throw new TRPCError({ code: 'FORBIDDEN', message: 'Only researchers can create marketplace studies.' });
            }

            return ctx.prisma.marketplaceStudy.create({
                data: {
                    ...input,
                    creatorId: ctx.user.id,
                    participants: 0
                }
            });
        })
});
