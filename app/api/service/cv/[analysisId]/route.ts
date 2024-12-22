import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

export async function GET(req: NextRequest, context: any) {
  const { params } = context;
  const analysisId = params.analysisId;

  if (!analysisId) {
    console.log("tidak ada analysisId");
    return NextResponse.json({ error: 'Analysis ID is required' }, { status: 400 });
  }

    try {
      // const cvs = await prisma.cV.findMany({
      //   where: {
      //     analysisId: Number(analysisId),
      //   },
      // });
      const response = await axios.post(`${process.env.BACKEND_URL}/cv/get-by-analysis-id?analysisId=${analysisId}`);
      if (response.status !== 200) {
        return NextResponse.json({ error: 'Failed to retrieve CVs' }, { status: 500 });
      }

      return NextResponse.json(response.data!, { status: 200 });
    } catch (error) {
      console.error('Error retrieving CVs:', error);
      return NextResponse.json({ error: 'Failed to retrieve CVs' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
}
