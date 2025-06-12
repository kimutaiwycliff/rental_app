import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
const Home = async() => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/sign-in');
  }
  return (
    <div>
      <p>Hello {session.user?.role}</p>
    </div>
  );
};
export default Home;
