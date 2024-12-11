// src/pages/contacts/page.tsx
import { useState } from "react";
import { useContacts } from "@/lib/api/hooks";
import { PageHeader } from "@/components/layout/page-header";
import { MessageSquare } from "lucide-react";
import { ContactTable } from "./components/contact-table";
import { ExportMenu } from "./components/export-menu";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { format } from "date-fns";

export default function ContactsPage() {
  const { contacts, isLoading, delete: deleteContact } = useContacts();
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
        ...data.map((row) => row.map((cell) => `"${cell}"`).join(",")),
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

  if (isLoading) return <div className="text-foreground">loading....</div>;

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
          onDelete={(contact) => {
            setSelectedContact(contact);
            setIsDeleteDialogOpen(true);
          }}
          onEmail={handleEmail}
        />
      )}

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