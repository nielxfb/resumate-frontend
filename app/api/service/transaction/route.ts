import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const input = await req.json();
    try {
      const newTransaction = await prisma.transaction.create({
        data: {
          userId: input.userId,
          date: input.date,
          tokenAmount: input.tokenAmount,
          amountPurchase: input.amountPurchase,
          paymentStatus: input.paymentStatus,
          paymentMethod: input.paymentMethod,
        },
      });
      return NextResponse.json(newTransaction, { status: 200 });
    } catch (error) {
      console.error('Error inserting transaction:', error);
      return NextResponse.json({ error: 'Failed to create transaction' }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
} 
  
