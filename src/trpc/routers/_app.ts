import { baseProcedure, createTRPCRouter } from '../init';
import { auth } from '@/lib/auth';
import { agentsRouter } from '@/modules/agents/procedures';
import { headers } from 'next/headers';

const sessionRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
      });
    return session;
  })
});
export const appRouter = createTRPCRouter({
  session: sessionRouter,
  agents: agentsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;


