// src/pages/events/components/rsvp-list.tsx
import { useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Download, Edit2, Trash2, Plus } from "lucide-react";
import { RSVPEntry } from "@/lib/api/types";
import { useEvents } from "@/lib/api/hooks";
import { RSVPForm } from "./rsvp-form";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

interface RSVPListProps {
  eventId: string;
  eventRSVPs: RSVPEntry[];
}

export function RSVPList({ eventId, eventRSVPs }: RSVPListProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingRSVP, setEditingRSVP] = useState<RSVPEntry | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRSVP, setSelectedRSVP] = useState<RSVPEntry | null>(null);
  const { events, createRsvp, updateRsvp, deleteRsvp } = useEvents();

  const event = events?.find(e => e.id === eventId);
  const rsvps = eventRSVPs || [];

  const handleSubmit = async (formData: FormData) => {
    try {
      if (editingRSVP) {
        await updateRsvp({
          eventId,
          rsvpId: editingRSVP.id,
          data: formData
        });
      } else {
        await createRsvp({
          eventId,
          data: formData
        });
      }
      setShowForm(false);
      setEditingRSVP(null);
    } catch (error) {
      console.error('Error saving RSVP:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedRSVP) return;
    try {
      await deleteRsvp({
        eventId,
        rsvpId: selectedRSVP.id
      });
      setIsDeleteDialogOpen(false);
      setSelectedRSVP(null);
    } catch (error) {
      console.error('Error deleting RSVP:', error);
    }
  };

  const handleExport = () => {
    const headers = ['Full Name', 'Email', 'M-Pesa Phone', 'WhatsApp', 'Registration Date'];
    const csvData = rsvps.map(rsvp => [
      rsvp.fullName,
      rsvp.email,
      rsvp.mpesaPhone,
      rsvp.whatsappPhone,
      format(new Date(rsvp.createdAt), "yyyy-MM-dd HH:mm:ss")
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event?.title}_attendees_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const columns: ColumnDef<RSVPEntry>[] = [
    {
      accessorKey: "fullName",
      header: "Full Name",
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-muted-foreground">{row.getValue("fullName")}</div>
          <div className="text-sm text-foreground">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: "contact",
      header: "Contact Information",
      cell: ({ row }) => (
        <div className="text-sm space-y-1 text-foreground">
          <div className="text-muted-foreground">M-Pesa: {row.original.mpesaPhone}</div>
          <div>WhatsApp: {row.original.whatsappPhone}</div>
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Registration Date",
      cell: ({ row }) => (<span className="text-foreground">{format(new Date(row.getValue("createdAt")), "MMM d, yyyy HH:mm")}</span>),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2 text-muted-foreground">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setEditingRSVP(row.original);
              setShowForm(true);
            }}
            className="hover:text-blue-500"
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedRSVP(row.original);
              setIsDeleteDialogOpen(true);
            }}
            className="hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-muted-foreground">
        <h3 className="text-lg font-medium">
          Attendees {event ? `- ${event.title}` : ''}
        </h3>
        <div className="flex items-center gap-2">
          {rsvps.length > 0 && (
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          )}
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Attendee
          </Button>
        </div>
      </div>

      {showForm ? (
        <RSVPForm
          initialData={editingRSVP}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingRSVP(null);
          }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={rsvps}
          searchKey="fullName"
        />
      )}

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete RSVP"
        description="Are you sure you want to delete this RSVP? This action cannot be undone."
      />
    </div>
  );
}