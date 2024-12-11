// src/pages/events/page.tsx
import { useEffect, useState } from "react";
import { useEvents } from "@/lib/api/hooks";
import { PageHeader } from "@/components/layout/page-header";
import { Plus, Calendar } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { EventForm } from "./components/event-form";
import { EventsTable } from "./components/events-table";
import { RSVPList } from "./components/rsvp-list.tsx";
import { EmptyState } from "@/components/ui/empty-state";
import { Event } from "@/lib/api/types";

export default function EventsPage() {
  const { events, isLoading, create, update, delete: deleteEvent, getRSVPs } = useEvents();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [RSVPsData, setRSVPsData] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);


  const handleCreateUpdate = async (data: FormData) => {
    try {
      if (selectedEvent) {
        await update({ id: selectedEvent.id, data });
      } else {
        await create(data);
      }
      setIsModalOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;
    try {
      await deleteEvent(selectedEvent.id);
      setIsDeleteDialogOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const toggleRSVPs = (eventId: string) => {
    if (eventId) {
        getRSVPs(eventId).then((data) => {
            setRSVPsData(data);
        });
    }
    setExpandedEventId(current => current === eventId ? null : eventId);
  };

  if (isLoading) return <div className="text-foreground">loading....</div>;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Events"
        action={{
          label: "Add Event",
          icon: Plus,
          onClick: () => setIsModalOpen(true),
        }}
      />

      {events.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No events yet"
          description="Start by creating your first event."
          action={{
            label: "Add Event",
            onClick: () => setIsModalOpen(true),
          }}
        />
      ) : (
        <div className="space-y-4">
          <EventsTable
            RSVPs={RSVPsData}
            data={events}
            expandedEventId={expandedEventId}
            onEdit={(event) => {
              setSelectedEvent(event);
              setIsModalOpen(true);
            }}
            onDelete={(event) => {
              setSelectedEvent(event);
              setIsDeleteDialogOpen(true);
            }}
            onRSVPToggle={toggleRSVPs}
          />

          {expandedEventId && (
            <div className="rounded-lg border bg-card p-4">
              <RSVPList eventId={expandedEventId} eventRSVPs={RSVPsData} />
            </div>
          )}
        </div>
      )}

      <Modal
        title={selectedEvent ? "Edit Event" : "Add Event"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
      >
        <EventForm
          initialData={selectedEvent}
          onSubmit={handleCreateUpdate}
        />
      </Modal>

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Event"
        description="Are you sure you want to delete this event? This action cannot be undone."
      />
    </div>
  );
}