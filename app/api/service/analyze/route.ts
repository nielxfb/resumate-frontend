import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: NextApiResponse) {
    try {
      return NextResponse.json({}, { status: 200 });
    } catch (error) {
      console.error('Error creating analysis with CVs:', error);
      return NextResponse.json({ error: 'Failed to create analysis' }, { status: 500 });
    }
}
