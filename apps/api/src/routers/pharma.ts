
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const pharmaRouter = router({
    getMarketplace: protectedProcedure.query(async ({ ctx }) => {
        if (ctx.user.role !== 'PHARMA') {
            throw new TRPCError({ code: 'FORBIDDEN', message: 'Restricted to Pharmaceutical Partners' });
        }

        let studies = await ctx.prisma.marketplaceStudy.findMany();

        if (studies.length === 0) {
            await ctx.prisma.marketplaceStudy.createMany({
                data: [
                    { title: "Diabetes Research (Phase III)", description: "Patient data for recent SGLT2 inhibitor trials.", price: "5000", currency: "NB", participants: 120 },
                    { title: "Cardiovascular Study (AHA)", description: "High-resolution imaging data and lifestyle logs.", price: "8000", currency: "NB", participants: 45 },
                    { title: "Oncology Patient Cohort", description: "Anonymized genomic profiles and treatment outcomes.", price: "12000", currency: "NB", participants: 88 }
                ]
            });
            studies = await ctx.prisma.marketplaceStudy.findMany();
        }

        return studies;
    }),
    purchaseLicense: protectedProcedure
        .input(z.object({ datasetId: z.string() }))
        .mutation(async ({ ctx, input }) => {
            if (ctx.user.role !== 'PHARMA') {
                throw new TRPCError({ code: 'FORBIDDEN', message: 'Restricted to Pharmaceutical Partners' });
            }

            const study = await ctx.prisma.marketplaceStudy.findUnique({
                where: { id: input.datasetId }
            });

            if (!study) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'Study not found' });
            }

            const purchase = await ctx.prisma.dataPurchase.create({
                data: {
                    studyId: input.datasetId,
                    buyerId: ctx.user.id
                }
            });

            return {
                success: true,
                message: `Purchased license for study: ${study.title}`,
                txHash: purchase.txHash
            };
        })
});
