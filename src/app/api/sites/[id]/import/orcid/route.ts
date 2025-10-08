import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type Params = { params: { id: string } };

export async function POST(req: Request, { params }: Params) {
  const { orcid } = await req.json();
  if (!orcid) return NextResponse.json({ error: 'Missing orcid' }, { status: 400 });
  const r = await fetch(`https://pub.orcid.org/v3.0/${orcid}/works`, { headers: { Accept: 'application/json' } });
  if (!r.ok) return NextResponse.json({ error: 'ORCID fetch failed' }, { status: 400 });
  const data = await r.json();
  const groups = data?.group ?? [];
  const pubs = [] as Array<{ title: string; year?: number; url?: string }>;
  for (const g of groups) {
    const title = g['work-summary']?.[0]?.title?.title?.value as string | undefined;
    const year = Number(g['work-summary']?.[0]?.['publication-date']?.year?.value ?? NaN);
    const url = g['work-summary']?.[0]?.url?.value as string | undefined;
    if (title) pubs.push({ title, year: isNaN(year) ? undefined : year, url });
  }
  for (const p of pubs) {
    await prisma.publication.create({ data: { siteId: params.id, title: p.title, authors: '', year: p.year ?? null, url: p.url, source: 'orcid', orcid } });
  }
  return NextResponse.json({ imported: pubs.length });
}
