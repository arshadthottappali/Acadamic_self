import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const sites = await prisma.site.findMany({ where: { ownerId: user.id } });
  return NextResponse.json(sites);
}

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name, subdomain } = await req.json();
  if (!name || !subdomain) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  try {
    const site = await prisma.site.create({ data: { name, subdomain, ownerId: user.id } });
    return NextResponse.json(site);
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to create site' }, { status: 400 });
  }
}
