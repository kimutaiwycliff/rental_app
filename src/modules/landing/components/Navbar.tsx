'use client';
import { ModeToggle } from '@/components/providers/theme-toggler';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserProfile } from '@/components/UserProfile';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Plus, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // trigger blur after 10px scroll
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trpc = useTRPC();
  const { data: userSession } = useSuspenseQuery(
    trpc.session.getMany.queryOptions()
  );
  const router = useRouter();
  const pathname = usePathname();
  const isDashboardPage =
    pathname.includes('/manager') || pathname.includes('/tenant');
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 shadow-xl transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-md bg-white/30 dark:bg-black/30' : ''
      }`}
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex justify-between items-center w-full py-3 px-8">
        <div className="flex items-center gap-4 md:gap-6">
          {isDashboardPage && (
            <div className="md:hidden">
              <SidebarTrigger />
            </div>
          )}
          <Link href="/" className="cursor-pointer" scroll={false}>
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="Rentiful Logo"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="text-xl font-bold">
                RENT
                <span className=" font-light ">IFUL</span>
              </div>
            </div>
          </Link>
          {isDashboardPage && userSession && (
            <Button
              variant="secondary"
              className="md:ml-4"
              onClick={() =>
                router.push(
                  userSession.user?.role?.toLowerCase() === 'manager'
                    ? '/managers/newproperty'
                    : '/search'
                )
              }
            >
              {userSession.user?.role?.toLowerCase() === 'manager' ? (
                <>
                  <Plus className="h-4 w-4" />
                  <span className="hidden md:block ml-2">Add New Property</span>
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  <span className="hidden md:block ml-2">
                    Search Properties
                  </span>
                </>
              )}
            </Button>
          )}
        </div>
        {!isDashboardPage && (
          <p className="hidden md:block">
            Discover your perfect rental apartment with our advanced search
          </p>
        )}
        <div className="flex items-center gap-5">
          {userSession ? (
            <UserProfile
              name={userSession.user?.name || ''}
              image={userSession.user?.image || ''}
              role={userSession.user?.role || ''}
            />
          ) : (
            <>
              <Link href="/sign-in">
                <Button
                  variant="outline"
                  className="rounded-lg"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button
                  variant="secondary"
                  className=" rounded-lg"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
