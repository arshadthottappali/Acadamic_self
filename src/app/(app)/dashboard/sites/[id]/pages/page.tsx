import Link from 'next/link';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

type Params = { params: { id: string } };

export default async function SitePages({ params }: Params) {
  const session = await getServerSession();
  if (!session?.user?.email) redirect('/login');
  const site = await prisma.site.findUnique({ where: { id: params.id } });
  if (!site) redirect('/dashboard/sites');
  const pages = await prisma.page.findMany({ where: { siteId: site.id }, orderBy: { createdAt: 'asc' } });
  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Pages – {site.name}</h1>
        <Link className="rounded bg-brand px-3 py-2 text-white" href={`/dashboard/sites/${site.id}/pages/new` as any}>New Page</Link>
      </div>
      <ul className="mt-6 divide-y rounded border">
        {pages.map(p => (
          <li key={p.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-slate-600">/{p.slug}</div>
            </div>
            <div className="flex gap-3 text-sm">
              <Link className="underline" href={`/dashboard/sites/${site.id}/pages/${p.id}/builder` as any}>Open builder</Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
