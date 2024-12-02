"use client";

import { ColumnDef } from "@tanstack/react-table";
import { payment_status } from "@/lib/data/data";
import { Task } from "@/lib/data/schema";
import { DataTableColumnHeader } from "@/components/pages/payment/data-table-column-header";
import { DataTableRowActions } from "@/components/pages/payment/data-table-row-actions";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);

  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
        ? "nd"
        : day === 3 || day === 23
          ? "rd"
          : "th";

  return `${month} ${day}${suffix}, ${year}`;
}

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "invoice_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice Id" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("invoice_id")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {formatDate(row.getValue("date"))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "token_amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Token Amount" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("token_amount")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount_purchase",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount Purchase" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{"Rp. " + row.getValue("amount_purchase") + ",00"}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "payment_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Status" />
    ),
    cell: ({ row }) => {
      const status = payment_status.find(
        (status) => status.value === row.getValue("payment_status"),
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{row.getValue("payment_status")}</span>
        </div>
      );
    },
    filterFn: (row, id, filterValue) => {
      const rowValue = row.getValue(id);
      return filterValue.includes(rowValue);
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "payment_method",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Method" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          <span>{row.getValue("payment_method")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
