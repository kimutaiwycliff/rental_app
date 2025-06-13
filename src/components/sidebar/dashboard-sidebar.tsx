'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { NavMain } from './nav-main-without-collapsible';
import { NAVBAR_HEIGHT, SidebarMenuItems } from '@/lib/constants';
import { NavUser } from './NavUser';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

export const DashboardSidebar = ({showLogo}: {showLogo?: boolean}) => {
  const trpc = useTRPC();
    const { data: session } = useSuspenseQuery(
      trpc.session.getMany.queryOptions()
    );
    const { toggleSidebar, open } = useSidebar();
  return (
    <Sidebar variant="sidebar" collapsible="icon" className="fixed left-0  shadow-lg"
      style={{
        top: `${NAVBAR_HEIGHT}px`,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      }}>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              {showLogo ? (
                <Link href="/landing">
                <Image src="/logo.svg" alt="logo" width={32} height={32} />
                <div className=" font-bold">
                RENT
                <span className=" font-light ">IFUL</span>
              </div>
              </Link>

              ) : (<div
              className={cn(
                "flex min-h-[56px] w-full items-center pt-3 mb-3",
                open ? "justify-between px-6" : "justify-center"
              )}
            >
              {open ? (
                <>
                  <h1 className="text-lg font-bold">
                    {session?.user?.role === "manager" ? "Manager View" : "Renter View"}
                  </h1>
                  <button
                    className=" p-2 rounded-md"
                    onClick={() => toggleSidebar()}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </>
              ) : (
                <button
                  className=" p-2 rounded-md"
                  onClick={() => toggleSidebar()}
                >
                  <Menu className="h-6 w-6 " />
                </button>
              )}
            </div>)}

            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SidebarMenuItems} />
      </SidebarContent>
      <SidebarFooter>
        {session && (
          <NavUser
            user={{ ...session.user, image: session.user.image ?? '' }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
