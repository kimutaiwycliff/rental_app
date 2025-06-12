import { NAVBAR_HEIGHT } from '@/lib/constants';
import { Navbar } from '@/modules/landing/components/Navbar';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.session.getMany.queryOptions());
  return (
    <div className="h-full w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Navbar />
            <main
              className={`h-full flex w-full flex-col`}
              style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
            >
              {children}
            </main>
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};
export default Layout;
