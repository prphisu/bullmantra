// app/(dashboard)/layout.tsx
import { auth } from '../../../auth'; // Your path is correct
import { redirect } from 'next/navigation';
//import SessionProvider from '@/components/SessionProvider'; // You need this

// --- IMPORT YOUR COMPONENTS ---
import YourHeader from '../components/Header';       // <-- Update this path if needed
import YourSidebar from '../components/Sidebar';     // <-- Update this path if needed

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Get the session on the server
  const session = await auth();

  // 2. Check if user is logged in
  if (!session?.user) {
    redirect('/login');
  }

  // 3. Check if the user is an 'admin'
  if (session.user.role !== 'admin') {
    // If not admin, redirect to homepage
    redirect('/'); // <-- I fixed this from '/dashboard' to '/'
  }

  // 4. If they are an admin, show the UI
  return (
    // <SessionProvider session={session}>
      <div className="flex min-h-screen">
        <YourSidebar />
        <main className="flex-1 flex flex-col">
          <YourHeader />
          <div className="flex-1 p-6 bg-gray-100">
            {children} 
          </div>
        </main>
      </div>
    // </SessionProvider>
  );
}