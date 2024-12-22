"use server";

import xenditClient from "@/lib/xendit";
import {
  PaymentRequestParameters,
  PaymentRequest as PaymentRequestModel,
} from "xendit-node/payment_request/models";
import { v4 as uuidv4 } from "uuid";

export async function createQrPayment({ amount }: { amount: number }) {
  const { PaymentRequest } = xenditClient;

  const data: PaymentRequestParameters = {
    amount: amount,
    metadata: {
      sku: "example-sku-1234",
    },
    paymentMethod: {
      qrCode: {
        channelCode: "QRIS",
      },
      reusability: "ONE_TIME_USE",
      type: "QR_CODE",
    },
    currency: "IDR",
    referenceId: "example-ref-1234",
  };

  const response: PaymentRequestModel =
    await PaymentRequest.createPaymentRequest({
      data,
    });

  const qrString = response.paymentMethod.qrCode?.channelProperties
    ?.qrString as string;

  return {
    response,
    qrString,
  };
}

export async function createEWalletPayment({
  userId,
  amount,
  eWalletType,
}: {
  userId: string;
  amount: number;
  eWalletType: string;
}) {
  const { PaymentRequest } = xenditClient;

  const channelCode = eWalletType.toUpperCase().replace(" ", "").trim();

  const referenceId = uuidv4();

  const data: PaymentRequestParameters | any = {
    country: "ID",
    amount: amount,
    paymentMethod: {
      ewallet: {
        channelProperties: {
          successReturnUrl: `${process.env.NEXT_PUBLIC_APP_URL}/tokens/success/${referenceId}`,
        },
        channelCode: channelCode,
      },
      reusability: "ONE_TIME_USE",
      type: "EWALLET",
    },
    currency: "IDR",
    referenceId: referenceId,
  };

  const response: PaymentRequestModel =
    await PaymentRequest.createPaymentRequest({
      data,
    });

  if (!response.actions) {
    throw new Error("No actions found in response");
  }

  const paymentUrl = response.actions && response.actions[0]?.url;
  const qrString = response?.actions && (response.actions[1]?.qrCode as string);


  return {
    response,
    paymentUrl,
    qrString,
  };
}

export default async function getTransaction({
  referenceId,
}: {
  referenceId: string;
}) {
  try {

    return {};
  } catch (error) {
    console.error("Error fetching transaction:", error);
  }

  return null;
}
