import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Mail, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

type Contact = {
  id: string;
  fullName: string;
  email: string;
  message: string;
  createdAt: string;
};

interface ContactTableProps {
  data: Contact[];
  onDelete: (contact: Contact) => void;
  onEmail: (email: string) => void;
  onView: (contact: Contact) => void;
}

export function ContactTable({ data, onDelete, onEmail, onView }: ContactTableProps) {
  const columns: ColumnDef<Contact>[] = [
    {
      accessorKey: "fullName",
      header: "Name",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.getValue("fullName")}</span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="flex items-center text-foreground">
          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
          {row.getValue("email")}
        </div>
      ),
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => (
        <Button
          variant="ghost"
          className="p-0 h-auto hover:bg-transparent"
          onClick={() => onView(row.original)}
        >
          <p className="truncate max-w-md text-muted-foreground hover:text-primary">
            {row.getValue("message")}
          </p>
        </Button>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) =>
        <span className="text-foreground">{format(new Date(row.getValue("createdAt") as string), "MMM d, yyyy HH:mm")}</span>,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end space-x-2 text-muted-foreground">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onView(row.original)}
            title="View message"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEmail(row.original.email)}
            title="Send email"
          >
            <Mail className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(row.original)}
            title="Delete message"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return <DataTable columns={columns} data={data.contacts} searchKey="fullName" />;
}