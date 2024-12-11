// src/pages/events/components/events-table.tsx
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Event } from "@/lib/api/types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { 
  Edit2, 
  Trash2, 
  Calendar, 
  MapPin, 
  Users,
  ChevronDown,
  ChevronRight
} from "lucide-react";

interface EventsTableProps {
  data: Event[];
  RSVPs?: any;
  expandedEventId: string | null;
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
  onRSVPToggle: (eventId: string) => void;
}

export function EventsTable({ 
  data, 
  expandedEventId,
  RSVPs,
  onEdit, 
  onDelete,
  onRSVPToggle
}: EventsTableProps) {
  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => (
        <img
          src={row.getValue("imageUrl") || "/placeholder.png"}
          alt={row.getValue("title")}
          className="w-12 h-12 rounded-lg object-cover"
        />
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-foreground">{row.getValue("title")}</div>
          {row.original.description && (
            <div className="text-sm text-muted-foreground line-clamp-1">
              {row.original.description}
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "details",
      header: "Date & Location",
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm text-foreground">
            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
            {format(new Date(row.original.date), "MMM d, yyyy")}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            {row.original.location}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "stats",
      header: "Details",
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="text-sm text-foreground">
            {row.original.seatsAvailable - (RSVPs.length || 0)} seats available
          </div>
          {row.original.fee > 0 && (
            <div className="text-sm text-muted-foreground">
              KES {row.original.fee.toLocaleString()}
            </div>
          )}
        </div>
      ),
    },
    {
      id: "rsvps",
      header: "RSVPs",
      cell: ({ row }) => {
        const isExpanded = expandedEventId === row.original.id;
        return (
          <Button
            variant="ghost"
            onClick={() => onRSVPToggle(row.original.id)}
            className={`text-muted-foreground ${isExpanded ? "bg-accent hover:bg-accent" : ""}`}
          >
            <Users className="w-4 h-4 mr-2 text-foreground" />
            {RSVPs.length || ''} RSVPs
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 ml-2" />
            ) : (
              <ChevronRight className="w-4 h-4 ml-2" />
            )}
          </Button>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2 text-muted-foreground">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(row.original)}
            className="hover:text-blue-500"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(row.original)}
            className="hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable 
      columns={columns} 
      data={data} 
      searchKey="title"
    />
  );
}