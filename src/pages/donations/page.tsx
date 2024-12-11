// src/pages/donations/page.tsx
import { useState } from "react";
import { useDonations } from "@/lib/api/hooks";
import { PageHeader } from "@/components/layout/page-header";
import { Plus, Calendar, MapPin } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { DonationForm } from "./components/donation-form";
import { DonationsTable } from "./components/donations-table";
import { EmptyState } from "@/components/ui/empty-state";
import { Heart } from 'lucide-react';
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Donation } from "@/lib/api/types";

// Add ViewDialog component
function ViewDialog({ donation, isOpen, onClose }: { 
  donation: Donation | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  if (!donation) return null;

  return (
    <Modal
      title="View Donation"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-6">
        {donation.imageUrl && (
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <img
              src={donation.imageUrl}
              alt={donation.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">{donation.title}</h2>
          
          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            {format(new Date(donation.date), "MMMM d, yyyy")}
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2" />
            {donation.location}
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Description</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">
              {donation.description}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Created</h3>
            <p className="text-muted-foreground">
              {format(new Date(donation.createdAt), "MMMM d, yyyy 'at' h:mm a")}
            </p>
          </div>

          {donation.updatedAt !== donation.createdAt && (
            <div className="space-y-2">
              <h3 className="font-medium text-foreground">Last Updated</h3>
              <p className="text-muted-foreground">
                {format(new Date(donation.updatedAt), "MMMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
          )}
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

export default function DonationsPage() {
  const { donations, isLoading, create, update, delete: deleteDonation } = useDonations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);

  const handleCreateUpdate = async (formData: FormData) => {
    try {
      if (selectedDonation) {
        await update({ id: selectedDonation.id, data: formData });
      } else {
        await create(formData);
      }
      setIsModalOpen(false);
      setSelectedDonation(null);
    } catch (error) {
      // Error is handled by the API hook
    }
  };

  const handleDelete = async () => {
    if (!selectedDonation) return;
    try {
      await deleteDonation(selectedDonation.id);
      setIsDeleteDialogOpen(false);
      setSelectedDonation(null);
    } catch (error) {
      // Error is handled by the API hook
    }
  };

  if (isLoading) {
    return <div className="text-foreground">loading....</div>;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Donations"
        action={{
          label: "Add Donation",
          icon: Plus,
          onClick: () => setIsModalOpen(true),
        }}
      />

      {donations.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No donations yet"
          description="Start by creating your first donation."
          action={{
            label: "Add Donation",
            onClick: () => setIsModalOpen(true),
          }}
        />
      ) : (
        <DonationsTable
          data={donations}
          onView={(donation) => {
            setSelectedDonation(donation);
            setIsViewDialogOpen(true);
          }}
          onEdit={(donation) => {
            setSelectedDonation(donation);
            setIsModalOpen(true);
          }}
          onDelete={(donation) => {
            setSelectedDonation(donation);
            setIsDeleteDialogOpen(true);
          }}
        />
      )}

      <Modal
        title={selectedDonation ? "Edit Donation" : "Add Donation"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDonation(null);
        }}
      >
        <DonationForm
          initialData={selectedDonation}
          onSubmit={handleCreateUpdate}
        />
      </Modal>

      <ViewDialog
        donation={selectedDonation}
        isOpen={isViewDialogOpen}
        onClose={() => {
          setIsViewDialogOpen(false);
          setSelectedDonation(null);
        }}
      />

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Donation"
        description="Are you sure you want to delete this donation? This action cannot be undone."
      />
    </div>
  );
}