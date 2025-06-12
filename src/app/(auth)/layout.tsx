import Image from 'next/image';
import Link from 'next/link';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 ">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/landing"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className=" flex size-6 items-center justify-center rounded-md">
            <Image
              src="/logo.svg"
              alt="Rentiful Logo"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
          <div className="text-xl font-bold">
            RENT
            <span className=" font-light ">
              IFUL
            </span>
          </div>
        </Link>
        {children}
      </div>
    </div>
  );
};
export default Layout;
