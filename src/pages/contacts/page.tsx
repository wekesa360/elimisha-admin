import { useState } from "react";
import { useContacts } from "@/lib/api/hooks";
import { PageHeader } from "@/components/layout/page-header";
import { MessageSquare, Mail, Calendar, User } from "lucide-react";
import { ContactTable } from "./components/contact-table";
import { ExportMenu } from "./components/export-menu";
import { Modal } from "@/components/ui/modal";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

// Add ViewDialog component
function ViewDialog({ contact, isOpen, onClose, onEmail }: { 
  contact: any | null; 
  isOpen: boolean; 
  onClose: () => void;
  onEmail: (email: string) => void;
}) {
  if (!contact) return null;

  return (
    <Modal
      title="View Message"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-muted-foreground">
              <User className="w-4 h-4 mr-2" />
              <span className="font-medium text-foreground">{contact.fullName}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEmail(contact.email)}
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Reply
            </Button>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <Mail className="w-4 h-4 mr-2" />
            {contact.email}
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            {format(new Date(contact.createdAt), "MMMM d, yyyy 'at' h:mm a")}
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Message</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {contact.message}
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default function ContactsPage() {
  const { contacts, isLoading, delete: deleteContact } = useContacts();
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleDelete = async () => {
    if (!selectedContact) return;
    try {
      await deleteContact(selectedContact.id);
      setIsDeleteDialogOpen(false);
      setSelectedContact(null);
    } catch (error) {
      // Error handled by API hook
    }
  };

  const handleExport = (type: "csv" | "excel") => {
    const headers = ["Full Name", "Email", "Message", "Date"];
    const data = contacts.map((contact) => [
      contact.fullName,
      contact.email,
      contact.message,
      format(new Date(contact.createdAt), "yyyy-MM-dd HH:mm:ss"),
    ]);

    if (type === "csv") {
      const csvContent = [
        headers.join(","),
        ...data.map((row) => row.map((cell) => `${cell}`).join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `contacts_${format(new Date(), "yyyy-MM-dd")}.csv`;
      link.click();
    } else {
      // Implement Excel export if needed
    }
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  if (isLoading) return <div className="text-foreground">Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <PageHeader title="Contact Messages" />
        {contacts.length > 0 && <ExportMenu onExport={handleExport} />}
      </div>

      {contacts.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No messages yet"
          description="Contact messages from Elimisha website will appear here."
        />
      ) : (
        <ContactTable
          data={contacts}
          onView={(contact) => {
            setSelectedContact(contact);
            setIsViewDialogOpen(true);
          }}
          onDelete={(contact) => {
            setSelectedContact(contact);
            setIsDeleteDialogOpen(true);
          }}
          onEmail={handleEmail}
        />
      )}

      <ViewDialog
        contact={selectedContact}
        isOpen={isViewDialogOpen}
        onClose={() => {
          setIsViewDialogOpen(false);
          setSelectedContact(null);
        }}
        onEmail={handleEmail}
      />

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Message"
        description="Are you sure you want to delete this message? This action cannot be undone."
      />
    </div>
  );
}