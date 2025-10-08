import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) redirect('/login');
  return (
    <section>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-slate-700">Welcome! Create your first site to get started.</p>
      <div className="mt-4"><Link className="rounded border px-3 py-2 hover:bg-slate-50" href="/dashboard/sites">Manage Sites</Link></div>
    </section>
  );
}
