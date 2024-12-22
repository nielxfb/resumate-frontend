import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const input = await req.json();
    try {
      return NextResponse.json({}, { status: 200 });
    } catch (error) {
      console.error('Error inserting transaction:', error);
      return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
    }
} 
  
