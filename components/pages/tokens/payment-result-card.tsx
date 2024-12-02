import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Transaction } from "@prisma/client";
import { Coins } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function PaymentResultCard({
  transaction,
}: {
  transaction: Transaction | null;
}) {
  if (!transaction) redirect("/tokens");

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-3">
          <Coins /> Token purchase successful
        </CardTitle>
        <CardDescription>
          Your token purchase was successful. You will receive a receipt
          shortly.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <CardDescription>
            Reference ID:&nbsp;
            <span className="font-medium">{transaction.referenceId}</span>
          </CardDescription>
          <CardDescription>
            Amount:&nbsp;
            <span className="font-medium">
              {transaction.tokenAmount}&nbsp;tokens
            </span>
          </CardDescription>
          <CardDescription>
            Total:{" "}
            <span className="font-medium">
              Rp{transaction.amountPurchase.toLocaleString()}
            </span>
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Need help? Contact us at&nbsp;
          <Link href="mailto: sroomy@example.com">sroomy@example.com</Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
