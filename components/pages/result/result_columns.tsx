import { ColumnDef } from "@tanstack/react-table";
import { payment_status } from "@/lib/data/data";
import { Task } from "@/lib/data/schema";
import { DataTableColumnHeader } from "@/components/pages/payment/data-table-column-header";
import { DataTableRowActions } from "@/components/pages/payment/data-table-row-actions";
import { Result } from "@/lib/data/results-schema";
import { Link } from "lucide-react";

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

export const result_columns: ColumnDef<Result>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("id")}</div>
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
    accessorKey: "totalCVs",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total CV" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("totalCVs")}
          </span>
        </div>
      );
    },
  }, 
  {
    id: "actions",
    cell: ({ row }) => {
      const rowData = row.original;
      const href = `/detail/${rowData.id}`;
  
      return (
        <div className="flex space-x-2">
          <a
            href={href}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            View Details
          </a>
        </div>
      );
    },
  }
  
];
