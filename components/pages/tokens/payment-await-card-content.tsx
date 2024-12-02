import { Icons } from "@/components/icons";
import { createEWalletPayment, createQrPayment } from "@/lib/actions";
import { Step } from "@stepperize/react";
import Link from "next/link";
import { Link as LinkIcon, ScanQrCode } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { PaymentRequest } from "xendit-node/payment_request/models";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { QRCodeSVG } from "qrcode.react";

interface PaymentAwaitCardContentProps {
  step: Step;
  amount: number;
  paymentMethod: string;
  eWalletType: string;
}

export default function PaymentAwaitCardContent({
  step,
  amount,
  paymentMethod,
  eWalletType,
}: PaymentAwaitCardContentProps) {
  const { userId } = useAuth();
  const [paymentResponse, setPaymentResponse] = useState<PaymentRequest | null>(
    null,
  );
  const payAmount = amount * 2500;
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [qrCodeString, setQrCodeString] = useState<string | null>(null);

  const createPayment = useCallback(async () => {
    if (!userId) return;

    try {
      if (paymentMethod === "qrCode") {
        const { response, qrString } = await createQrPayment({
          amount: payAmount,
        });

        setPaymentResponse(response);
        setQrCodeString(qrString);
      } else {
        const { response, paymentUrl, qrString } = await createEWalletPayment({
          userId: userId,
          amount: payAmount,
          eWalletType,
        });

        setPaymentResponse(response);
        setPaymentUrl(paymentUrl);
        setQrCodeString(qrString);
      }
    } catch (error: any) {
      console.log(JSON.stringify(error));
    }
  }, [paymentMethod, payAmount, userId, eWalletType]);

  useEffect(() => {
    createPayment();
  }, [createPayment]);

  return (
    <div className="flex w-full items-center justify-center">
      {paymentMethod === "qrCode" ? (
        !paymentResponse || !qrCodeString ? (
          <Icons.spinner className="size-6 animate-spin" />
        ) : (
          <div className="flex w-full flex-col justify-center gap-y-4">
            <div className="flex items-center gap-x-2 text-sm">
              <ScanQrCode />
              Scan the QR code to complete the payment
            </div>
            <div className="rounded-md bg-white p-12">
              <QRCodeSVG
                className="h-full w-full"
                bgColor="#FFFFFF"
                fgColor="#000000"
                value={qrCodeString}
              />
            </div>
          </div>
        )
      ) : !paymentResponse || !paymentUrl || !qrCodeString ? (
        <Icons.spinner className="size-6 animate-spin" />
      ) : (
        <div className="flex w-full flex-col justify-center gap-y-4">
          <div className="flex items-center gap-x-2 text-sm">
            <ScanQrCode />
            Scan the QR code to complete the payment
          </div>
          <div className="rounded-md bg-white p-12">
            <QRCodeSVG
              className="h-full w-full"
              bgColor="#FFFFFF"
              fgColor="#000000"
              value={qrCodeString}
            />
          </div>
          <div className="flex w-full items-center justify-center gap-x-2 text-sm">
            or
          </div>
          <Link href={paymentUrl} rel="noopener noreferrer" target="_blank">
            <Button className="flex w-full items-center gap-x-2">
              <LinkIcon className="size-4" /> Follow this link to complete the
              payment
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
