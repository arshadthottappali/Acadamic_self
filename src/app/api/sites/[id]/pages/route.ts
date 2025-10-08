import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const site = await prisma.site.findUnique({ where: { id: params.id } });
  if (!site) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const pages = await prisma.page.findMany({ where: { siteId: site.id }, orderBy: { createdAt: 'asc' } });
  return NextResponse.json(pages);
}

export async function POST(req: Request, { params }: Params) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name, slug } = await req.json();
  if (!name || !slug) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  try {
    const page = await prisma.page.create({ data: { siteId: params.id, name, slug } });
    return NextResponse.json(page);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create page' }, { status: 400 });
  }
}
