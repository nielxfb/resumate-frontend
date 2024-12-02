import { headers } from "next/headers";

export async function POST(req: Request) {
  const headerPayload = headers();
  const callbackToken = headerPayload.get("x-callback-token");

  if (!callbackToken || callbackToken !== process.env.XENDIT_CALLBACK_TOKEN) {
    return new Response("Error occured -- no x-callback-token header", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  console.log(body);

  return new Response("", { status: 200 });
}
