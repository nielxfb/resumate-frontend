import { Step } from "@stepperize/react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QrCode, Wallet } from "lucide-react";

interface PaymentMethodContentProps {
  step: Step;
  amount: number;
  paymentMethod: string;
  eWalletType: string;
  setPaymentMethod: (paymentMethod: "qrCode" | "eWallet") => void;
  setEWalletType: (eWalletType: "OVO" | "DANA" | "Shopee Pay") => void;
}

export default function PaymentMethodCardContent({
  step,
  amount,
  paymentMethod,
  eWalletType,
  setPaymentMethod,
  setEWalletType,
}: PaymentMethodContentProps) {
  return (
    <div className="flex w-full flex-col justify-center gap-4">
      <RadioGroup
        defaultValue={paymentMethod}
        className="grid grid-cols-2 gap-4"
        onValueChange={(value) =>
          setPaymentMethod(value as "qrCode" | "eWallet")
        }
      >
        <div>
          <RadioGroupItem value="qrCode" id="qrCode" className="peer sr-only" />
          <Label
            htmlFor="qrCode"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <QrCode className="mb-3 h-6 w-6" />
            QR Code
          </Label>
        </div>
        <div>
          <RadioGroupItem
            value="eWallet"
            id="eWallet"
            className="peer sr-only"
          />
          <Label
            htmlFor="eWallet"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Wallet className="mb-3 h-6 w-6" />
            E-Wallet
          </Label>
        </div>
      </RadioGroup>
      {paymentMethod === "eWallet" && (
        <RadioGroup
          defaultValue={eWalletType}
          onValueChange={(value) =>
            setEWalletType(value as "OVO" | "DANA" | "Shopee Pay")
          }
          className="grid grid-cols-3 gap-4"
        >
          {["OVO", "DANA", "Shopee Pay"].map((_eWalletType) => (
            <div key={_eWalletType}>
              <RadioGroupItem
                id={_eWalletType}
                value={_eWalletType}
                className="peer sr-only"
              >
                {_eWalletType}
              </RadioGroupItem>
              <Label
                htmlFor={_eWalletType}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                {_eWalletType}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
      <div>
        <p>
          Pay amount:&nbsp;
          <span className="font-medium text-primary">
            Rp{(amount * 2500).toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
}
