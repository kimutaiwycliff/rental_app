import { DashboardSidebar } from '@/components/sidebar/dashboard-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import { Navbar } from '@/modules/landing/components/Navbar';
import { cookies } from 'next/headers';

const Layout = async ({ children }: { children: React.ReactNode }) => {
   const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <SidebarProvider defaultOpen={defaultOpen}
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 54)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }>
      <div className="min-h-screen w-full">
        <Navbar />
        <div style={{ marginTop: `${NAVBAR_HEIGHT}px` }}>
          <main className="flex">
            <DashboardSidebar showLogo={false} />
            <div className="flex-grow transition-all duration-300">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
export default Layout;
