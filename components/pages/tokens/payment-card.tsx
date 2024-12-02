"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, Coins } from "lucide-react";
import { defineStepper } from "@stepperize/react";
import { useState } from "react";
import TokenAmountCardContent from "./token-amount-card-content";
import PaymentMethodCardContent from "./payment-method-card-content";
import PaymentAwaitCardContent from "./payment-await-card-content";
import Link from "next/link";

const { useStepper } = defineStepper(
  { id: "token-amount" },
  { id: "payment-method" },
  { id: "payment-await" },
);

export default function PaymentCard() {
  const stepper = useStepper();

  const [amount, setAmount] = useState(10);
  const [paymentMethod, setPaymentMethod] = useState<"qrCode" | "eWallet">(
    "eWallet",
  );
  const [eWalletType, setEWalletType] = useState<"OVO" | "DANA" | "Shopee Pay">(
    "Shopee Pay",
  );

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <div className="flex items-center gap-x-4">
          {!stepper.isFirst && stepper.current.id != "payment-await" && (
            <Button variant="outline" size="icon" onClick={stepper.prev}>
              <ChevronLeft className="size-6" />
            </Button>
          )}
          <CardTitle className="flex items-center gap-x-3">
            <Coins /> Buy tokens
          </CardTitle>
        </div>
        {stepper.switch({
          "token-amount": (step) => (
            <CardDescription className="space-y-2">
              Select the amount of tokens you&apos;d like to purchase. Please
              review and agree to the terms before completing the payment.
              <br />
              <br />
              Our rates are as follows:&nbsp;
              <span className="font-medium text-primary">
                1 token = Rp2.500,00
              </span>
              .
            </CardDescription>
          ),
          "payment-method": (step) => (
            <CardDescription>
              Choose your payment method to buy tokens, by clicking continue you
              agree to the terms and conditions.&nbsp;
              <span className="font-medium text-primary">
                Please make sure the token amount is correct before proceeding
              </span>
              .
            </CardDescription>
          ),
          "payment-await": (step) => (
            <CardDescription>
              Please complete the payment within the next 15 minutes to avoid
              any issues with your purchase.
            </CardDescription>
          ),
        })}
      </CardHeader>
      <CardContent className="grid gap-6">
        {stepper.switch({
          "token-amount": (step) => (
            <TokenAmountCardContent
              step={step}
              amount={amount}
              setAmount={setAmount}
            />
          ),
          "payment-method": (step) => (
            <PaymentMethodCardContent
              step={step}
              amount={amount}
              paymentMethod={paymentMethod}
              eWalletType={eWalletType}
              setPaymentMethod={setPaymentMethod}
              setEWalletType={setEWalletType}
            />
          ),
          "payment-await": (step) => (
            <PaymentAwaitCardContent
              step={step}
              amount={amount}
              paymentMethod={paymentMethod}
              eWalletType={eWalletType}
            />
          ),
        })}
      </CardContent>
      <CardFooter className="block space-y-4">
        {stepper.current.id != "payment-await" && (
          <Button
            className="w-full"
            onClick={stepper.next}
            disabled={
              eWalletType !== "Shopee Pay" || paymentMethod === "qrCode"
            }
          >
            {stepper.current.id === "payment-method"
              ? paymentMethod !== "qrCode"
                ? eWalletType !== "Shopee Pay"
                  ? "Coming soon..."
                  : "Checkout"
                : "Coming soon..."
              : "Continue"}
          </Button>
        )}
        <CardDescription>
          Need help? Contact us at&nbsp;
          <Link href="mailto: sroomy@example.com">sroomy@example.com</Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
