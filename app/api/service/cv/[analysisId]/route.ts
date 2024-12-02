import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, context:any) {
  const {params} = context;
  const analysisId = params.analysisId;

  if (!analysisId) {
    console.log("tidak ada analysisId")
    return NextResponse.json({ error: 'Analysis ID is required' }, { status: 400 });
  }

    try {
      const cvs = await prisma.cV.findMany({
        where: {
          analysisId: Number(analysisId),
        },
      });

      return NextResponse.json(cvs, { status: 200 });
    } catch (error) {
      console.error('Error retrieving CVs:', error);
      return NextResponse.json({ error: 'Failed to retrieve CVs' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
}
