import { Navbar } from '@/modules/landing/components/Navbar';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
const Home = async() => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.session.getMany.queryOptions())

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <ErrorBoundary fallback={<div>Something went wrong</div>}> */}
           <Navbar />
        {/* </ErrorBoundary> */}
      </Suspense>
    </HydrationBoundary>

  );
};
export default Home;
