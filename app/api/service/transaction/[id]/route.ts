import { NextResponse } from 'next/server';

//buat get transaction berdasarkan id user
export async function GET(request: Request, context:any) {
  try {
    const {params} = context;
    const userId = params.id.toString();

    if (!userId) {
      console.log("tidak ada userid")
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    return NextResponse.json([], { status: 200 });
  } catch (error) {
    console.error('Error retrieving transactions:', error);
    return NextResponse.json({ error: 'Failed to retrieve transactions' }, { status: 500 });
  }
}

//buat update transaction berdasarkan id transaction
export async function PUT(req: Request, context: any) {
  try {
    const { params } = context;
    const trasanctionId = params.trasanctionId.toString();

    if (!trasanctionId) {
      return NextResponse.json({ error: 'Trsanction ID is required' }, { status: 400 });
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json({ error: 'Failed to update transaction' }, { status: 500 });
  }
}
