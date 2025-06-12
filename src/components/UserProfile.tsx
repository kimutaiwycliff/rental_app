'use client';

import {
  Bell,
  ChevronsUpDown,
  LogOut,
  MessageCircle,
  Settings,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { GeneratedAvatar } from '@/modules/landing/components/NavUser';

export const UserProfile = ({
  name,
  role,
  image,
}: {
  name: string;
  role: string;
  image?: string;
}) => {
  const router = useRouter();
  const onLogout = () => {
    const toastId = toast.loading('Logging out...');

    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Logged out successfully', { id: toastId });
          router.replace('/landing');
      router.refresh();
        },
        onError: () => {
          toast.error('Failed to log out', { id: toastId });
        },
      },
    });
  };
  return (
    <>
      <div className="relative hidden md:block">
        <MessageCircle className="w-6 h-6 cursor-pointer text-primary-200 hover:text-primary-400" />
        <span className="absolute top-0 right-0 w-2 h-2 bg-secondary-700 rounded-full"></span>
      </div>
      <div className="relative hidden md:block">
        <Bell className="w-6 h-6 cursor-pointer text-primary-200 hover:text-primary-400" />
        <span className="absolute top-0 right-0 w-2 h-2 bg-secondary-700 rounded-full"></span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none">
          <Button variant={'ghost'}>
            {image ? (
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={image} alt={name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
            ) : (
              <GeneratedAvatar
                seed={name}
                variant="initials"
                className="h-8 w-8 rounded-lg"
              />
            )}
            <p className="text-primary-200 hidden md:block">{name.charAt(0).toUpperCase()}</p>

            <ChevronsUpDown className="ml-auto size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-primary-700">
          <DropdownMenuItem
            className="cursor-pointer hover:!bg-primary-700 hover:!text-primary-100 font-bold"
            onClick={() =>
              router.push(
                role.toLowerCase() === 'manager'
                  ? '/managers/properties'
                  : '/tenants/favorites',
                { scroll: false }
              )
            }
          >
            Go to Dashboard
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer hover:!bg-primary-700 hover:!text-primary-100"
            onClick={() =>
              router.push(`/${role.toLowerCase()}s/settings`, { scroll: false })
            }
          >
            <Settings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer hover:!bg-primary-700 hover:!text-primary-100"
            onClick={onLogout}
          >
            <LogOut />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
