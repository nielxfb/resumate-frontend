import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const user = await currentUser();

  try {
    const { params } = context;
    const userId = user?.id;

    if (!userId) {
      console.log("tidak ada userid");
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error("Error retrieving token:", error);
    return NextResponse.json(
      { error: "Failed to retrieve token" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error("Error inserting token:", error);
    return NextResponse.json(
      { error: "Failed to create token" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request, context: any) {
  const user = await currentUser();
  try {
    const userId = user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error("Error updating token:", error);
    return NextResponse.json(
      { error: "Failed to update token" },
      { status: 500 },
    );
  }
}
