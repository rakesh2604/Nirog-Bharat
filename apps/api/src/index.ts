import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './router';
import { createContext } from './trpc';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    }),
);

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
