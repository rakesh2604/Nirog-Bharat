import { router } from './trpc';
import { authRouter } from './routers/auth';
import { patientRouter } from './routers/patient';
import { doctorRouter } from './routers/doctor';
import { emergencyRouter } from './routers/emergency';
import { pharmaRouter } from './routers/pharma';
import { researcherRouter } from './routers/researcher';

export const appRouter = router({
    auth: authRouter,
    patient: patientRouter,
    doctor: doctorRouter,
    emergency: emergencyRouter,
    pharma: pharmaRouter,
    researcher: researcherRouter
});

export type AppRouter = typeof appRouter;
