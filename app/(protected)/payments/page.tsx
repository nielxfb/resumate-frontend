import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

import { ContentLayout } from "@/components/base/protected/content-layout";
import { columns } from "@/components/pages/payment/columns";
import { DataTable } from "@/components/pages/payment/data-table";
import { exampleDataSchema } from "@/lib/data/example-data-schema";

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "lib/data/example-data.json"),
  );

  const exampleData = JSON.parse(data.toString());

  return z.array(exampleDataSchema).parse(exampleData);
}

export default async function PaymentPage() {
  const tasks = await getTasks();

  return (
    <ContentLayout title="Payment History">
      <div className="flex h-full flex-1 flex-col space-y-8 p-8">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Payment History
            </h2>
            <p className="text-muted-foreground">
              {/* Here&apos;s a list of all your payments. */}
              Coming soon...
            </p>
          </div>
        </div>
        {/* <DataTable data={tasks} columns={columns} /> */}
      </div>
    </ContentLayout>
  );
}
