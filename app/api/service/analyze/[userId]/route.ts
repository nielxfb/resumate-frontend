import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import axios from 'axios';

const prisma = new PrismaClient();
export async function GET(request: Request, context:any) {
  const user = await currentUser();
    try {
      const userId = user?.id;
      // const analyses = await prisma.analysis.findMany({
      //   where: {
      //     userId: String(userId),
      //   },
      //   include: {
      //     cvs: true,
      //   },
      // });
      const response = await axios.post(`${process.env.BACKEND_URL}/analysis/get-by-user-id?userId=${userId}`);
      if (response.status !== 200) {
        return NextResponse.json({ error: 'Failed to retrieve analysis' }, { status: 500 });
      }
      const analyses = response.data;

      return NextResponse.json(analyses, { status: 200 });
    } catch (error) {
      console.error('Error retrieving analysis:', error);
      return NextResponse.json({ error: 'Failed to retrieve analysis' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
}
