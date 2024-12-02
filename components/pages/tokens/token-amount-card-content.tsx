import { Step } from "@stepperize/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins } from "lucide-react";

interface TokenAmountContentProps {
  step: Step;
  amount: number;
  setAmount: (amount: number) => void;
}

export default function TokenAmountCardContent({
  step,
  amount,
  setAmount,
}: TokenAmountContentProps) {
  return (
    <div className="flex w-full flex-col justify-center gap-4">
      <Label htmlFor="amount">Amount</Label>
      <div className="relative w-full">
        <Coins className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          id="amount"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value <= 0 || value > 200) return;
            setAmount(value);
          }}
          className="w-full pl-8"
        />
      </div>
      <div className="grid grid-cols-4 gap-x-4">
        {[-1, -5, 1, 5].map((value) => (
          <Button
            key={value}
            variant="outline"
            onClick={(e) => {
              const newValue = amount + value;
              if (newValue <= 0 || newValue > 200) return;
              setAmount(newValue);
            }}
          >
            {value > 0 ? `+${value}` : value}
          </Button>
        ))}
      </div>
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
