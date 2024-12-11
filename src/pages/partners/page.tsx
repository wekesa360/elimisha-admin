// src/pages/partners/page.tsx
import { useState } from "react";
import { usePartners } from "@/lib/api/hooks";
import { PageHeader } from "@/components/layout/page-header";
import { GridContainer } from "@/components/layout/grid-container";
import { Plus, Building2 } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { PartnerForm } from "./components/partner-form";
import { PartnerCard } from "./components/partner-card";
import { EmptyState } from "@/components/ui/empty-state";

export default function PartnersPage() {
  const { partners, isLoading, create, update, delete: deletePartner } = usePartners();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);

  const handleCreateUpdate = async (formData: FormData) => {
    try {
      if (selectedPartner) {
        await update({id: selectedPartner.id, data: formData});
      } else {
        await create(formData);
      }
      setIsModalOpen(false);
      setSelectedPartner(null);
    } catch (error) {
      // Error handled by API hook
    }
  };

  const handleDelete = async () => {
    if (!selectedPartner) return;
    try {
      await deletePartner(selectedPartner.id);
      setIsDeleteDialogOpen(false);
      setSelectedPartner(null);
    } catch (error) {
      // Error handled by API hook
    }
  };

  if (isLoading) return <div className="text-foreground">loading....</div>;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Partners"
        action={{
          label: "Add Partner",
          icon: Plus,
          onClick: () => setIsModalOpen(true),
        }}
      />

      {partners.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No partners yet"
          description="Start by adding your first partner."
          action={{
            label: "Add Partner",
            onClick: () => setIsModalOpen(true),
          }}
        />
      ) : (
        <GridContainer columns={4}>
          {partners.map((partner) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onEdit={(partner) => {
                setSelectedPartner(partner);
                setIsModalOpen(true);
              }}
              onDelete={(partner) => {
                setSelectedPartner(partner);
                setIsDeleteDialogOpen(true);
              }}
            />
          ))}
        </GridContainer>
      )}

      <Modal
        title={selectedPartner ? "Edit Partner" : "Add Partner"}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPartner(null);
        }}
      >
        <PartnerForm
          initialData={selectedPartner}
          onSubmit={handleCreateUpdate}
        />
      </Modal>

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title="Delete Partner"
        description="Are you sure you want to delete this partner? This action cannot be undone."
      />
    </div>
  );
}