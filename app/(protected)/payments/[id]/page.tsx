'use client'

import { ContentLayout } from "@/components/base/protected/content-layout";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import Image from 'next/image';
import { Button } from "@/components/ui/button";
export default function PaymentPage() {
  const { id } = useParams();
    
  // const [transactionInput, setTransactionInput] = useState<transaction_input>({
  //     userId: "user124",
  //     date: new Date(),
  //     tokenAmount: 100,
  //     amountPurchase: 1500,
  //     paymentStatus: "Completed",
  //     paymentMethod: "Credit Card"
  //   });
  
    // const handleSubmit = async (e: React.FormEvent) => {
    //   e.preventDefault();
  
    //   try {
    //     const response = await fetch('/api/service/transaction/', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify(transactionInput),
    //     });
  
    //     if (!response.ok) {
    //       throw new Error('Failed to create transaction');
    //     }
  
    //     const result = await response.json();
    //     console.log('Transaction created successfully:', result);
    //   } catch (error) {
    //     console.error('Error creating transaction:', error);
    //   }
    // };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        const response = await fetch('/api/service/transaction/user123/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to create transaction');
        }
  
        const result = await response.json();
        console.log('Transaction fetched successfully:', result);
      } catch (error) {
        console.error('Error fetching transaction:', error);
      }
    };

  return (
    <ContentLayout title="Payment Detail">
      <div className="flex h-full flex-1 flex-col space-y-8 p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Payment Detail {id}
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s the details of your payment.
            </p>
          </div>
        </div>
        <div className="flex w-full">
            <div className="flex flex-col gap-8 items-center">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Token Amount</TableHead>
                    <TableHead>Amount Purchase</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead className="text-right">Payment Method</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Aug 24th, 2024</TableCell>
                    <TableCell>25</TableCell>
                    <TableCell>Rp. 250.75,00</TableCell>
                    <TableCell>Unpaid</TableCell>
                    <TableCell className="text-right">Credit Card</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Card>
                <CardHeader>
                  <CardTitle>
                    Payment QR
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Image src="/tree.jpg" alt="Payment QR" width={500} height={300} />
                </CardContent>
                {/* <Button onClick={handleSubmit}>testing</Button> */}
              </Card>
            </div>      
        </div>
      </div>
    </ContentLayout>
  );
}
