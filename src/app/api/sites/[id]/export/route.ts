import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import JSZip from 'jszip';

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  const site = await prisma.site.findUnique({ where: { id: params.id } });
  if (!site) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const pages = await prisma.page.findMany({ where: { siteId: site.id } });
  const zip = new JSZip();
  for (const p of pages) {
    const html = `<!doctype html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${p.name}</title><style>${p.css ?? ''}</style></head><body>${p.html ?? ''}<script>${p.js ?? ''}</script></body></html>`;
    const path = p.slug === 'index' ? 'index.html' : `${p.slug}.html`;
    zip.file(path, html);
  }
  const blob = await zip.generateAsync({ type: 'uint8array' });
  return new NextResponse(blob as any, { headers: { 'Content-Type': 'application/zip', 'Content-Disposition': `attachment; filename="${site.subdomain}.zip"` } });
}
