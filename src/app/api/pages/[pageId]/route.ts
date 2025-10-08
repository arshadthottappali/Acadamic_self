import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type Params = { params: { pageId: string } };

export async function GET(_req: Request, { params }: Params) {
  const page = await prisma.page.findUnique({ where: { id: params.pageId } });
  if (!page) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(page);
}

export async function PUT(req: Request, { params }: Params) {
  const { html, css, js, name } = await req.json();
  const updated = await prisma.page.update({ where: { id: params.pageId }, data: { html, css, js, name } });
  return NextResponse.json(updated);
}
