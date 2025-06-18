import { auth } from '@/lib/auth';
import { initTRPC, TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { cache } from 'react';
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: 'user_123' };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
// Public procedure (no authentication required)
export const baseProcedure = t.procedure;

// Authenticated procedure (checks if user is logged in)
export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User not authenticated',
    });
  }
  return next({
    ctx: {
      ...ctx,
      auth: session,
    },
  });
});

// Manager-only procedure (extends protectedProcedure)
export const managerProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.auth.user.role !== 'manager') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Only managers can access this resource',
    });
  }
  return next();
});

// Tenant-only procedure (extends protectedProcedure)
export const tenantProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.auth.user.role !== 'tenant') {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Only tenants can access this resource',
    });
  }
  return next();
});
