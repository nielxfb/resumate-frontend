import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

//buat get transaction berdasarkan id user
export async function GET(request: Request, context:any) {
  try {
    const {params} = context;
    const userId = params.id.toString();

    if (!userId) {
      console.log("tidak ada userid")
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: String(userId),
      },
    });

    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error('Error retrieving transactions:', error);
    return NextResponse.json({ error: 'Failed to retrieve transactions' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

//buat update transaction berdasarkan id transaction
export async function PUT(req: Request, context: any) {
  try {
    const { params } = context;
    const trasanctionId = params.trasanctionId.toString();
    const { input } = await req.json();

    if (!trasanctionId) {
      return NextResponse.json({ error: 'Trsanction ID is required' }, { status: 400 });
    }

    const updatedTransaction = await prisma.transaction.updateMany({
      where: {
        id: String(trasanctionId),
      },
      data: {
        paymentStatus: input.status.toString(),
      },
    });

    return NextResponse.json(updatedTransaction, { status: 200 });
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
