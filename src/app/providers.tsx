'use client';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { TRPCReactProvider } from '@/trpc/client';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </TRPCReactProvider>
  );
};
export default Providers;
