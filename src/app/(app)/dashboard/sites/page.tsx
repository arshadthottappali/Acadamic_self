import Link from 'next/link';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function SitesPage() {
  const session = await getServerSession();
  if (!session?.user?.email) redirect('/login');
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) redirect('/login');
  const sites = await prisma.site.findMany({ where: { ownerId: user.id } });
  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Sites</h1>
        <Link href="/dashboard/sites/new" className="rounded bg-brand px-3 py-2 text-white">New Site</Link>
      </div>
      <ul className="mt-6 divide-y border rounded">
        {sites.map(s => (
          <li key={s.id} className="px-4 py-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{s.name}</div>
              <div className="text-sm text-slate-600">{s.subdomain}.example.host</div>
            </div>
            <div className="flex gap-3 text-sm">
              <Link className="underline" href={`/dashboard/sites/${s.id}` as any}>Edit</Link>
              <Link className="underline" href={`/dashboard/sites/${s.id}/pages` as any}>Pages</Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
