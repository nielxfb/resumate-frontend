import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';

const prisma = new PrismaClient();
export async function GET(request: Request, context:any) {
  const user = await currentUser();
    try {
      const userId = user?.id;
      const analyses = await prisma.analysis.findMany({
        where: {
          userId: String(userId),
        },
        include: {
          cvs: true,
        },
      });

      return NextResponse.json(analyses, { status: 200 });
    } catch (error) {
      console.error('Error retrieving analysis:', error);
      return NextResponse.json({ error: 'Failed to retrieve analysis' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
}
