"use client";

import { Row } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { exampleDataSchema } from "@/lib/data/example-data-schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {

  return (
    // <Link href={`/payments/${invoice_id}`}>
      <Button
        variant="ghost"
        className="flex h-auto w-auto border p-2 data-[state=open]:bg-muted"
      >
        <span>View Detail</span>
      </Button>
    // </Link>
  );
}
