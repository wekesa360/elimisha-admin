// src/pages/contacts/components/contact-table.tsx
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Mail, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export function ContactTable({ data, onDelete, onEmail }) {
  const columns: ColumnDef[] = [
    {
      accessorKey: "fullName",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
          {row.getValue("email")}
        </div>
      ),
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => (
        <p className="truncate max-w-md text-foreground">{row.getValue("message")}</p>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => format(new Date(row.getValue("createdAt")), "MMM d, yyyy HH:mm"),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end text-muted-foreground">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEmail(row.original.email)}
          >
            <Mail className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(row.original)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={data} searchKey="fullName" />;
}