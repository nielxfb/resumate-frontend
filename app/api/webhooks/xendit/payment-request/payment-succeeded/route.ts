import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const headerPayload = headers();
  const callbackToken = headerPayload.get("x-callback-token");

  if (!callbackToken || callbackToken !== process.env.XENDIT_CALLBACK_TOKEN) {
    return new Response("Error occured -- no x-callback-token header", {
      status: 400,
    });
  }

  const payload = await req.json();

  if (payload.data.status === "SUCCEEDED") {
    console.log("Payment request succeeded", payload);

    try {
      const paymentRequestId = payload.data.payment_request_id;

      const transaction = await prisma.transaction.findUnique({
        where: {
          paymentId: paymentRequestId,
        },
      });

      console.log(transaction);

      const token = await prisma.token.findUnique({
        where: {
          userId: transaction!.userId,
        },
      });

      await prisma.transaction.update({
        where: {
          paymentId: paymentRequestId,
        },
        data: {
          paymentStatus: "SUCCEEDED",
        },
      });

      await prisma.token.update({
        where: {
          userId: transaction!.userId,
        },
        data: {
          tokenAmount: token!.tokenAmount + transaction!.tokenAmount,
        },
      });
    } catch (error) {
      console.error("Error updating transaction:", error);
    } finally {
      await prisma.$disconnect();
    }
  }

  return new Response("", { status: 200 });
}
