'use client';

import { ThemeProvider } from '@/components/providers/theme-provider';
import { store } from '@/state/store';
import { TRPCReactProvider } from '@/trpc/client';
import { Provider } from 'react-redux';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      </Provider>
    </TRPCReactProvider>
  );
};
export default Providers;
