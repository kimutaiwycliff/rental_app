import { db } from '@/db';
import { agents } from '@/db/schema';
import { agentInsertSchema } from '@/lib/schemas';
import { createTRPCRouter, protectedProcedure } from '@/trpc/init';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

export const agentsRouter = createTRPCRouter({
  //Fetch all agents
  getAll: protectedProcedure.query(async () => {
    const data = await db.select().from(agents);
    return data;
  }),

  //Fetch one agent
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const [existingAgent]= await db
        .select()
        .from(agents)
        .where(eq(agents.id, input.id));
      return existingAgent;
    }),

  //Create new agent
  create: protectedProcedure
    .input(agentInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();
      return createdAgent;
    }),
});
